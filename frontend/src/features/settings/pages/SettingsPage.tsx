import { Box, Paper, TextField, Button, Typography, Divider, Switch, FormControlLabel, Grid } from '@mui/material';
import { useAuth } from '@hooks/useAuth';
import { useSettingsStore } from '@store/settingsStore';

export default function SettingsPage() {
  const { user } = useAuth();
  const {
    machineRefreshInterval,
    notificationsEnabled,
    emailAlerts,
    setMachineRefreshInterval,
    setNotificationsEnabled,
    setEmailAlerts,
  } = useSettingsStore();

  const handleSave = () => {
    console.log('Settings saved');
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Account Settings
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary">Email</Typography>
              <Typography variant="body1">{user?.email}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary">Role</Typography>
              <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{user?.role}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              System Settings
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Machine Refresh Interval (ms)</Typography>
              <TextField
                type="number"
                value={machineRefreshInterval}
                onChange={(e) => setMachineRefreshInterval(Math.max(1000, Number(e.target.value)))}
                helperText="How often the web app refreshes machine data. 5000 means every 5 seconds."
                fullWidth
                variant="outlined"
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                />
              }
              label="Enable Notifications"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                />
              }
              label="Email Alerts"
            />

            <Divider sx={{ my: 2 }} />

            <Button variant="contained" onClick={handleSave}>
              Save Settings
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
