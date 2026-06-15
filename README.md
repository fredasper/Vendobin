# VENDOBIN IoT Admin Platform

A production-ready full-stack web application for managing VENDOBIN IoT plastic bottle exchange machines. Built with React, TypeScript, Node.js, Express, and Supabase.

## 🏗️ Architecture

```
VENDOBIN Admin Platform
├── Frontend (React + TypeScript + Vite)
├── Backend (Node.js + Express + TypeScript)
└── Database (Supabase PostgreSQL)
```

## 🎯 Features

### Dashboard
- Real-time KPI monitoring
- Live machine status display
- Interactive analytics charts
- Color-coded status indicators

### Machine Management
- Machine registration and monitoring
- Real-time state tracking
- Remote control operations
- Performance analytics

### System Monitoring
- Error log tracking and filtering
- Sensor event monitoring
- Historical analytics
- System performance metrics

### Administration
- User management with role-based access
- Bottle transaction history
- Coupon dispense tracking
- Export capabilities (CSV/PDF)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- PostgreSQL knowledge

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:3000`

### Environment Variables

**Frontend** (`.env.local`):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:3000/api
```

**Backend** (`.env`):
```
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## 📁 Project Structure

### Frontend
```
frontend/src/
├── app/                    # Application setup
├── features/              # Feature modules (dashboard, auth, etc.)
├── components/            # Reusable components
├── services/              # API & Supabase services
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
├── store/                 # Zustand state management
├── utils/                 # Utility functions
└── theme/                 # MUI theme configuration
```

### Backend
```
backend/src/
├── modules/               # Feature modules
│   ├── auth/             # Authentication
│   ├── machines/         # Machine management
│   ├── machine-state/    # Machine state tracking
│   ├── transactions/     # Bottle transactions
│   ├── coupons/          # Coupon management
│   ├── logs/             # Error logging
│   └── sensors/          # Sensor events
├── shared/                # Shared utilities
│   ├── database/         # Database connection
│   ├── middleware/       # Express middleware
│   ├── utils/            # Helper functions
│   └── types/            # TypeScript types
└── main.ts               # Application entry point
```

## 🗄️ Database Schema

Database setup SQL is available in `database/schema.sql`. Initialize with:

```bash
psql -U postgres -d vendobin -f database/schema.sql
```

**Tables:**
- `users` - User accounts and roles
- `machines` - Machine registry
- `machine_state` - Current machine state
- `bottle_transactions` - Bottle insertion records
- `coupon_dispenses` - Coupon distribution logs
- `error_logs` - System error tracking
- `sensor_events` - Sensor data events

## 🔐 Authentication

Uses Supabase Auth with:
- Email/password login
- Role-based access control (Admin/Operator)
- JWT token management
- Protected routes

## 🔄 Real-time Updates

Supabase Realtime enables live updates:
- Bottle insertions
- Coupon dispensing
- Sensor changes
- Machine status updates
- Error generation

No page refresh needed.

## 📊 Analytics

Recharts-based visualizations:
- Hourly bottle insertion trends
- Hourly coupon dispensing trends
- 7-day performance trends
- 30-day monthly analytics
- Machine collection statistics

## 📦 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
vercel deploy
```

### Backend (Railway/Render)

```bash
cd backend
npm run build
# Deploy to Railway or Render with PostgreSQL database
```

## 📚 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Material-UI (MUI)
- Recharts
- React Router
- React Query (TanStack Query)
- Zustand
- Supabase JS Client

### Backend
- Node.js
- Express.js
- TypeScript
- Supabase
- Zod (validation)

### Database
- PostgreSQL
- Supabase Auth
- Supabase Realtime

### Code Quality
- ESLint
- Prettier
- TypeScript strict mode

## 🛠️ Development

### Build
```bash
npm run build
```

### Type Check
```bash
npm run type-check
```

### Lint
```bash
npm run lint
```

### Format
```bash
npm run format
```

## 📝 License

Proprietary - VENDOBIN Inc.

## 🤝 Support

For issues and questions, please contact the development team.
