import { Router, Response } from 'express';
import { AuthRequest } from '@shared/middleware/auth';
import { successResponse, errorResponse } from '@shared/utils/response';
import { supabase } from '@shared/database/supabase';

const router = Router();

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { limit = '100', offset = '0' } = req.query;
    const { data, error } = await supabase
      .from('bottle_transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) throw error;
    res.json(successResponse(data));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch transactions'));
  }
});

router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { machine_id, bottles_inserted, reward_dispensed } = req.body;

    const { data, error } = await supabase
      .from('bottle_transactions')
      .insert([{ machine_id, bottles_inserted, reward_dispensed }])
      .select();

    if (error) throw error;
    res.status(201).json(successResponse(data[0]));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to create transaction'));
  }
});

export default router;
