export type UserRole = 'admin' | 'operator';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface Machine {
  id: string;
  machine_name: string;
  location: string;
  status: 'online' | 'offline' | 'error';
  last_seen: string;
  created_at: string;
}

export interface MachineState {
  id: string;
  machine_id: string;
  main_gate_open: boolean;
  internal_gate_open: boolean;
  bottle_counter: number;
  coupon_stock: number;
  trash_bin_percentage: number;
  wifi_status: boolean;
  updated_at: string;
}

export interface BottleTransaction {
  id: string;
  machine_id: string;
  bottles_inserted: number;
  reward_dispensed: boolean;
  created_at: string;
}

export interface CouponDispense {
  id: string;
  machine_id: string;
  quantity: number;
  created_at: string;
}

export interface ErrorLog {
  id: string;
  machine_id: string;
  severity: 'info' | 'warning' | 'error';
  component: string;
  message: string;
  created_at: string;
}

export interface SensorEvent {
  id: string;
  machine_id: string;
  sensor_type: string;
  value: number | string;
  created_at: string;
}

export interface DashboardKPIs {
  bottlesCollectedToday: number;
  couponsDispensedToday: number;
  totalBottlesThisMonth: number;
  totalCouponsThisMonth: number;
  machineStatus: {
    online: number;
    offline: number;
    error: number;
  };
}

export interface AnalyticsData {
  timestamp: string;
  bottles: number;
  coupons: number;
}
