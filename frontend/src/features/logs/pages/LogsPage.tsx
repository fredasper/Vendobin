import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, TextField, MenuItem, Button, Chip } from '@mui/material';
import { useState } from 'react';

export default function LogsPage() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const data = [
    { id: 1, timestamp: '2024-01-15 14:23:45', type: 'error', component: 'Main Gate', message: 'Main gate servo did not move' },
    { id: 2, timestamp: '2024-01-15 14:10:18', type: 'error', component: 'Internal Gate', message: 'Internal gate servo did not move' },
    { id: 3, timestamp: '2024-01-15 13:42:09', type: 'error', component: 'Motor', message: 'Motor did not spin' },
    { id: 4, timestamp: '2024-01-15 13:25:31', type: 'error', component: 'Sensor', message: 'Sensor not detecting' },
    { id: 5, timestamp: '2024-01-15 12:00:10', type: 'info', component: 'System', message: 'Machine restarted' },
    { id: 6, timestamp: '2024-01-15 11:36:44', type: 'info', component: 'System', message: 'Machine turned off' },
  ];

  const getTypeColor = (logType: string) => {
    const colors: Record<string, string> = {
      error: 'error',
      info: 'info',
    };
    return colors[logType] || 'default';
  };

  const filteredData = data.filter((row) => {
    const matchesType = type ? row.type === type : true;
    const matchesDate = searchDate ? row.timestamp.startsWith(searchDate) : true;

    return matchesType && matchesDate;
  });

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="info">Info</MenuItem>
          <MenuItem value="error">Error</MenuItem>
        </TextField>
        <TextField
          label="Search by date"
          type="date"
          value={searchDate}
          onChange={(e) => {
            setSearchDate(e.target.value);
            setPage(1);
          }}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained">Search</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#6B8E23' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Timestamp</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Type</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Component</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>
                  <Chip label={row.type} color={getTypeColor(row.type) as any} size="small" />
                </TableCell>
                <TableCell>{row.component}</TableCell>
                <TableCell>{row.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={10} page={page} onChange={(_, p) => setPage(p)} />
      </Box>
    </Box>
  );
}
