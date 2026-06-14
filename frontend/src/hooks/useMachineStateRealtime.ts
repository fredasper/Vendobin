import { useEffect } from 'react';
import { useMachineStore } from '@store/machineStore';
import { realtimeService } from '@services/supabase/realtime';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useMachineStateRealtme = (machineId: string) => {
  const updateMachineState = useMachineStore((state) => state.updateMachineState);

  useEffect(() => {
    let channel: RealtimeChannel;

    const setupSubscription = async () => {
      channel = realtimeService.subscribeToMachineState(machineId, (payload) => {
        updateMachineState(payload.new);
      });
    };

    setupSubscription();

    return () => {
      if (channel) {
        realtimeService.unsubscribe(channel);
      }
    };
  }, [machineId, updateMachineState]);
};
