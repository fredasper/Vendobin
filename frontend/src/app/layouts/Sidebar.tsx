import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import ErrorIcon from '@mui/icons-material/Error';
import DevicesIcon from '@mui/icons-material/Devices';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '@hooks/useAuth';

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

export default function Sidebar({ mobileOpen, onDrawerToggle }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'History', icon: <HistoryIcon />, path: '/history' },
    { label: 'Logs', icon: <ErrorIcon />, path: '/logs' },
    { label: 'Machine', icon: <DevicesIcon />, path: '/machines' },
  ];

  const adminItems = [
    { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ px: 2.5, py: 2.25 }}>
        <Typography sx={{ color: '#6B8E23', fontWeight: 900, fontSize: '1.08rem', letterSpacing: 0 }}>
          VENDOBIN
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Web Monitoring
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 1.5, py: 1.5 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={onDrawerToggle}
              sx={{
                borderRadius: 2,
                color: active ? 'primary.main' : 'text.secondary',
                backgroundColor: active ? 'rgba(107, 142, 35, 0.12)' : 'transparent',
                '&:hover': {
                  backgroundColor: active ? 'rgba(107, 142, 35, 0.16)' : 'rgba(107, 142, 35, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 42 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: active ? 800 : 600 }} />
            </ListItemButton>
          </ListItem>
          );
        })}
      </List>

      {isAdmin && (
        <>
          <Divider sx={{ my: 1 }} />
          <List sx={{ px: 1.5, py: 1 }}>
            {adminItems.map((item) => {
              const active = location.pathname === item.path;

              return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  onClick={onDrawerToggle}
                  sx={{
                    borderRadius: 2,
                    color: active ? 'primary.main' : 'text.secondary',
                    backgroundColor: active ? 'rgba(107, 142, 35, 0.12)' : 'transparent',
                    '&:hover': {
                      backgroundColor: active ? 'rgba(107, 142, 35, 0.16)' : 'rgba(107, 142, 35, 0.08)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 42 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: active ? 800 : 600 }} />
                </ListItemButton>
              </ListItem>
              );
            })}
          </List>
        </>
      )}
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            mt: '70px',
            height: 'calc(100vh - 70px)',
            borderRight: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(37,55,24,0.08)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
