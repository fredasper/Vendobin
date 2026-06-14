import { Box, Grid } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ArticleIcon from '@mui/icons-material/Article';
import KPICard from '../components/KPICard';
import LiveMachineStatus from '../components/LiveMachineStatus';
import BottlesChart from '../components/BottlesChart';

export default function DashboardPage() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BottlesChart />
        </Grid>

        <Grid item xs={12} md={6}>
          <KPICard title="Bottles Inserted Today" value={245} icon={<Inventory2Icon fontSize="large" />} color="primary" />
        </Grid>
        <Grid item xs={12} md={6}>
          <KPICard title="Scantron Dispensed Today" value={82} icon={<ArticleIcon fontSize="large" />} color="success" />
        </Grid>

        <Grid item xs={12}>
          <LiveMachineStatus />
        </Grid>
      </Grid>
    </Box>
  );
}
