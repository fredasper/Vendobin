# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (free at vercel.com)
- GitHub account with repository

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` as the root directory

3. **Configure Environment Variables**
   In Vercel dashboard, set:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_API_URL=https://your-backend-api.com/api
   ```

4. **Deploy**
   - Vercel will automatically deploy on push
   - Your frontend will be live at a vercel.app domain

## Backend Deployment (Railway or Render)

### Option 1: Railway

1. **Sign up at railway.app**

2. **Create a new project**
   - Choose "GitHub Repo"
   - Connect your repository

3. **Configure Environment Variables**
   ```
   PORT=3000
   NODE_ENV=production
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-service-role-key
   SUPABASE_JWT_SECRET=your-jwt-secret
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```

4. **Configure Root Directory**
   - Set root directory to `backend`

5. **Deploy**
   - Railway will build and deploy automatically

### Option 2: Render

1. **Sign up at render.com**

2. **Create a new Web Service**
   - Connect GitHub repository
   - Choose `backend` as root directory

3. **Set Environment Variables**
   - Same as Railway above

4. **Configure Build & Start Commands**
   - Build: `npm run build`
   - Start: `npm run start`

5. **Deploy**

## Database (Supabase)

Supabase is hosted and managed - no additional deployment needed.

### Backup Your Database
1. Go to Supabase Dashboard
2. Settings → Backups
3. Create manual backup or enable daily backups

## SSL/TLS Certificates

- Vercel: Automatic HTTPS
- Railway/Render: Automatic HTTPS
- Custom domain: Configure DNS pointing

## Monitoring

### Frontend (Vercel)
- Built-in analytics and error tracking
- Check Deployments tab for logs

### Backend (Railway/Render)
- View logs in dashboard
- Set up alerts for crashes

### Supabase
- Monitor API usage in Settings
- Check database performance in Postgres section

## Health Checks

### Frontend
Visit: `https://your-frontend.vercel.app/`

### Backend
Visit: `https://your-backend-api.com/health`

Should return: `{"status":"ok"}`

## CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd frontend && npm ci && npm run build
      - run: echo "Frontend build successful"

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm ci && npm run build
      - run: echo "Backend build successful"
```

## Troubleshooting

### Frontend not loading
- Check VITE_API_URL is correct
- Verify CORS is enabled on backend
- Check network tab in browser DevTools

### Backend not responding
- Check service is running: `/health` endpoint
- Verify Supabase credentials
- Check logs in deployment dashboard

### Database connection errors
- Verify SUPABASE_URL and SUPABASE_KEY
- Check network connectivity
- Ensure database tables exist (run schema.sql)

## Production Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Railway/Render
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] SSL/HTTPS enabled
- [ ] Database backups enabled
- [ ] Error logging configured
- [ ] Monitoring alerts set up
- [ ] Domain name configured
- [ ] API rate limiting enabled (if needed)
