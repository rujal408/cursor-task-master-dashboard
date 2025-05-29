import React, { useState } from 'react';
import UserList from '../components/user/UserList';
import RoleManagement from '../components/user/RoleManagement';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'roles'>('list');

  return (
    <div className="user-management" style={{ padding: 24 }}>
      <h1>User Management</h1>
      <div className="tabs" style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button
          className={activeTab === 'list' ? 'active' : ''}
          style={{ padding: '8px 16px', borderRadius: 6, background: activeTab === 'list' ? 'var(--primary)' : 'var(--card-bg)', color: activeTab === 'list' ? 'var(--bg)' : 'var(--text)', border: '1px solid var(--border)' }}
          onClick={() => setActiveTab('list')}
        >
          User List
        </button>
        <button
          className={activeTab === 'roles' ? 'active' : ''}
          style={{ padding: '8px 16px', borderRadius: 6, background: activeTab === 'roles' ? 'var(--primary)' : 'var(--card-bg)', color: activeTab === 'roles' ? 'var(--bg)' : 'var(--text)', border: '1px solid var(--border)' }}
          onClick={() => setActiveTab('roles')}
        >
          Role Management
        </button>
      </div>
      {activeTab === 'list' && <UserList />}
      {activeTab === 'roles' && <RoleManagement />}
    </div>
  );
};

export default UserManagement; 