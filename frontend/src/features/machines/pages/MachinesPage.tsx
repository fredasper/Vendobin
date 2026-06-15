import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

type MachineStatus = 'online' | 'offline';
type MachineAction = 'restart' | 'turn-off';

interface ComponentHistoryItem {
  id: number;
  time: string;
  component: string;
  status: 'info' | 'error' | 'success';
  message: string;
}

const initialHistory: ComponentHistoryItem[] = [
  { id: 1, time: '2 mins ago', component: 'WiFi Module', status: 'success', message: 'Connection stable' },
  { id: 2, time: '7 mins ago', component: 'Bottle Counter', status: 'info', message: 'Counter reached 2/3' },
  { id: 3, time: '12 mins ago', component: 'Main Gate Servo', status: 'success', message: 'Gate opened remotely' },
  { id: 4, time: '18 mins ago', component: 'Scantron Dispenser', status: 'info', message: 'Stock level updated' },
];

export default function MachinesPage() {
  const [status, setStatus] = useState<MachineStatus>('online');
  const [pendingAction, setPendingAction] = useState<MachineAction | null>(null);
  const [componentHistory, setComponentHistory] = useState<ComponentHistoryItem[]>(initialHistory);

  const openConfirm = (action: MachineAction) => {
    setPendingAction(action);
  };

  const confirmAction = () => {
    if (pendingAction === 'restart') {
      setStatus('online');
      setComponentHistory((history) => [
        { id: Date.now(), time: 'Just now', component: 'System', status: 'info', message: 'Machine restart command sent' },
        ...history,
      ]);
    }

    if (pendingAction === 'turn-off') {
      setStatus('offline');
      setComponentHistory((history) => [
        { id: Date.now(), time: 'Just now', component: 'System', status: 'info', message: 'Machine turn off command sent' },
        ...history,
      ]);
    }

    setPendingAction(null);
  };

  const actionLabel = pendingAction === 'restart' ? 'restart' : 'turn off';

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Machine
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    VENDOBIN-001
                  </Typography>
                </Box>
                <Chip
                  label={status.toUpperCase()}
                  color={status === 'online' ? 'success' : 'default'}
                  size="small"
                />
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Machine Status
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                      {status}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Last Seen
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      2 mins ago
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={<RestartAltIcon />}
                  onClick={() => openConfirm('restart')}
                >
                  Restart Machine
                </Button>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  color="error"
                  startIcon={<PowerSettingsNewIcon />}
                  onClick={() => openConfirm('turn-off')}
                >
                  Turn Off Machine
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Recent Component History
              </Typography>
              <Stack spacing={1.5}>
                {componentHistory.slice(0, 5).map((item) => (
                  <Paper key={item.id} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {item.component}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.message}
                        </Typography>
                      </Box>
                      <Chip label={item.status} color={item.status === 'success' ? 'success' : item.status} size="small" />
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {item.time}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={Boolean(pendingAction)} onClose={() => setPendingAction(null)}>
        <DialogTitle>Confirm Machine Action</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to {actionLabel} the machine?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingAction(null)}>Cancel</Button>
          <Button onClick={confirmAction} variant="contained" color={pendingAction === 'turn-off' ? 'error' : 'primary'}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
