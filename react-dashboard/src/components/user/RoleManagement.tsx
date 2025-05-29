import React from 'react';

const roles = [
  { name: 'admin', permissions: ['manage users', 'view analytics', 'edit settings'] },
  { name: 'editor', permissions: ['manage content', 'view analytics'] },
  { name: 'viewer', permissions: ['view content'] },
];

const RoleManagement: React.FC = () => {
  return (
    <div style={{ background: 'var(--card-bg)', padding: 16, borderRadius: 8 }}>
      <h2>Roles</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Role</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.name}>
              <td style={{ padding: 8 }}>{role.name}</td>
              <td style={{ padding: 8 }}>{role.permissions.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement; 