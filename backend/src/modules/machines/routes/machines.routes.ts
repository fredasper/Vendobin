import { Router, Response } from 'express';
import { AuthRequest, adminOnly } from '@shared/middleware/auth';
import { successResponse, errorResponse } from '@shared/utils/response';
import { supabase } from '@shared/database/supabase';

const router = Router();

router.get('/', async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('machines')
      .select('*');

    if (error) throw error;
    res.json(successResponse(data));
    return;
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch machines'));
    return;
  }
});

router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('machines')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.json(successResponse(data));
    return;
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch machine'));
    return;
  }
});

router.post('/', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { machine_name, location, status } = req.body;

    const { data, error } = await supabase
      .from('machines')
      .insert([{ machine_name, location, status }])
      .select();

    if (error) throw error;
    res.status(201).json(successResponse(data[0]));
    return;
  } catch (error) {
    res.status(500).json(errorResponse('Failed to create machine'));
    return;
  }
});

router.post('/:id/restart', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    // Send restart command to machine via Realtime
    await supabase
      .from('machines')
      .update({ status: 'online' })
      .eq('id', req.params.id);

    res.json(successResponse({ message: 'Machine restart command sent' }));
    return;
  } catch (error) {
    res.status(500).json(errorResponse('Failed to restart machine'));
    return;
  }
});

router.post('/:id/shutdown', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    await supabase
      .from('machines')
      .update({ status: 'offline' })
      .eq('id', req.params.id);

    res.json(successResponse({ message: 'Machine shutdown command sent' }));
    return;
  } catch (error) {
    res.status(500).json(errorResponse('Failed to shutdown machine'));
    return;
  }
});

router.post('/:id/dispense-coupon', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { data: insertData, error } = await supabase
      .from('coupon_dispenses')
      .insert([{ machine_id: req.params.id, quantity: 1 }])
      .select();

    if (error) throw error;
    res.json(successResponse(insertData[0]));
    return;
  } catch (error) {
    res.status(500).json(errorResponse('Failed to dispense coupon'));
    return;
  }
});

export default router;
