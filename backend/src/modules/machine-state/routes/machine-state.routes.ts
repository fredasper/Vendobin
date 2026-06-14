import { Router, Response } from 'express';
import { AuthRequest, adminOnly } from '@shared/middleware/auth';
import { successResponse, errorResponse } from '@shared/utils/response';
import { supabase } from '@shared/database/supabase';

const router = Router();

router.get('/:machineId', async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('machine_state')
      .select('*')
      .eq('machine_id', req.params.machineId)
      .single();

    if (error) throw error;
    res.json(successResponse(data));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch machine state'));
  }
});

router.post('/:machineId/reset-counter', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('machine_state')
      .update({ bottle_counter: 0 })
      .eq('machine_id', req.params.machineId)
      .select();

    if (error) throw error;
    res.json(successResponse(data[0]));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to reset counter'));
  }
});

router.post('/:machineId/open-main-gate', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('machine_state')
      .update({ main_gate_open: true })
      .eq('machine_id', req.params.machineId)
      .select();

    if (error) throw error;
    res.json(successResponse(data[0]));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to open main gate'));
  }
});

router.post('/:machineId/close-main-gate', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('machine_state')
      .update({ main_gate_open: false })
      .eq('machine_id', req.params.machineId)
      .select();

    if (error) throw error;
    res.json(successResponse(data[0]));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to close main gate'));
  }
});

router.post('/:machineId/open-internal-gate', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('machine_state')
      .update({ internal_gate_open: true })
      .eq('machine_id', req.params.machineId)
      .select();

    if (error) throw error;
    res.json(successResponse(data[0]));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to open internal gate'));
  }
});

router.post('/:machineId/close-internal-gate', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('machine_state')
      .update({ internal_gate_open: false })
      .eq('machine_id', req.params.machineId)
      .select();

    if (error) throw error;
    res.json(successResponse(data[0]));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to close internal gate'));
  }
});

export default router;
