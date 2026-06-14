import { Request, Response } from 'express';

export const logger = {
  info: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [INFO] ${message}`, data ? JSON.stringify(data) : '');
  },

  error: (message: string, error?: any) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [ERROR] ${message}`, error);
  },

  warn: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] [WARN] ${message}`, data ? JSON.stringify(data) : '');
  },

  debug: (message: string, data?: any) => {
    if (process.env.DEBUG) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [DEBUG] ${message}`, data ? JSON.stringify(data) : '');
    }
  },

  request: (req: Request) => {
    logger.info(`${req.method} ${req.path}`, {
      query: req.query,
      userId: (req as any).userId,
    });
  },

  response: (req: Request, _res: Response, statusCode: number) => {
    logger.info(`${req.method} ${req.path} - ${statusCode}`);
  },
};
