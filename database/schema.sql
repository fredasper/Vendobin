-- VENDOBIN IoT Admin Platform Database Schema
-- PostgreSQL with Supabase

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'operator')) DEFAULT 'operator',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Machines table
CREATE TABLE IF NOT EXISTS public.machines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  machine_name TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('online', 'offline', 'error')) DEFAULT 'offline',
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Machine state table
CREATE TABLE IF NOT EXISTS public.machine_state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  machine_id UUID NOT NULL REFERENCES public.machines(id) ON DELETE CASCADE,
  main_gate_open BOOLEAN DEFAULT FALSE,
  internal_gate_open BOOLEAN DEFAULT FALSE,
  bottle_counter INTEGER DEFAULT 0 CHECK (bottle_counter >= 0 AND bottle_counter <= 3),
  coupon_stock INTEGER DEFAULT 100 CHECK (coupon_stock >= 0),
  trash_bin_percentage DECIMAL(5, 2) DEFAULT 0 CHECK (trash_bin_percentage >= 0 AND trash_bin_percentage <= 100),
  wifi_status BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(machine_id)
);

-- Bottle transactions table
CREATE TABLE IF NOT EXISTS public.bottle_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  machine_id UUID NOT NULL REFERENCES public.machines(id) ON DELETE CASCADE,
  bottles_inserted INTEGER NOT NULL CHECK (bottles_inserted > 0),
  reward_dispensed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Coupon dispenses table
CREATE TABLE IF NOT EXISTS public.coupon_dispenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  machine_id UUID NOT NULL REFERENCES public.machines(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0) DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Error logs table
CREATE TABLE IF NOT EXISTS public.error_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  machine_id UUID NOT NULL REFERENCES public.machines(id) ON DELETE CASCADE,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error')),
  component TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sensor events table
CREATE TABLE IF NOT EXISTS public.sensor_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  machine_id UUID NOT NULL REFERENCES public.machines(id) ON DELETE CASCADE,
  sensor_type TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_machine_severity ON public.error_logs(machine_id, severity);
CREATE INDEX IF NOT EXISTS idx_machine_sensor ON public.sensor_events(machine_id, sensor_type);
CREATE INDEX IF NOT EXISTS idx_bottles_created_at ON public.bottle_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_coupons_created_at ON public.coupon_dispenses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON public.error_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sensor_events_created_at ON public.sensor_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_machines_status ON public.machines(status);
CREATE INDEX IF NOT EXISTS idx_machines_created_at ON public.machines(created_at DESC);

-- Row-level security policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machine_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bottle_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_dispenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensor_events ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all data
DROP POLICY IF EXISTS "Allow users to read own profile" ON public.users;
CREATE POLICY "Allow users to read own profile" ON public.users
  FOR SELECT TO authenticated USING (id = auth.uid());

DROP POLICY IF EXISTS "Allow authenticated users to read machines" ON public.machines;
CREATE POLICY "Allow authenticated users to read machines" ON public.machines
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to read machine_state" ON public.machine_state;
CREATE POLICY "Allow authenticated users to read machine_state" ON public.machine_state
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to read transactions" ON public.bottle_transactions;
CREATE POLICY "Allow authenticated users to read transactions" ON public.bottle_transactions
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to read coupons" ON public.coupon_dispenses;
CREATE POLICY "Allow authenticated users to read coupons" ON public.coupon_dispenses
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to read error_logs" ON public.error_logs;
CREATE POLICY "Allow authenticated users to read error_logs" ON public.error_logs
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to read sensor_events" ON public.sensor_events;
CREATE POLICY "Allow authenticated users to read sensor_events" ON public.sensor_events
  FOR SELECT TO authenticated USING (true);

-- Admin-only write policies
DROP POLICY IF EXISTS "Allow admins to write machines" ON public.machines;
CREATE POLICY "Allow admins to write machines" ON public.machines
  FOR ALL TO authenticated USING (
    EXISTS(SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Allow admins to write machine_state" ON public.machine_state;
CREATE POLICY "Allow admins to write machine_state" ON public.machine_state
  FOR ALL TO authenticated USING (
    EXISTS(SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Service role can write all tables
DROP POLICY IF EXISTS "Allow service role full access" ON public.users;
CREATE POLICY "Allow service role full access" ON public.users AS PERMISSIVE FOR ALL TO service_role USING (true);

DROP POLICY IF EXISTS "Allow service role machines access" ON public.machines;
CREATE POLICY "Allow service role machines access" ON public.machines AS PERMISSIVE FOR ALL TO service_role USING (true);

DROP POLICY IF EXISTS "Allow service role machine_state access" ON public.machine_state;
CREATE POLICY "Allow service role machine_state access" ON public.machine_state AS PERMISSIVE FOR ALL TO service_role USING (true);

DROP POLICY IF EXISTS "Allow service role transactions access" ON public.bottle_transactions;
CREATE POLICY "Allow service role transactions access" ON public.bottle_transactions AS PERMISSIVE FOR ALL TO service_role USING (true);

DROP POLICY IF EXISTS "Allow service role coupons access" ON public.coupon_dispenses;
CREATE POLICY "Allow service role coupons access" ON public.coupon_dispenses AS PERMISSIVE FOR ALL TO service_role USING (true);

DROP POLICY IF EXISTS "Allow service role logs access" ON public.error_logs;
CREATE POLICY "Allow service role logs access" ON public.error_logs AS PERMISSIVE FOR ALL TO service_role USING (true);

DROP POLICY IF EXISTS "Allow service role sensors access" ON public.sensor_events;
CREATE POLICY "Allow service role sensors access" ON public.sensor_events AS PERMISSIVE FOR ALL TO service_role USING (true);

-- Create a user profile whenever a Supabase Auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'role', ''), 'operator')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_machines_updated_at ON public.machines;
CREATE TRIGGER update_machines_updated_at BEFORE UPDATE ON public.machines
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_machine_state_updated_at ON public.machine_state;
CREATE TRIGGER update_machine_state_updated_at BEFORE UPDATE ON public.machine_state
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Sample data (optional - remove in production)
-- INSERT INTO public.machines (machine_name, location, status)
-- VALUES
--   ('VENDOBIN-001', 'Downtown Plaza', 'online'),
--   ('VENDOBIN-002', 'Shopping Mall', 'online'),
--   ('VENDOBIN-003', 'Train Station', 'offline');
