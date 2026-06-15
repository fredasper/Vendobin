export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    online: '#4CAF50',
    offline: '#757575',
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
    active: '#4CAF50',
    inactive: '#757575',
  };
  return colors[status] || '#999';
};

export const getStatusLabel = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatValue = (value: any): string => {
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value);
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value * 100) / 100}%`;
};
