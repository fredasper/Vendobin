import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type GateState = 'open' | 'closed';

export default function LiveMachineStatus() {
  const [mainGate, setMainGate] = useState<GateState>('open');
  const [internalGate, setInternalGate] = useState<GateState>('closed');
  const [scantronStock, setScantronStock] = useState(98);

  const handleGateChange = (
    setter: (value: GateState) => void,
    value: GateState | null,
  ) => {
    if (value) {
      setter(value);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Live Machine Status
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.35fr 1fr' },
            gap: 2,
            alignItems: 'stretch',
          }}
        >
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2">Main Gate</Typography>
                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={mainGate}
                  onChange={(_, value) => handleGateChange(setMainGate, value)}
                >
                  <ToggleButton value="closed">Close</ToggleButton>
                  <ToggleButton value="open">Open</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2">Internal Gate</Typography>
                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={internalGate}
                  onChange={(_, value) => handleGateChange(setInternalGate, value)}
                >
                  <ToggleButton value="closed">Close</ToggleButton>
                  <ToggleButton value="open">Open</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2">Bottle Counter</Typography>
                <Chip label="2/3" size="small" variant="outlined" />
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2">WiFi Status</Typography>
                <Chip label="CONNECTED" size="small" sx={{ backgroundColor: '#4CAF50', color: 'white' }} />
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2">Last Activity</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  2 mins ago
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Box sx={{ display: 'grid', gridTemplateRows: { xs: 'auto auto', md: '1fr 1fr' }, gap: 2 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Bottle Counter
              </Typography>
              <Typography variant="h3" sx={{ color: '#6B8E23', fontWeight: 800, lineHeight: 1 }}>
                2/3
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Scantron Stock
              </Typography>
              <TextField
                className="scantron-stock-input"
                type="number"
                size="small"
                value={scantronStock}
                onChange={(event) => setScantronStock(Math.max(0, Number(event.target.value)))}
                inputProps={{ min: 0, step: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ gap: 0.75, ml: 1 }}>
                      <Typography variant="body2">units</Typography>
                      <Box sx={{ display: 'grid', gap: 0.25 }}>
                        <IconButton
                          aria-label="Increase scantron stock"
                          size="small"
                          onClick={() => setScantronStock((value) => value + 1)}
                          sx={{ width: 24, height: 20, borderRadius: 1 }}
                        >
                          <KeyboardArrowUpIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="Decrease scantron stock"
                          size="small"
                          onClick={() => setScantronStock((value) => Math.max(0, value - 1))}
                          sx={{ width: 24, height: 20, borderRadius: 1 }}
                        >
                          <KeyboardArrowDownIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
