import { Router, Response } from 'express';
import { AuthRequest } from '@shared/middleware/auth';
import { successResponse, errorResponse } from '@shared/utils/response';
import { supabase } from '@shared/database/supabase';

const router = Router();

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    let query = supabase
      .from('error_logs')
      .select('*')
      .order('created_at', { ascending: false });

    const { severity, startDate, endDate, limit = '100', offset = '0' } = req.query;

    if (severity) {
      query = query.eq('severity', severity);
    }

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query.range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) throw error;
    res.json(successResponse(data));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch logs'));
  }
});

export default router;
