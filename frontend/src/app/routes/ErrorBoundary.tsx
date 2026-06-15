import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application render error:', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 700 }}>This page failed to render.</Typography>
            <Typography variant="body2">{this.state.error.message}</Typography>
          </Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
