# VENDOBIN Admin Platform - Comprehensive Tech Stack & Specifications

## Project Specifications

### Application Type
- **Type:** Full-Stack Web Application (IoT Management Dashboard)
- **Purpose:** Manage VENDOBIN plastic bottle exchange machines
- **Users:** Administrators and Operators
- **Scope:** Multi-machine management with real-time monitoring

### User Roles

**Admin**
- Full system access
- Machine configuration
- System settings
- User management
- Complete analytics access
- Machine control (restart, shutdown)
- Coupon management

**Operator**
- Dashboard view (read-only)
- View logs
- View transaction history
- Cannot modify settings
- Cannot control machines
- Limited analytics

## Frontend Specifications

### Framework & Build Tool
- **React 18.2.0** - Latest stable version with Hooks and Suspense
- **TypeScript 5.2.0** - Strict mode for type safety
- **Vite 5.0.0** - Modern build tool (fast HMR, optimized builds)

### UI & Styling
- **Material-UI (MUI) 5.14.0** - Professional component library
- **Responsive Design** - Mobile-first approach
- **Theme System** - VENDOBIN green theme (#6B8E23)
- **Custom Components** - KPI cards, status indicators, modals

### State Management
- **Zustand 4.4.0** - Lightweight, minimal API
- **Stores:** Auth, Machines
- **React Query 5.0.0** - Server state management with caching

### Data Visualization
- **Recharts 2.10.0** - Production-ready chart library
- **Chart Types:** Line, Bar, Area charts
- **Analytics:** Hourly, weekly, monthly trends

### Routing
- **React Router 6.15.0** - Modern routing with V6 API
- **Protected Routes** - Auth guards on sensitive pages
- **Nested Routes** - Feature-based structure

### HTTP Client
- **Axios 1.6.0** - Promise-based HTTP client
- **Interceptors** - Auto token injection
- **Error Handling** - Consistent error responses

### Real-time Communication
- **Supabase Realtime** - PostgreSQL LISTEN/NOTIFY
- **Subscriptions** - Live machine state updates
- **Automatic UI Sync** - No polling required

### Authentication
- **Supabase Auth** - Email/password authentication
- **JWT Tokens** - Secure API access
- **Session Management** - Persistent login
- **Role-Based Access** - Admin/Operator differentiation

### UI Components
**Reusable:**
- KPI Cards with icons and colors
- Status Indicators (green/yellow/red)
- Data Tables with pagination
- Forms with validation
- Dialogs with confirmations
- Charts and visualizations
- Navigation (AppBar, Sidebar)

**Pages:**
- Login Page (authentication)
- Dashboard (KPIs, charts, status)
- Machines Page (list, control)
- Logs Page (error tracking)
- History Page (transactions)
- Settings Page (user preferences)

### Code Organization
```
src/
├── app/           # Application core
├── features/      # Feature modules (dashboard, machines, etc.)
├── components/    # Reusable UI components
├── services/      # API & Supabase clients
├── hooks/         # Custom React hooks
├── types/         # TypeScript interfaces
├── store/         # Zustand stores
├── utils/         # Utility functions
└── theme/         # MUI theme configuration
```

### Performance
- Code splitting per route
- Lazy loading components
- Image optimization
- Memoization where needed
- Query result caching

### Accessibility
- WCAG 2.1 AA compliance ready
- Semantic HTML
- Keyboard navigation
- Color contrast compliance
- ARIA labels on components

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Backend Specifications

### Framework & Runtime
- **Node.js 18.x LTS** - Latest stable version
- **Express 4.18.2** - Minimalist web framework
- **TypeScript 5.2.0** - Strict mode

### API Architecture
- **REST API** - RESTful endpoint design
- **Modular Routes** - Feature-based route organization
- **7 Main Modules:**
  - Authentication
  - Machines
  - Machine State
  - Transactions
  - Coupons
  - Logs
  - Sensors

### Module Structure
Each module includes:
- **Controllers** - Request handlers
- **Services** - Business logic
- **Repositories** - Database access
- **Routes** - Express route definitions
- **Types** - TypeScript DTOs

### Request/Response Format
```json
{
  "success": true,
  "data": { /* payload */ }
}

{
  "success": false,
  "error": "Error message"
}
```

### Middleware
- **CORS** - Cross-Origin Resource Sharing
- **Authentication** - JWT verification
- **Error Handling** - Global exception handler
- **Logging** - Request/response logging
- **Validation** - Input validation with Zod

### Database Integration
- **Supabase Client** - JavaScript SDK
- **Connection Pooling** - Managed by Supabase
- **Prepared Statements** - SQL injection prevention
- **Real-time Subscriptions** - PostgreSQL Realtime

### Authentication
- **JWT Tokens** - Stateless authentication
- **Supabase Auth** - Managed user accounts
- **Role-Based Access Control** - Admin/Operator checks
- **Token Validation** - Every protected endpoint

### Error Handling
- **Try-Catch Blocks** - Async error handling
- **Validation Errors** - Zod schema validation
- **Database Errors** - Graceful error messages
- **HTTP Status Codes** - Proper HTTP semantics

### Logging
- **Console Logging** - Development logging
- **Structured Logs** - JSON formatted
- **Request Logging** - HTTP request tracking
- **Error Logging** - Stack traces and context

### Security
- **HTTPS Ready** - Works with HTTPS
- **CORS Configuration** - Frontend domain whitelisting
- **Input Validation** - Zod schemas
- **SQL Injection Prevention** - Parameterized queries
- **Rate Limiting Ready** - Can add with middleware

### API Endpoints (30+ total)

**Authentication (2)**
- POST `/api/auth/login`
- POST `/api/auth/logout`

**Machines (6)**
- GET `/api/machines`
- GET `/api/machines/:id`
- POST `/api/machines`
- POST `/api/machines/:id/restart`
- POST `/api/machines/:id/shutdown`
- POST `/api/machines/:id/dispense-coupon`

**Machine State (7)**
- GET `/api/machine-state/:machineId`
- POST `/api/machine-state/:machineId/reset-counter`
- POST `/api/machine-state/:machineId/open-main-gate`
- POST `/api/machine-state/:machineId/close-main-gate`
- POST `/api/machine-state/:machineId/open-internal-gate`
- POST `/api/machine-state/:machineId/close-internal-gate`

**Transactions (2)**
- GET `/api/bottle-transactions` (paginated)
- POST `/api/bottle-transactions`

**Coupons (1)**
- GET `/api/coupon-dispenses` (paginated)

**Logs (1)**
- GET `/api/error-logs` (with filtering)

**Sensors (1)**
- GET `/api/sensor-events` (paginated)

**Dashboard (1)**
- GET `/api/dashboard/kpis`

### Performance Considerations
- Database indexes on frequently queried columns
- Pagination for large datasets (default 100 items)
- Connection pooling (managed by Supabase)
- Query optimization (SELECT only needed columns)
- Caching opportunities (can add Redis)

## Database Specifications

### Provider
- **Supabase** - Managed PostgreSQL hosting
- **Version:** PostgreSQL 14+
- **Region:** User selectable (geo-distributed)

### Tables (7 core tables)

#### users
```sql
id (UUID, PK, FK auth.users)
email (TEXT, UNIQUE)
role (TEXT: admin | operator)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### machines
```sql
id (UUID, PK)
machine_name (TEXT)
location (TEXT)
status (TEXT: online | offline | error)
last_seen (TIMESTAMP)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
Indexes: status, created_at
```

#### machine_state
```sql
id (UUID, PK)
machine_id (UUID, FK)
main_gate_open (BOOLEAN)
internal_gate_open (BOOLEAN)
bottle_counter (INTEGER: 0-3)
coupon_stock (INTEGER)
trash_bin_percentage (DECIMAL: 0-100)
wifi_status (BOOLEAN)
updated_at (TIMESTAMP)
UNIQUE(machine_id)
```

#### bottle_transactions
```sql
id (UUID, PK)
machine_id (UUID, FK)
bottles_inserted (INTEGER)
reward_dispensed (BOOLEAN)
created_at (TIMESTAMP)
Indexes: created_at DESC, machine_id
```

#### coupon_dispenses
```sql
id (UUID, PK)
machine_id (UUID, FK)
quantity (INTEGER)
created_at (TIMESTAMP)
Indexes: created_at DESC, machine_id
```

#### error_logs
```sql
id (UUID, PK)
machine_id (UUID, FK)
severity (TEXT: info | warning | error)
component (TEXT)
message (TEXT)
created_at (TIMESTAMP)
Indexes: created_at DESC, machine_id, severity
```

#### sensor_events
```sql
id (UUID, PK)
machine_id (UUID, FK)
sensor_type (TEXT)
value (TEXT)
created_at (TIMESTAMP)
Indexes: created_at DESC, machine_id, sensor_type
```

### Security Policies (RLS)
- **All tables:** Row-level security enabled
- **Read:** Authenticated users can read all data
- **Write:** Only admins and service role can write
- **Service Role:** Full access for backend operations

### Performance
- **Indexes:** On all frequently queried columns
- **Partitioning:** Optional for large logs tables
- **Cleanup:** Automatic archival of old logs (configurable)
- **Backups:** Daily automatic backups

### Real-time
- **Enabled on:** machine_state, bottle_transactions, coupon_dispenses, error_logs, sensor_events
- **Postgres Replication:** Required for real-time
- **Channels:** Per-entity subscriptions

### Relationships
```
machines (1) ──→ (many) machine_state
machines (1) ──→ (many) bottle_transactions
machines (1) ──→ (many) coupon_dispenses
machines (1) ──→ (many) error_logs
machines (1) ──→ (many) sensor_events
users (1) ──→ (many) machines (implicit via auth)
```

## Deployment Specifications

### Frontend Deployment
- **Platform:** Vercel
- **Build:** `npm run build`
- **Output:** `dist/` folder
- **Runtime:** Node.js with Vercel functions (optional)
- **CDN:** Global edge network
- **SSL:** Automatic HTTPS

### Backend Deployment
- **Platforms:** Railway or Render
- **Build:** `npm run build`
- **Output:** `dist/` folder
- **Runtime:** Node.js 18+
- **Port:** 3000 (configurable)
- **Environment:** Managed via dashboard

### Database Deployment
- **Platform:** Supabase (managed)
- **Hosting:** Multi-region availability
- **Backup:** Automatic daily
- **Restoration:** Point-in-time recovery (14 days)
- **SSL:** Automatic HTTPS

### CI/CD
- **GitHub Actions:** Ready for automation
- **Deployment Triggers:** Push to main branch
- **Environment Promotion:** Dev → Staging → Prod

## Performance Targets

### Frontend
- **FCP (First Contentful Paint):** < 1.5s
- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **Bundle Size:** < 500 KB (gzipped)

### Backend
- **API Response Time:** < 200ms (p95)
- **Database Query Time:** < 50ms (p95)
- **Concurrent Users:** 1000+
- **Uptime:** 99.9%

### Database
- **Query Performance:** < 100ms for most queries
- **Connection Pool:** 20 concurrent connections
- **Replication Lag:** < 1 second

## Security Specifications

### Authentication
- ✅ Supabase Auth (proven security)
- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for API access
- ✅ Token expiration (configurable)
- ✅ Refresh tokens for long-lived sessions

### Authorization
- ✅ Role-based access control (RBAC)
- ✅ Admin-only endpoint protection
- ✅ Row-level security in database
- ✅ User can only access own data

### Data Protection
- ✅ HTTPS/TLS encryption in transit
- ✅ Database encryption at rest
- ✅ Sensitive fields not exposed in API
- ✅ Audit logs of admin actions

### API Security
- ✅ CORS configured for frontend domain
- ✅ Input validation (Zod schemas)
- ✅ SQL injection prevention (parameterized queries)
- ✅ CSRF protection ready
- ✅ Rate limiting ready (can add)

### Code Security
- ✅ No hardcoded secrets
- ✅ Environment variables for configuration
- ✅ `.env` files not committed to git
- ✅ TypeScript strict mode

## Monitoring & Observability

### Built-in
- ✅ Request/response logging
- ✅ Error tracking and logging
- ✅ Performance metrics
- ✅ Database query logging

### Ready to Integrate
- ⭕ Sentry (error tracking)
- ⭕ New Relic (APM)
- ⭕ Datadog (monitoring)
- ⭕ LogRocket (frontend)
- ⭕ Google Analytics

## Testing Strategy

### Ready for
- ✅ Unit tests (Jest)
- ✅ Integration tests (Supertest)
- ✅ E2E tests (Cypress/Playwright)
- ✅ Performance tests

### Test Examples Included
- ✅ Component test patterns
- ✅ API route test patterns
- ✅ Validation test patterns

## Documentation

### Included
- ✅ Project README
- ✅ Setup guide
- ✅ Architecture documentation
- ✅ Deployment guide
- ✅ Development guide
- ✅ Database schema documentation
- ✅ Inline code comments
- ✅ TypeScript JSDoc comments

### Generated
- ✅ TypeScript definitions
- ✅ API documentation (via Swagger ready)
- ✅ Component stories (via Storybook ready)

## Version History

**1.0.0** - Initial Release
- Full-stack application complete
- All core features implemented
- Production-ready code
- Comprehensive documentation

## Future Enhancements

- [ ] Email notifications
- [ ] SMS alerts
- [ ] Mobile app (React Native)
- [ ] Machine IoT integration
- [ ] Advanced analytics
- [ ] ML-based predictions
- [ ] Multi-language support
- [ ] Dark mode
- [ ] API documentation (Swagger)
- [ ] Component library (Storybook)

## Compliance & Standards

- ✅ WCAG 2.1 AA ready
- ✅ REST API best practices
- ✅ PostgreSQL standards
- ✅ JavaScript/TypeScript standards
- ✅ Security best practices
- ✅ Performance best practices

---

**This specification document covers all aspects of the VENDOBIN Admin Platform.**
