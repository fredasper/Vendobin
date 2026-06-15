import { Router, Response } from 'express';
import { AuthRequest } from '@shared/middleware/auth';
import { successResponse, errorResponse } from '@shared/utils/response';
import { supabase } from '@shared/database/supabase';

const router = Router();

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { limit = '100', offset = '0' } = req.query;
    const { data, error } = await supabase
      .from('coupon_dispenses')
      .select('*')
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) throw error;
    res.json(successResponse(data));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch coupons'));
  }
});

export default router;
