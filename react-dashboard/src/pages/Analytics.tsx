import React, { useState, useEffect } from 'react';
import LineChartComponent from '../components/charts/LineChartComponent';
import DataTable from '../components/table/DataTable';

const mockCategories = [
  { value: 'all', label: 'All' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
];
const mockStatuses = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const generateMockAnalyticsData = (dateRange: any, filters: any) => {
  // Generate mock chart and table data
  const chartData = Array.from({ length: 7 }, (_, i) => ({
    date: `2024-06-0${i + 1}`,
    value: Math.floor(Math.random() * 100) + 20,
  }));
  const detailedData = Array.from({ length: 20 }, (_, i) => ({
    date: `2024-06-${(i % 7) + 1}`,
    category: ['marketing', 'sales', 'support'][i % 3],
    status: ['active', 'inactive'][i % 2],
    metric: Math.floor(Math.random() * 1000),
  }));
  return { chartData, detailedData };
};

const analyticsColumns = [
  { field: 'date', label: 'Date' },
  { field: 'category', label: 'Category' },
  { field: 'status', label: 'Status' },
  { field: 'metric', label: 'Metric' },
];

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: '2024-06-01', end: '2024-06-07' });
  const [filters, setFilters] = useState({ category: 'all', status: 'all' });
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(generateMockAnalyticsData(dateRange, filters));
      setLoading(false);
    }, 600);
  }, [dateRange, filters]);

  const handleExport = (format: string) => {
    alert(`Exporting as ${format.toUpperCase()} (mock)`);
  };

  return (
    <div className="analytics-dashboard" style={{ padding: 24 }}>
      <div className="controls-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>Analytics Dashboard</h1>
        <div className="export-controls">
          <button onClick={() => handleExport('csv')}>Export CSV</button>
          <button onClick={() => handleExport('excel')}>Export Excel</button>
        </div>
      </div>
      <div className="filters-section" style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div>
          <label>Date Range</label>
          <input type="date" value={dateRange.start} onChange={e => setDateRange(r => ({ ...r, start: e.target.value }))} />
          <span style={{ margin: '0 8px' }}>to</span>
          <input type="date" value={dateRange.end} onChange={e => setDateRange(r => ({ ...r, end: e.target.value }))} />
        </div>
        <div>
          <label>Category</label>
          <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
            {mockCategories.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label>Status</label>
          <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
            {mockStatuses.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 48 }}>Loading analytics...</div>
      ) : (
        <>
          <div className="charts-grid" style={{ marginBottom: 32 }}>
            <LineChartComponent data={data.chartData} xKey="date" yKey="value" title="Metric Over Time" />
          </div>
          <div className="data-tables-section">
            <h2>Detailed Analytics</h2>
            <DataTable columns={analyticsColumns} data={data.detailedData} initialSort={{ field: 'date', direction: 'desc' }} />
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics; 