# Architecture Guide

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     User Browser                            │
├─────────────────────────────────────────────────────────────┤
│  React + TypeScript + Vite (Frontend)                       │
│  - Dashboard                                                 │
│  - Machine Management                                        │
│  - Analytics & Reporting                                     │
│  - Real-time Updates (Supabase Realtime)                    │
├─────────────────────────────────────────────────────────────┤
│                  REST API (Express.js)                       │
│  - Authentication                                            │
│  - Machine Control                                           │
│  - Data Aggregation                                          │
├─────────────────────────────────────────────────────────────┤
│              Supabase (PostgreSQL Database)                  │
│  - Users, Machines, States                                   │
│  - Transactions, Logs, Sensor Events                         │
│  - Real-time subscriptions                                   │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Folder Structure
```
src/
├── app/                      # Application setup
│   ├── routes/              # Route guards
│   └── layouts/             # Main layout & sidebar
├── features/                # Feature modules (by domain)
│   ├── dashboard/           # Dashboard feature
│   ├── machines/            # Machine management
│   ├── logs/                # Error logs
│   ├── history/             # Historical data
│   ├── auth/                # Authentication
│   └── settings/            # Settings
├── components/              # Reusable components
│   ├── common/              # Common components
│   ├── charts/              # Chart components (Recharts)
│   ├── tables/              # Table components
│   ├── forms/               # Form components
│   └── status/              # Status indicators
├── services/                # API & external services
│   ├── api/                 # REST API client (axios)
│   └── supabase/            # Supabase client & services
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript types
├── store/                   # Zustand state management
├── utils/                   # Utility functions
└── theme/                   # MUI theme configuration
```

### Key Patterns

**State Management (Zustand)**
- Minimal, decentralized stores
- `authStore`: User authentication
- `machineStore`: Selected machine & states

**Data Fetching (React Query)**
- Caching and synchronization
- Automatic refetching
- Request deduplication

**Real-time Updates (Supabase Realtime)**
- Subscribe to database changes
- Update UI instantly
- No polling needed

### Component Hierarchy
```
App
├── ProtectedRoute
│   ├── MainLayout
│   │   ├── AppBar
│   │   ├── Sidebar
│   │   └── Outlet
│   │       ├── DashboardPage
│   │       │   ├── KPICard (4x)
│   │       │   ├── LiveMachineStatus
│   │       │   ├── BottlesChart
│   │       │   ├── CouponsChart
│   │       │   ├── WeeklyTrendChart
│   │       │   └── MonthlyTrendChart
│   │       ├── HistoryPage
│   │       ├── LogsPage
│   │       ├── MachinesPage
│   │       └── SettingsPage
└── LoginPage
```

## Backend Architecture

### Folder Structure
```
src/
├── modules/                 # Feature modules
│   ├── auth/               # Authentication
│   ├── machines/           # Machine management
│   ├── machine-state/      # Machine state tracking
│   ├── transactions/       # Bottle transactions
│   ├── coupons/            # Coupon management
│   ├── logs/               # Error logging
│   ├── sensors/            # Sensor events
│   └── dashboard/          # Dashboard analytics
├── shared/
│   ├── database/           # Database configuration
│   ├── middleware/         # Express middleware
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript types
└── main.ts                 # Entry point
```

### Module Structure
Each feature module follows this pattern:
```
module/
├── controllers/            # Request handlers
├── services/              # Business logic
├── repositories/          # Database access
├── routes/                # Express routes
└── types/                 # DTOs and types
```

### Request Flow
```
Request
  ↓
Middleware (CORS, Auth, JSON)
  ↓
Route Handler (controller)
  ↓
Service Layer (business logic)
  ↓
Repository Layer (database queries)
  ↓
Supabase Client
  ↓
PostgreSQL Database
  ↓
Response
```

### API Endpoints

**Authentication**
- POST `/api/auth/login`
- POST `/api/auth/logout`

**Machines**
- GET `/api/machines` - List all
- GET `/api/machines/:id` - Get one
- POST `/api/machines` - Create (admin)
- POST `/api/machines/:id/restart` - Restart (admin)
- POST `/api/machines/:id/shutdown` - Shutdown (admin)
- POST `/api/machines/:id/dispense-coupon` - Dispense (admin)

**Machine State**
- GET `/api/machine-state/:machineId`
- POST `/api/machine-state/:machineId/reset-counter` (admin)
- POST `/api/machine-state/:machineId/open-main-gate` (admin)
- POST `/api/machine-state/:machineId/close-main-gate` (admin)
- POST `/api/machine-state/:machineId/open-internal-gate` (admin)
- POST `/api/machine-state/:machineId/close-internal-gate` (admin)

**Transactions**
- GET `/api/bottle-transactions`
- POST `/api/bottle-transactions`

**Coupons**
- GET `/api/coupon-dispenses`

**Logs**
- GET `/api/error-logs` (with filters)

**Sensors**
- GET `/api/sensor-events`

**Dashboard**
- GET `/api/dashboard/kpis`

## Database Schema

### Users
```
id: UUID (FK auth.users)
email: TEXT
role: TEXT (admin | operator)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### Machines
```
id: UUID (PK)
machine_name: TEXT
location: TEXT
status: TEXT (online | offline | error)
last_seen: TIMESTAMP
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### Machine State
```
id: UUID (PK)
machine_id: UUID (FK machines)
main_gate_open: BOOLEAN
internal_gate_open: BOOLEAN
bottle_counter: INTEGER (0-3)
coupon_stock: INTEGER
trash_bin_percentage: DECIMAL
wifi_status: BOOLEAN
updated_at: TIMESTAMP
UNIQUE(machine_id)
```

### Bottle Transactions
```
id: UUID (PK)
machine_id: UUID (FK machines)
bottles_inserted: INTEGER
reward_dispensed: BOOLEAN
created_at: TIMESTAMP
```

### Coupon Dispenses
```
id: UUID (PK)
machine_id: UUID (FK machines)
quantity: INTEGER
created_at: TIMESTAMP
```

### Error Logs
```
id: UUID (PK)
machine_id: UUID (FK machines)
severity: TEXT (info | warning | error)
component: TEXT
message: TEXT
created_at: TIMESTAMP
```

### Sensor Events
```
id: UUID (PK)
machine_id: UUID (FK machines)
sensor_type: TEXT
value: TEXT
created_at: TIMESTAMP
```

## Authentication Flow

### Login
```
User enters credentials
  ↓
Frontend calls /api/auth/login
  ↓
Backend calls supabase.auth.signInWithPassword
  ↓
Supabase returns JWT token
  ↓
Backend returns token to frontend
  ↓
Frontend stores token in localStorage
  ↓
Subsequent requests include Authorization header
```

### Protected Routes
```
User visits /dashboard
  ↓
ProtectedRoute checks useAuth hook
  ↓
useAuth fetches current user from Supabase
  ↓
If authenticated → render Dashboard
  ↓
If not authenticated → redirect to /login
```

## Real-time Updates

Supabase Realtime enables instant synchronization:

1. **Subscribe to changes**
   ```typescript
   const channel = realtimeService.subscribeToMachineState(machineId, callback);
   ```

2. **Database change occurs**
   - Machine state updated
   - New bottle inserted
   - Coupon dispensed

3. **Broadcast to subscribers**
   - Supabase sends change event
   - Callback triggers
   - UI updates automatically

## Error Handling

### Frontend
- Try-catch blocks around async operations
- User-friendly error messages
- Error boundaries for React components

### Backend
- Zod validation for input
- Try-catch in route handlers
- Consistent error response format
- Error middleware for uncaught exceptions

## Security

### Authentication
- Supabase Auth manages passwords securely
- JWT tokens for API requests
- Row-level security policies on database

### Authorization
- Admin-only endpoints check role
- User can only access own data
- Service role for backend operations

### Data Protection
- HTTPS/TLS for all communications
- CORS configured for frontend domain
- SQL injection prevention via Supabase client
- Input validation with Zod

## Performance Optimizations

### Frontend
- Code splitting with React Router
- Image lazy loading
- Memoization for expensive computations
- React Query caching

### Backend
- Database indexes on frequently queried columns
- Pagination for large datasets
- Connection pooling via Supabase

### Database
- Partitioning for large tables (optional)
- Cleanup of old logs
- Archive strategy for historical data
