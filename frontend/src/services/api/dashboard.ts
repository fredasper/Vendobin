import api from './client';
import type { DashboardKPIs, AnalyticsData } from '@/types';

export const dashboardApi = {
  async getKPIs(): Promise<DashboardKPIs> {
    const { data } = await api.get('/dashboard/kpis');
    return data;
  },

  async getBottlesChart(): Promise<AnalyticsData[]> {
    const { data } = await api.get('/dashboard/bottles-chart');
    return data;
  },

  async getCouponsChart(): Promise<AnalyticsData[]> {
    const { data } = await api.get('/dashboard/coupons-chart');
    return data;
  },

  async getWeeklyTrend(): Promise<AnalyticsData[]> {
    const { data } = await api.get('/dashboard/weekly-trend');
    return data;
  },

  async getMonthlyTrend(): Promise<AnalyticsData[]> {
    const { data } = await api.get('/dashboard/monthly-trend');
    return data;
  },
};
