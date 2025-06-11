import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, timeout, map } from 'rxjs/operators';

export interface ApiTestResult {
  provider: string;
  success: boolean;
  responseTime: number;
  message: string;
  details?: any;
}

export interface ApiTestSummary {
  totalTests: number;
  successfulTests: number;
  failedTests: number;
  averageResponseTime: number;
  results: ApiTestResult[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiTestingService {
  private readonly TEST_TIMEOUT = 10000; // 10 seconds
  private readonly TEST_PROMPT = "Hello, this is a test message. Please respond with 'API test successful'.";

  constructor(private http: HttpClient) {}

  async testAllApiKeys(apiKeys: any): Promise<ApiTestSummary> {
    const results: ApiTestResult[] = [];
    const testPromises: Promise<ApiTestResult>[] = [];

    // Test each configured API key
    for (const [provider, apiKey] of Object.entries(apiKeys)) {
      if (apiKey && typeof apiKey === 'string' && apiKey.trim()) {
        testPromises.push(this.testSingleApiKey(provider, apiKey.trim()));
      }
    }

    // Wait for all tests to complete
    const testResults = await Promise.allSettled(testPromises);
    
    testResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        const provider = Object.keys(apiKeys)[index];
        results.push({
          provider,
          success: false,
          responseTime: 0,
          message: 'Test failed to execute',
          details: result.reason
        });
      }
    });

    // Calculate summary
    const successfulTests = results.filter(r => r.success).length;
    const totalResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0);
    const averageResponseTime = results.length > 0 ? totalResponseTime / results.length : 0;

    return {
      totalTests: results.length,
      successfulTests,
      failedTests: results.length - successfulTests,
      averageResponseTime: Math.round(averageResponseTime),
      results
    };
  }

  private async testSingleApiKey(provider: string, apiKey: string): Promise<ApiTestResult> {
    const startTime = Date.now();
    
    try {
      let result: any;
      
      switch (provider.toLowerCase()) {
        case 'gemini':
          result = await this.testGeminiApi(apiKey);
          break;
        case 'openai':
          result = await this.testOpenAiApi(apiKey);
          break;
        case 'mistral':
          result = await this.testMistralApi(apiKey);
          break;
        case 'openrouter':
          result = await this.testOpenRouterApi(apiKey);
          break;
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }

      const responseTime = Date.now() - startTime;
      
      return {
        provider,
        success: true,
        responseTime,
        message: 'API key is valid and working',
        details: result
      };
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      return {
        provider,
        success: false,
        responseTime,
        message: this.getErrorMessage(error),
        details: error
      };
    }
  }

  private async testGeminiApi(apiKey: string): Promise<any> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{
        parts: [{
          text: this.TEST_PROMPT
        }]
      }]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, payload, { headers })
      .pipe(
        timeout(this.TEST_TIMEOUT),
        map((response: any) => {
          if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return { response: response.candidates[0].content.parts[0].text };
          }
          throw new Error('Invalid response format');
        }),
        catchError(error => throwError(() => error))
      ).toPromise();
  }

  private async testOpenAiApi(apiKey: string): Promise<any> {
    const url = 'https://api.openai.com/v1/chat/completions';
    
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: this.TEST_PROMPT }
      ],
      max_tokens: 50
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    });

    return this.http.post(url, payload, { headers })
      .pipe(
        timeout(this.TEST_TIMEOUT),
        map((response: any) => {
          if (response?.choices?.[0]?.message?.content) {
            return { response: response.choices[0].message.content };
          }
          throw new Error('Invalid response format');
        }),
        catchError(error => throwError(() => error))
      ).toPromise();
  }

  private async testMistralApi(apiKey: string): Promise<any> {
    const url = 'https://api.mistral.ai/v1/chat/completions';
    
    const payload = {
      model: 'mistral-tiny',
      messages: [
        { role: 'user', content: this.TEST_PROMPT }
      ],
      max_tokens: 50
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    });

    return this.http.post(url, payload, { headers })
      .pipe(
        timeout(this.TEST_TIMEOUT),
        map((response: any) => {
          if (response?.choices?.[0]?.message?.content) {
            return { response: response.choices[0].message.content };
          }
          throw new Error('Invalid response format');
        }),
        catchError(error => throwError(() => error))
      ).toPromise();
  }

  private async testOpenRouterApi(apiKey: string): Promise<any> {
    const url = 'https://openrouter.ai/api/v1/chat/completions';
    
    const payload = {
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'user', content: this.TEST_PROMPT }
      ],
      max_tokens: 50
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Abid Ansari AI Assistant'
    });

    return this.http.post(url, payload, { headers })
      .pipe(
        timeout(this.TEST_TIMEOUT),
        map((response: any) => {
          if (response?.choices?.[0]?.message?.content) {
            return { response: response.choices[0].message.content };
          }
          throw new Error('Invalid response format');
        }),
        catchError(error => throwError(() => error))
      ).toPromise();
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error?.message) {
      return error.error.error.message;
    }
    if (error?.message) {
      return error.message;
    }
    if (error?.status === 401) {
      return 'Invalid API key or unauthorized access';
    }
    if (error?.status === 403) {
      return 'API key does not have required permissions';
    }
    if (error?.status === 429) {
      return 'Rate limit exceeded';
    }
    if (error?.status === 0) {
      return 'Network error or CORS issue';
    }
    return 'Unknown error occurred during API test';
  }
}
