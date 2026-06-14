# Database Setup Guide

## Quick Start

### 1. Create Supabase Project
- Go to https://supabase.com
- Create a new project
- Note your Project URL and API keys

### 2. Create Database Tables
1. Go to Supabase Dashboard
2. Click "SQL Editor"
3. Create a new query
4. Copy and paste the contents of `schema.sql`
5. Execute the query

### 3. Enable Realtime
1. In Supabase Dashboard, go to "Database" → "Replication"
2. Enable replication for these tables:
   - `machine_state`
   - `bottle_transactions`
   - `coupon_dispenses`
   - `error_logs`
   - `sensor_events`

### 4. Setup Authentication
1. Go to "Authentication" → "Providers"
2. Enable "Email" provider
3. Configure email templates if desired

## Tables Overview

### users
- Stores authenticated users
- Roles: `admin` or `operator`
- admin: Full access
- operator: Read-only access (except settings)

### machines
- IoT machine registry
- Status: online, offline, error
- Tracks last seen timestamp

### machine_state
- Current state of each machine
- Gates (main, internal)
- Bottle counter (0-3)
- Coupon stock
- Trash bin percentage
- WiFi status

### bottle_transactions
- Records when bottles are inserted
- Tracks reward dispensing

### coupon_dispenses
- Records when coupons are dispensed
- Quantity tracking

### error_logs
- System error tracking
- Severity levels: info, warning, error
- Component-based filtering

### sensor_events
- Real-time sensor data
- Ultrasonic detection
- Temperature, humidity, etc.

## Security

- Row-level security enabled on all tables
- Authenticated users can read all data
- Write operations require admin role
- Service role (backend) has full access

## Indexes

Performance indexes are created on:
- `created_at` (descending)
- `machine_id`
- `status`
- `severity`

## Triggers

Auto-updates `updated_at` timestamps on:
- users
- machines
- machine_state

## Realtime

Subscriptions supported for:
- machine_state changes
- New bottle_transactions
- New coupon_dispenses
- New error_logs
- New sensor_events
