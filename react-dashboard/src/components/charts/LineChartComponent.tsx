import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface LineChartComponentProps {
  data: any[];
  xKey: string;
  yKey: string;
  title?: string;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data, xKey, yKey, title }) => {
  return (
    <div className="chart-container" style={{ background: 'var(--card-bg)', padding: 16, borderRadius: 8, marginBottom: 32 }}>
      {title && <h3 className="chart-title" style={{ marginBottom: 16 }}>{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey={xKey} stroke="var(--text)" />
          <YAxis stroke="var(--text)" />
          <Tooltip contentStyle={{ background: 'var(--card-bg)', color: 'var(--text)' }} />
          <Legend />
          <Line type="monotone" dataKey={yKey} stroke="#646cff" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent; 