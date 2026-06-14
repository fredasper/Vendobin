import { Router, Response } from 'express';
import { AuthRequest } from '@shared/middleware/auth';
import { successResponse, errorResponse } from '@shared/utils/response';
import { supabase } from '@shared/database/supabase';

const router = Router();

router.get('/kpis', async (_req: AuthRequest, res: Response) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

    // Get today's bottles
    const { data: bottlestoday } = await supabase
      .from('bottle_transactions')
      .select('bottles_inserted', { count: 'exact' })
      .gte('created_at', `${today}T00:00:00`);

    // Get today's coupons
    const { data: couponstoday } = await supabase
      .from('coupon_dispenses')
      .select('quantity', { count: 'exact' })
      .gte('created_at', `${today}T00:00:00`);

    // Get month's bottles
    const { data: bottlesmonth } = await supabase
      .from('bottle_transactions')
      .select('bottles_inserted', { count: 'exact' })
      .gte('created_at', `${monthStart}T00:00:00`);

    // Get month's coupons
    const { data: couponsmonth } = await supabase
      .from('coupon_dispenses')
      .select('quantity', { count: 'exact' })
      .gte('created_at', `${monthStart}T00:00:00`);

    const kpis = {
      bottlesCollectedToday: bottlestoday?.reduce((sum, item) => sum + (item.bottles_inserted || 0), 0) || 0,
      couponsDispensedToday: couponstoday?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0,
      totalBottlesThisMonth: bottlesmonth?.reduce((sum, item) => sum + (item.bottles_inserted || 0), 0) || 0,
      totalCouponsThisMonth: couponsmonth?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0,
      machineStatus: { online: 12, offline: 2, error: 1 },
    };

    res.json(successResponse(kpis));
    return;
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch KPIs'));
    return;
  }
});

export default router;
