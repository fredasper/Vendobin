import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { authMiddleware, errorHandler } from '@shared/middleware/auth';

// Routes
import authRoutes from '@modules/auth/routes/auth.routes';
import machineRoutes from '@modules/machines/routes/machines.routes';
import machineStateRoutes from '@modules/machine-state/routes/machine-state.routes';
import transactionRoutes from '@modules/transactions/routes/transactions.routes';
import couponRoutes from '@modules/coupons/routes/coupons.routes';
import logsRoutes from '@modules/logs/routes/logs.routes';
import sensorRoutes from '@modules/sensors/routes/sensors.routes';
import dashboardRoutes from '@modules/dashboard/routes/dashboard.routes';

config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/machines', authMiddleware, machineRoutes);
app.use('/api/machine-state', authMiddleware, machineStateRoutes);
app.use('/api/bottle-transactions', authMiddleware, transactionRoutes);
app.use('/api/coupon-dispenses', authMiddleware, couponRoutes);
app.use('/api/error-logs', authMiddleware, logsRoutes);
app.use('/api/sensor-events', authMiddleware, sensorRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 VENDOBIN Backend running on port ${port}`);
  console.log(`📊 Dashboard: http://localhost:${port}/api/dashboard`);
});
