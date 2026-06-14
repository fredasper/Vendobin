import { createTheme } from '@mui/material/styles';

const VENDOBIN_GREEN = '#6B8E23';
const VENDOBIN_LIGHT_GREEN = '#8AAE3E';
const VENDOBIN_DEEP_GREEN = '#243719';

export const createAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: VENDOBIN_GREEN,
        light: VENDOBIN_LIGHT_GREEN,
        dark: VENDOBIN_DEEP_GREEN,
      },
      secondary: {
        main: VENDOBIN_LIGHT_GREEN,
        light: '#A0C869',
        dark: '#6B8E23',
      },
      background: {
        default: isDark ? '#0F140D' : '#F5F7F1',
        paper: isDark ? '#192116' : '#FFFFFF',
      },
      success: {
        main: '#4CAF50',
      },
      warning: {
        main: '#FFC107',
      },
      error: {
        main: '#F44336',
      },
      info: {
        main: '#2196F3',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: VENDOBIN_GREEN,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        color: VENDOBIN_GREEN,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '0.875rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.43,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark
              ? 'linear-gradient(90deg, #243719 0%, #516F1F 100%)'
              : 'linear-gradient(90deg, #6B8E23 0%, #82A531 100%)',
            boxShadow: isDark ? '0 14px 32px rgba(0, 0, 0, 0.35)' : '0 12px 30px rgba(55, 84, 18, 0.18)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '10px',
          boxShadow: 'none',
        },
      },
    },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(37, 55, 24, 0.08)',
            boxShadow: isDark ? '0 18px 45px rgba(0, 0, 0, 0.28)' : '0 18px 45px rgba(74, 96, 44, 0.10)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '999px',
            fontWeight: 700,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            overflow: 'hidden',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontSize: '0.78rem',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          },
          body: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(37, 55, 24, 0.08)',
          },
        },
      },
    },
    shape: {
      borderRadius: 10,
    },
  });
};
