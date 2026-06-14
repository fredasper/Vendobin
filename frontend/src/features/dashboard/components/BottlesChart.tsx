import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', value: 12 },
  { time: '01:00', value: 9 },
  { time: '02:00', value: 7 },
  { time: '03:00', value: 8 },
  { time: '04:00', value: 11 },
  { time: '05:00', value: 15 },
  { time: '06:00', value: 21 },
  { time: '07:00', value: 28 },
  { time: '08:00', value: 35 },
  { time: '09:00', value: 42 },
  { time: '10:00', value: 48 },
  { time: '11:00', value: 51 },
  { time: '12:00', value: 52 },
  { time: '13:00', value: 49 },
  { time: '14:00', value: 46 },
  { time: '15:00', value: 44 },
  { time: '16:00', value: 41 },
  { time: '17:00', value: 39 },
  { time: '18:00', value: 35 },
  { time: '19:00', value: 32 },
  { time: '20:00', value: 28 },
  { time: '21:00', value: 24 },
  { time: '22:00', value: 19 },
  { time: '23:00', value: 15 },
];

const ticks = data.filter((_, index) => index % 2 === 0).map((item) => item.time);

export default function BottlesChart() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Hourly Bottles Inserted
        </Typography>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 12, right: 24, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" ticks={ticks} interval={0} tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6B8E23" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
