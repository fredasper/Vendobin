import { supabase } from './client';
import { RealtimeChannel } from '@supabase/supabase-js';

export const realtimeService = {
  subscribeToMachineState(
    machineId: string,
    callback: (payload: any) => void,
  ): RealtimeChannel {
    return supabase
      .channel(`machine_state:${machineId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'machine_state',
        filter: `machine_id=eq.${machineId}`,
      }, callback)
      .subscribe();
  },

  subscribeToBottleTransactions(callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel('bottle_transactions')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'bottle_transactions',
      }, callback)
      .subscribe();
  },

  subscribeToCouponDispenses(callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel('coupon_dispenses')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'coupon_dispenses',
      }, callback)
      .subscribe();
  },

  subscribeToErrorLogs(callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel('error_logs')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'error_logs',
      }, callback)
      .subscribe();
  },

  subscribeSensorEvents(callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel('sensor_events')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'sensor_events',
      }, callback)
      .subscribe();
  },

  unsubscribe(channel: RealtimeChannel): void {
    supabase.removeChannel(channel);
  },
};
