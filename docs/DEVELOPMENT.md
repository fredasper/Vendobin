# VENDOBIN Admin Platform Development Guide

## Feature Development Workflow

### 1. Create a New Feature

**Frontend:**

```typescript
// src/features/my-feature/pages/MyFeaturePage.tsx
import { Box, Paper, Typography } from '@mui/material';

export default function MyFeaturePage() {
  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">My Feature</Typography>
      </Paper>
    </Box>
  );
}
```

**Backend:**

```typescript
// src/modules/my-module/routes/my-module.routes.ts
import { Router } from 'express';
import { AuthRequest } from '@shared/middleware/auth';
import { successResponse, errorResponse } from '@shared/utils/response';

const router = Router();

router.get('/', async (req: AuthRequest, res) => {
  try {
    // Implementation
    res.json(successResponse({ message: 'Success' }));
  } catch (error) {
    res.status(500).json(errorResponse('Error'));
  }
});

export default router;
```

### 2. Add Route

**Frontend** - Update `App.tsx`:

```typescript
import MyFeaturePage from './features/my-feature/pages/MyFeaturePage';

// In Routes:
<Route path="/my-feature" element={<MyFeaturePage />} />
```

**Backend** - Update `main.ts`:

```typescript
import myModuleRoutes from '@modules/my-module/routes/my-module.routes';

app.use('/api/my-module', authMiddleware, myModuleRoutes);
```

### 3. Add Menu Item

Update `src/app/layouts/Sidebar.tsx`:

```typescript
const menuItems = [
  // ... existing items
  { label: 'My Feature', icon: <MyIcon />, path: '/my-feature' },
];
```

### 4. Create API Service

**Frontend** - `src/services/api/my-module.ts`:

```typescript
import api from './client';

export const myModuleApi = {
  async getItems() {
    const { data } = await api.get('/my-module');
    return data;
  },

  async createItem(payload: any) {
    const { data } = await api.post('/my-module', payload);
    return data;
  },
};
```

### 5. Use in Component

```typescript
import { useQuery } from '@tanstack/react-query';
import { myModuleApi } from '@services/api/my-module';

export default function MyFeatureComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['my-module'],
    queryFn: () => myModuleApi.getItems(),
  });

  if (isLoading) return <CircularProgress />;

  return <Box>{/* Render data */}</Box>;
}
```

## Common Patterns

### Form Submission

```typescript
import { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';

export default function MyForm() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await myModuleApi.createItem(formData);
      // Success handling
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField 
        value={formData.field}
        onChange={(e) => setFormData({...formData, field: e.target.value})}
      />
      <Button type="submit" disabled={loading}>Submit</Button>
    </form>
  );
}
```

### Real-time Subscriptions

```typescript
import { useEffect } from 'react';
import { realtimeService } from '@services/supabase/realtime';

export default function RealtimeComponent() {
  useEffect(() => {
    const channel = realtimeService.subscribeToMachineState('machine-id', (payload) => {
      console.log('State updated:', payload);
      // Update UI
    });

    return () => realtimeService.unsubscribe(channel);
  }, []);

  return <Box>{/* Content */}</Box>;
}
```

### Protected Admin Route

**Backend:**
```typescript
import { adminOnly } from '@shared/middleware/auth';

router.post('/admin-action', adminOnly, async (req, res) => {
  // Only admins can access
});
```

**Frontend:**
```typescript
import { useAuth } from '@hooks/useAuth';

export default function AdminFeature() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <Box>Access Denied</Box>;
  }

  return <Box>{/* Admin content */}</Box>;
}
```

### Error Handling

**Frontend:**
```typescript
try {
  const result = await someApi.call();
} catch (error) {
  if (error.response?.status === 401) {
    // Unauthorized - redirect to login
    navigate('/login');
  } else if (error.response?.status === 403) {
    // Forbidden - show permission error
    setError('You do not have permission to perform this action');
  } else {
    // Generic error
    setError('An error occurred');
  }
}
```

**Backend:**
```typescript
try {
  // Operation
} catch (error) {
  if (error instanceof ZodError) {
    res.status(400).json(errorResponse('Validation failed'));
  } else if (error instanceof Error && error.message === 'Not found') {
    res.status(404).json(errorResponse('Resource not found'));
  } else {
    res.status(500).json(errorResponse('Internal server error'));
  }
}
```

## Testing

### Unit Test Example

```typescript
// src/features/dashboard/components/KPICard.test.tsx
import { render, screen } from '@testing-library/react';
import KPICard from './KPICard';

describe('KPICard', () => {
  it('renders title and value', () => {
    render(
      <KPICard title="Test" value={100} icon="📦" color="primary" />
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
```

### Integration Test Example

```typescript
// backend/src/modules/machines/routes/machines.routes.test.ts
import request from 'supertest';
import app from '@/main';

describe('Machines API', () => {
  it('GET /api/machines returns list', async () => {
    const res = await request(app)
      .get('/api/machines')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
```

## Performance Optimization

### Frontend

```typescript
// Memoize expensive components
import { memo } from 'react';

const MemoizedChart = memo(ChartComponent);

// Use useCallback for event handlers
const handleClick = useCallback(() => {
  // Implementation
}, [dependency]);

// Lazy load routes
const MyFeature = lazy(() => import('@features/my-feature'));
```

### Backend

```typescript
// Cache frequently accessed data
const cacheKey = `machines:${machineId}`;
const cached = await redis.get(cacheKey);

if (cached) return cached;

const data = await supabase.from('machines').select('*');
await redis.set(cacheKey, data, 'EX', 3600);

return data;
```

## Debugging

### Frontend

Use React DevTools and Redux DevTools browser extensions:
- React DevTools - Component inspection and props
- Redux DevTools - State management visualization

Console debugging:
```typescript
console.log('Debug:', value);
console.table(arrayOfObjects);
console.time('operation');
// ... code
console.timeEnd('operation');
```

### Backend

```typescript
import { config } from 'dotenv';
config(); // Load .env

// Debug mode
if (process.env.DEBUG) {
  console.log('Debug info');
}

// Error logging
console.error('Error:', error);
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .

# Commit with message
git commit -m "feat: add my feature"

# Push to remote
git push origin feature/my-feature

# Create pull request on GitHub
# After review and approval:
git checkout main
git pull
git merge feature/my-feature
git push
```

## Useful Commands

```bash
# Run entire application
npm run dev

# Run just frontend
npm run dev -w frontend

# Run just backend
npm run dev -w backend

# Build everything
npm run build

# Type check
npm run type-check

# Lint and format
npm run lint
npm run format

# View Supabase logs
supabase logs

# Access database shell
psql postgresql://...
```
