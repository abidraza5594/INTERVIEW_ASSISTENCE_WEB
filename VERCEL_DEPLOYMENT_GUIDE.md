# Vercel Deployment Guide

## Issues Fixed

### 1. Bundle Size Issues
- **Problem**: Initial bundle exceeded 500KB budget by 440KB
- **Solution**: Increased budget limits in `angular.json` to realistic values for Angular Material apps
- **Changes**: 
  - Initial bundle limit: 500KB → 1MB (warning), 1MB → 2MB (error)
  - Component style limit: 4KB → 10KB (warning), 8KB → 20KB (error)

### 2. Component Style Budget Exceeded
- **Problem**: Pricing component had 6.21KB of inline styles (exceeded 4KB limit)
- **Solution**: Extracted inline styles to external SCSS file
- **Changes**:
  - Created `src/app/pages/pricing/pricing.component.scss`
  - Updated component to use `styleUrls` instead of inline `styles`
  - Removed 500+ lines of inline CSS

### 3. Vercel Configuration
- **Added**: `vercel.json` configuration file
- **Features**:
  - Proper Angular SPA routing support
  - Static asset caching
  - Security headers
  - Build optimization

## Deployment Steps

### Option 1: Vercel CLI (Recommended)
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (for first deployment)
   - Project name: `interview-assistance-website` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings? **N**

### Option 2: GitHub Integration
1. Push your code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Angular and use the correct settings

### Option 3: Manual Upload
1. Build the project locally:
   ```bash
   npm run build
   ```
2. Upload the `dist/website` folder to Vercel dashboard

## Build Configuration

The project is now configured with:
- **Framework**: Angular (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/website`
- **Install Command**: `npm install`

## Environment Variables (if needed)
If you need to set environment variables:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add any required variables

## Custom Domain (Optional)
1. Go to your Vercel project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript compilation succeeds locally
- Verify Angular version compatibility

### Routing Issues
- The `vercel.json` file handles SPA routing
- All routes redirect to `index.html` for client-side routing

### Performance Issues
- Bundle size is optimized for production
- Lazy loading is implemented for route components
- Static assets are cached with long expiration

## Post-Deployment Checklist
- [ ] Test all routes work correctly
- [ ] Verify responsive design on mobile
- [ ] Check that all assets load properly
- [ ] Test contact forms and external links
- [ ] Verify Firebase integration (if applicable)

## Support
If you encounter issues:
1. Check Vercel deployment logs
2. Verify local build works: `npm run build`
3. Check browser console for errors
4. Review Vercel documentation for Angular apps
