import { create } from 'zustand';
import type { MachineState } from '@/types';

interface MachineStore {
  selectedMachineId: string | null;
  machineStates: Record<string, MachineState>;
  setSelectedMachineId: (id: string | null) => void;
  updateMachineState: (state: MachineState) => void;
  setMachineStates: (states: Record<string, MachineState>) => void;
}

export const useMachineStore = create<MachineStore>((set) => ({
  selectedMachineId: null,
  machineStates: {},
  setSelectedMachineId: (id) => set({ selectedMachineId: id }),
  updateMachineState: (state) =>
    set((prev) => ({
      machineStates: {
        ...prev.machineStates,
        [state.machine_id]: state,
      },
    })),
  setMachineStates: (states) => set({ machineStates: states }),
}));
