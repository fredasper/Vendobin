import api from './client';
import type { Machine, MachineState } from '@/types';

export const machineApi = {
  async getMachines(): Promise<Machine[]> {
    const { data } = await api.get('/machines');
    return data;
  },

  async getMachine(id: string): Promise<Machine> {
    const { data } = await api.get(`/machines/${id}`);
    return data;
  },

  async getMachineState(machineId: string): Promise<MachineState> {
    const { data } = await api.get(`/machine-state/${machineId}`);
    return data;
  },

  async restartMachine(machineId: string): Promise<void> {
    await api.post(`/machines/${machineId}/restart`);
  },

  async shutdownMachine(machineId: string): Promise<void> {
    await api.post(`/machines/${machineId}/shutdown`);
  },

  async resetBottleCounter(machineId: string): Promise<void> {
    await api.post(`/machine-state/${machineId}/reset-counter`);
  },

  async triggerCouponDispense(machineId: string): Promise<void> {
    await api.post(`/machines/${machineId}/dispense-coupon`);
  },

  async openMainGate(machineId: string): Promise<void> {
    await api.post(`/machine-state/${machineId}/open-main-gate`);
  },

  async closeMainGate(machineId: string): Promise<void> {
    await api.post(`/machine-state/${machineId}/close-main-gate`);
  },

  async openInternalGate(machineId: string): Promise<void> {
    await api.post(`/machine-state/${machineId}/open-internal-gate`);
  },

  async closeInternalGate(machineId: string): Promise<void> {
    await api.post(`/machine-state/${machineId}/close-internal-gate`);
  },
};
