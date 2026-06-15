import type { ReactNode } from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

interface KPICardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

export default function KPICard({ title, value, icon, color }: KPICardProps) {
  const colorMap: Record<string, string> = {
    primary: '#6B8E23',
    secondary: '#8AAE3E',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Box>
            <Typography color="textSecondary" sx={{ fontSize: '0.875rem' }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: colorMap[color] }}>
              {value.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ fontSize: '2rem' }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
