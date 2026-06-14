import api from './client';
import type { BottleTransaction, CouponDispense, ErrorLog, SensorEvent } from '@/types';

export const transactionApi = {
  async getBottleTransactions(limit = 100, offset = 0): Promise<BottleTransaction[]> {
    const { data } = await api.get('/bottle-transactions', {
      params: { limit, offset },
    });
    return data;
  },

  async getCouponDispenses(limit = 100, offset = 0): Promise<CouponDispense[]> {
    const { data } = await api.get('/coupon-dispenses', {
      params: { limit, offset },
    });
    return data;
  },

  async getErrorLogs(
    severity?: string,
    startDate?: string,
    endDate?: string,
    limit = 100,
    offset = 0,
  ): Promise<ErrorLog[]> {
    const { data } = await api.get('/error-logs', {
      params: { severity, startDate, endDate, limit, offset },
    });
    return data;
  },

  async getSensorEvents(limit = 100, offset = 0): Promise<SensorEvent[]> {
    const { data } = await api.get('/sensor-events', {
      params: { limit, offset },
    });
    return data;
  },
};
