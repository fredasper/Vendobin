import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '@hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="vendobin-login-shell"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0F140D 0%, #172111 52%, #111A10 100%)'
            : 'linear-gradient(135deg, #F7FAF0 0%, #EEF5E5 52%, #F8FAF4 100%)',
      }}
    >
      <Box className="ambient-orb ambient-orb-one" />
      <Box className="ambient-orb ambient-orb-two" />
      <Box className="ambient-orb ambient-orb-three" />
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(37,55,24,0.10)',
            background: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(25, 33, 22, 0.82)' : 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(18px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 28px 70px rgba(0, 0, 0, 0.42)'
                : '0 28px 70px rgba(72, 94, 44, 0.18)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                color: 'primary.main',
                fontWeight: 900,
                mb: 1,
                letterSpacing: '-0.03em',
              }}
            >
              VENDOBIN
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420, mx: 'auto' }}>
              IoT-Based Plastic Bottle Collector with Scantron Reward and Web Monitoring
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
