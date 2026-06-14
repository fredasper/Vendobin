export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },

  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
  },

  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },

  debug: (message: string, data?: any) => {
    if (process.env.DEBUG) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
};

export const handleError = (error: any, context: string): string => {
  logger.error(`${context}: ${error?.message}`);

  if (error?.response?.status === 401) {
    return 'Unauthorized. Please login again.';
  }

  if (error?.response?.status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (error?.response?.status === 404) {
    return 'Resource not found.';
  }

  if (error?.response?.status === 500) {
    return 'Server error. Please try again later.';
  }

  return error?.message || 'An unexpected error occurred.';
};
