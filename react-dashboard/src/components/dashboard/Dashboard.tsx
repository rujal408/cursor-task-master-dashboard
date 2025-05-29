import React from 'react';
import MetricWidget from './MetricWidget';
import DataTable from '../table/DataTable';
import LineChartComponent from '../charts/LineChartComponent';

const UserIcon = () => <span role="img" aria-label="users">👥</span>;
const SessionIcon = () => <span role="img" aria-label="sessions">💻</span>;
const ConversionIcon = () => <span role="img" aria-label="conversion">🔄</span>;
const RevenueIcon = () => <span role="img" aria-label="revenue">💰</span>;

const NotificationCenter = () => <div style={{ background: 'var(--card-bg)', padding: 16, borderRadius: 8, flex: 1 }}>Notifications (mock)</div>;
const ActivityFeed = () => <div style={{ background: 'var(--card-bg)', padding: 16, borderRadius: 8, flex: 1 }}>Activity Feed (mock)</div>;
const TaskProgress = () => <div style={{ background: 'var(--card-bg)', padding: 16, borderRadius: 8, flex: 1 }}>Task Progress (mock)</div>;
const UpcomingEvents = () => <div style={{ background: 'var(--card-bg)', padding: 16, borderRadius: 8, flex: 1 }}>Upcoming Events (mock)</div>;

const mockUsers = [
  { id: 1, name: 'Alice Admin', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'Eddie Editor', email: 'editor@example.com', role: 'editor' },
  { id: 3, name: 'Vera Viewer', email: 'viewer@example.com', role: 'viewer' },
  { id: 4, name: 'Sam Session', email: 'sam@example.com', role: 'editor' },
  { id: 5, name: 'Nina New', email: 'nina@example.com', role: 'viewer' },
];

const userColumns = [
  { field: 'id', label: 'ID' },
  { field: 'name', label: 'Name' },
  { field: 'email', label: 'Email' },
  { field: 'role', label: 'Role' },
];

const userActivityData = [
  { date: '2024-06-01', active: 20 },
  { date: '2024-06-02', active: 35 },
  { date: '2024-06-03', active: 28 },
  { date: '2024-06-04', active: 40 },
  { date: '2024-06-05', active: 32 },
  { date: '2024-06-06', active: 45 },
  { date: '2024-06-07', active: 38 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container" style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <div className="widget-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 32 }}>
        <MetricWidget title="Total Users" value={1254} icon={<UserIcon />} trend="+12%" />
        <MetricWidget title="Active Sessions" value={42} icon={<SessionIcon />} trend="-5%" />
        <MetricWidget title="Conversion Rate" value="24%" icon={<ConversionIcon />} trend="+2%" />
        <MetricWidget title="Revenue" value="$12,546" icon={<RevenueIcon />} trend="+18%" />
      </div>
      <div className="dashboard-row" style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <NotificationCenter />
        <ActivityFeed />
      </div>
      <div className="dashboard-row" style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <TaskProgress />
        <UpcomingEvents />
      </div>
      <LineChartComponent data={userActivityData} xKey="date" yKey="active" title="User Activity (Last 7 Days)" />
      <h2>User Table (Demo)</h2>
      <DataTable columns={userColumns} data={mockUsers} initialSort={{ field: 'id', direction: 'asc' }} />
    </div>
  );
};

export default Dashboard; 