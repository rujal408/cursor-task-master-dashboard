import React, { useMemo, useState } from 'react';

interface Column {
  field: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  initialSort?: { field: string; direction: 'asc' | 'desc' };
  pagination?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, initialSort, pagination = true }) => {
  const [sortField, setSortField] = useState(initialSort?.field || columns[0]?.field || '');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSort?.direction || 'asc');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  // Filtering and sorting
  const processedData = useMemo(() => {
    let result = [...data];
    // Apply filters
    Object.entries(filters).forEach(([field, value]) => {
      if (value) {
        result = result.filter(item =>
          String(item[field]).toLowerCase().includes(String(value).toLowerCase())
        );
      }
    });
    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [data, sortField, sortDirection, filters]);

  // Pagination
  const paginatedData = pagination
    ? processedData.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : processedData;
  const totalPages = Math.ceil(processedData.length / rowsPerPage);

  // Handlers
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(dir => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const handleFilter = (field: string, value: string) => {
    setFilters(f => ({ ...f, [field]: value }));
    setPage(1);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="data-table-container" style={{ width: '100%', overflowX: 'auto', background: 'var(--card-bg)', borderRadius: 8, padding: 16 }}>
      <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.field}
                style={{ cursor: 'pointer', borderBottom: '1px solid var(--border)', padding: 8, background: 'var(--bg)' }}
                onClick={() => handleSort(col.field)}
              >
                {col.label}
                {sortField === col.field && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
              </th>
            ))}
          </tr>
          <tr>
            {columns.map(col => (
              <th key={col.field} style={{ background: 'var(--bg)', padding: 4 }}>
                <input
                  type="text"
                  placeholder={`Filter ${col.label}`}
                  value={filters[col.field] || ''}
                  onChange={e => handleFilter(col.field, e.target.value)}
                  style={{ width: '90%', padding: 4, borderRadius: 4, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)' }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: 16 }}>
                No data found.
              </td>
            </tr>
          ) : (
            paginatedData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                {columns.map(col => (
                  <td key={col.field} style={{ padding: 8 }}>
                    {col.render ? col.render(row[col.field], row) : row[col.field]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && totalPages > 1 && (
        <div className="pagination-controls" style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>&lt;</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>&gt;</button>
          <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }} style={{ marginLeft: 8 }}>
            {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n} / page</option>)}
          </select>
        </div>
      )}
    </div>
  );
};

export default DataTable; 