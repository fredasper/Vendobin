import { z } from 'zod';

// Auth
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Machine
export const createMachineSchema = z.object({
  machine_name: z.string().min(1),
  location: z.string().min(1),
  status: z.enum(['online', 'offline', 'error']).default('offline'),
});

export const updateMachineStateSchema = z.object({
  main_gate_open: z.boolean().optional(),
  internal_gate_open: z.boolean().optional(),
  bottle_counter: z.number().int().min(0).optional(),
  coupon_stock: z.number().int().min(0).optional(),
  trash_bin_percentage: z.number().min(0).max(100).optional(),
  wifi_status: z.boolean().optional(),
});

// Transactions
export const createBottleTransactionSchema = z.object({
  machine_id: z.string().uuid(),
  bottles_inserted: z.number().int().min(1),
  reward_dispensed: z.boolean(),
});

// Error Logs
export const createErrorLogSchema = z.object({
  machine_id: z.string().uuid(),
  severity: z.enum(['info', 'warning', 'error']),
  component: z.string(),
  message: z.string(),
});
