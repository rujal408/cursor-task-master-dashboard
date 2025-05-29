import React from 'react';

interface MetricWidgetProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
}

const MetricWidget: React.FC<MetricWidgetProps> = ({ title, value, icon, trend }) => {
  return (
    <div style={{
      background: 'var(--card-bg)',
      color: 'var(--text)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 20,
      minWidth: 180,
      minHeight: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      boxShadow: '0 2px 8px #0001',
      gap: 8
    }}>
      <div style={{ fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon}
        {value}
      </div>
      <div style={{ fontSize: 14, color: 'var(--text)' }}>{title}</div>
      {trend && <div style={{ fontSize: 12, color: trend.startsWith('+') ? 'green' : 'red' }}>{trend}</div>}
    </div>
  );
};

export default MetricWidget; 