import React, { useState } from 'react';
import DataTable from '../table/DataTable';

const initialUsers = [
  { id: 1, name: 'Alice Admin', email: 'admin@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Eddie Editor', email: 'editor@example.com', role: 'editor', status: 'active' },
  { id: 3, name: 'Vera Viewer', email: 'viewer@example.com', role: 'viewer', status: 'inactive' },
  { id: 4, name: 'Sam Session', email: 'sam@example.com', role: 'editor', status: 'active' },
  { id: 5, name: 'Nina New', email: 'nina@example.com', role: 'viewer', status: 'pending' },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);

  const columns = [
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email' },
    { field: 'role', label: 'Role' },
    { field: 'status', label: 'Status' },
    {
      field: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <>
          <button style={{ marginRight: 8 }} onClick={() => alert(`Edit user ${row.name}`)}>Edit</button>
          <button style={{ color: 'red' }} onClick={() => alert(`Delete user ${row.name}`)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={users} initialSort={{ field: 'name', direction: 'asc' }} />
    </div>
  );
};

export default UserList; 