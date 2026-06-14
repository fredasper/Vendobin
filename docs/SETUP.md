# Setup Guide

## Project Overview

VENDOBIN Admin Platform is a production-ready full-stack web application for managing IoT plastic bottle exchange machines. 

**Frontend:** React + TypeScript + Vite
**Backend:** Node.js + Express + TypeScript  
**Database:** Supabase (PostgreSQL)
**Real-time:** Supabase Realtime

## Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm 9+** or **yarn 3+**
- **Supabase Account** - [Free at supabase.com](https://supabase.com)
- **Git** - For version control

## Initial Setup (First Time Only)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd vendobin-admin-platform
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install workspace dependencies
npm install -w frontend
npm install -w backend
```

### 3. Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Wait for the database to initialize
4. Go to **Settings → API**
5. Copy your:
   - Project URL
   - Anon Key (for frontend)
   - Service Role Key (for backend)
   - JWT Secret

### 4. Create Database Tables

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `database/schema.sql`
4. Paste into the query editor
5. Click **Run**

### 5. Enable Realtime

In Supabase Dashboard:
1. Go to **Database → Replication**
2. Enable replication for:
   - machine_state
   - bottle_transactions
   - coupon_dispenses
   - error_logs
   - sensor_events

### 6. Configure Environment Variables

**Frontend** - Create `frontend/.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_URL=http://localhost:3000/api
```

**Backend** - Create `backend/.env`:

```bash
PORT=3000
NODE_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key-here
SUPABASE_JWT_SECRET=your-jwt-secret-here
CORS_ORIGIN=http://localhost:5173
```

## Development

### Start Both Frontend and Backend

```bash
# From root directory
npm run dev
```

This command runs both servers concurrently:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

### Start Individual Servers

**Frontend only:**
```bash
cd frontend
npm run dev
```

**Backend only:**
```bash
cd backend
npm run dev
```

### Verify Setup

1. **Frontend loads:** Visit http://localhost:5173
   - Should see login page
   - No console errors

2. **Backend responds:** Visit http://localhost:3000/health
   - Should see: `{"status":"ok"}`

3. **Database connected:**
   - Check Supabase dashboard
   - Tables should be created

## Testing the Application

### Create Test Account

1. Sign up in the frontend with email/password
2. In Supabase, update the user role:
   - Go to **SQL Editor**
   - Run:
     ```sql
     UPDATE auth.users SET raw_app_meta_data = 
       jsonb_set(raw_app_meta_data, '{role}', '"admin"')
     WHERE email = 'your-email@example.com';
     ```

### Test Features

1. **Dashboard**
   - View KPI cards
   - Check live machine status
   - Review charts and analytics

2. **Machines**
   - List all machines
   - Control machine actions
   - Confirm action dialogs

3. **Logs**
   - View error logs
   - Filter by severity
   - Search by date range

4. **History**
   - View transaction history
   - Export data (CSV/PDF)

## Build for Production

### Build Frontend

```bash
cd frontend
npm run build
```

Creates optimized build in `frontend/dist/`

### Build Backend

```bash
cd backend
npm run build
```

Creates compiled output in `backend/dist/`

## Code Quality

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Project Structure

```
vendobin-admin-platform/
├── frontend/                 # React + TypeScript + Vite
│   ├── src/
│   │   ├── app/             # App setup & layouts
│   │   ├── features/        # Feature modules
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API & Supabase
│   │   ├── store/           # Zustand state
│   │   ├── types/           # TypeScript types
│   │   └── theme/           # MUI theme
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── backend/                  # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── modules/         # Feature modules
│   │   ├── shared/          # Shared utilities
│   │   └── main.ts          # Entry point
│   ├── tsconfig.json
│   └── package.json
├── database/
│   ├── schema.sql           # Database schema
│   └── README.md
├── docs/
│   ├── DEPLOYMENT.md
│   ├── ARCHITECTURE.md
│   └── SETUP.md
└── package.json             # Root workspace
```

## Common Tasks

### Add a New Feature

1. Create feature folder: `src/features/my-feature/`
2. Create subfolders: `pages/`, `components/`
3. Add route in `App.tsx`
4. Add menu item in `Sidebar.tsx`

### Add an API Endpoint

**Backend:**
1. Create route file: `src/modules/my-module/routes/my-module.routes.ts`
2. Register in `main.ts`:
   ```typescript
   app.use('/api/my-module', authMiddleware, myModuleRoutes);
   ```

**Frontend:**
1. Create service: `src/services/api/my-module.ts`
2. Use in component with React Query

### Connect to Database

**Frontend (Read-only):**
```typescript
import { supabase } from '@services/supabase/client';

const { data } = await supabase
  .from('table_name')
  .select('*');
```

**Backend (Full access):**
```typescript
import { supabase } from '@shared/database/supabase';

const { data } = await supabase
  .from('table_name')
  .insert([{ /* data */ }])
  .select();
```

## Troubleshooting

### "Cannot find module" errors
- Delete `node_modules/` and `.next/` folders
- Run `npm install` again

### Port already in use
- Frontend: Change port in `vite.config.ts`
- Backend: Change `PORT` in `.env`

### Supabase connection errors
- Verify credentials in `.env` files
- Check Supabase project is running
- Ensure database tables exist

### Real-time not working
- Verify replication is enabled in Supabase
- Check browser console for errors
- Verify database changes trigger events

### TypeScript errors
- Run `npm run type-check`
- Check for missing types
- Update tsconfig.json if needed

## Performance Tips

1. **Frontend**
   - Enable Vite production build
   - Use React Query devtools
   - Profile with browser DevTools

2. **Backend**
   - Enable database query logging
   - Monitor Supabase usage
   - Use connection pooling

3. **Database**
   - Check slow query logs
   - Verify indexes exist
   - Archive old data

## Security Checklist

- [ ] Environment variables not committed to git
- [ ] `.env` files added to `.gitignore`
- [ ] Supabase row-level security enabled
- [ ] Admin routes require authentication
- [ ] CORS configured for frontend domain
- [ ] HTTPS enabled in production
- [ ] Database backups enabled

## Next Steps

1. **Deploy Frontend** → See `docs/DEPLOYMENT.md`
2. **Deploy Backend** → See `docs/DEPLOYMENT.md`
3. **Monitor** → Set up error tracking and analytics
4. **Scale** → Consider caching and optimization

## Support

For issues and questions:
- Check documentation in `/docs`
- Review error messages in console
- Check Supabase logs and status page
- Review GitHub issues

## License

Proprietary - VENDOBIN Inc.
