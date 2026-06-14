import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, TextField } from '@mui/material';
import { useState } from 'react';

export default function HistoryPage() {
  const [page, setPage] = useState(1);
  const [searchDate, setSearchDate] = useState('');

  const data = [
    { id: 1, date: '2024-01-15', change: '↑ 24% from yesterday', bottles: 245, scantrons: 82 },
    { id: 2, date: '2024-01-14', change: '↑ 8% from yesterday', bottles: 198, scantrons: 66 },
    { id: 3, date: '2024-01-13', change: '↑ 16% from yesterday', bottles: 312, scantrons: 104 },
  ];

  const filteredData = searchDate ? data.filter((row) => row.date === searchDate) : data;

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
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
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#6B8E23' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Change</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Bottles</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Scantrons</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.change}</TableCell>
                <TableCell>{row.bottles}</TableCell>
                <TableCell>{row.scantrons}</TableCell>
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
