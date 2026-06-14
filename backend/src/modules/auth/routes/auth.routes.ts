import { Router, Response } from 'express';
import { AuthRequest, authMiddleware } from '@shared/middleware/auth';
import { successResponse, errorResponse } from '@shared/utils/response';
import { supabase } from '@shared/database/supabase';

const router = Router();

router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      res.status(401).json(errorResponse(error.message));
      return;
    }

    res.json(successResponse({ token: data.session?.access_token, user: data.user }));
    return;
  } catch (error) {
    res.status(500).json(errorResponse('Login failed'));
    return;
  }
});

router.post('/logout', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    await supabase.auth.signOut();
    res.json(successResponse({ message: 'Logged out' }));
    return;
  } catch (error) {
    res.status(500).json(errorResponse('Logout failed'));
    return;
  }
});

export default router;
