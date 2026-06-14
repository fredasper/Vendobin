import { create } from 'zustand';

interface SettingsState {
  machineRefreshInterval: number;
  notificationsEnabled: boolean;
  emailAlerts: boolean;
  setMachineRefreshInterval: (value: number) => void;
  setNotificationsEnabled: (value: boolean) => void;
  setEmailAlerts: (value: boolean) => void;
}

const booleanSetting = (key: string, fallback: boolean) => {
  const storedValue = localStorage.getItem(key);
  return storedValue === null ? fallback : storedValue === 'true';
};

const numberSetting = (key: string, fallback: number) => {
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? Number(storedValue) : Number.NaN;
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  machineRefreshInterval: numberSetting('machine_refresh_interval', 5000),
  notificationsEnabled: booleanSetting('notifications_enabled', true),
  emailAlerts: booleanSetting('email_alerts', true),
  setMachineRefreshInterval: (value) => {
    localStorage.setItem('machine_refresh_interval', String(value));
    set({ machineRefreshInterval: value });
  },
  setNotificationsEnabled: (value) => {
    localStorage.setItem('notifications_enabled', String(value));
    set({ notificationsEnabled: value });
  },
  setEmailAlerts: (value) => {
    localStorage.setItem('email_alerts', String(value));
    set({ emailAlerts: value });
  },
}));
