import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLayout } from '../contexts/LayoutContext';
import './Settings.css';

const defaultPrefs = {
  info: true,
  success: true,
  warning: true,
  error: true,
  toastDuration: 3500,
  sound: false,
};

const PROFILE_KEY = 'profileSettings';

const validateEmail = (email: string) => /.+@.+\..+/.test(email);

const ProfileSettings: React.FC<{ user: any }> = ({ user }) => {
  const { addNotification } = useNotification();
  const stored = localStorage.getItem(PROFILE_KEY);
  const initial = stored ? JSON.parse(stored) : { name: user?.email?.split('@')[0] || '', email: user?.email || '' };
  const [form, setForm] = useState({ name: initial.name, email: initial.email });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(form.email)) errs.email = 'Invalid email format';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(form));
      addNotification({ type: 'success', message: 'Profile updated successfully!', showToast: true });
      setSaving(false);
    }, 600);
  };

  return (
    <div className="settings-section">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <div style={{ marginBottom: 18 }}>
          <label className="settings-label">Display Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="settings-input"
          />
          {errors.name && <div className="settings-error">{errors.name}</div>}
        </div>
        <div style={{ marginBottom: 18 }}>
          <label className="settings-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="settings-input"
          />
          {errors.email && <div className="settings-error">{errors.email}</div>}
        </div>
        <button type="submit" disabled={saving} className="settings-btn">
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

const AppearanceSettings: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
  const { layoutType, setLayoutType } = useLayout();
  return (
    <div className="settings-section">
      <h2>Appearance</h2>
      <div style={{ margin: '16px 0' }}>
        <span>Theme: </span>
        <button onClick={toggleTheme} style={{ marginLeft: 8 }} className="settings-btn">
          {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>
      <div style={{ margin: '16px 0' }}>
        <label className="settings-label" style={{ marginRight: 8 }}>Layout Type:</label>
        <select
          value={layoutType}
          onChange={e => setLayoutType(e.target.value as 'sidebar' | 'topnav')}
          className="settings-input"
          style={{ width: 180, display: 'inline-block' }}
        >
          <option value="sidebar">Sidebar</option>
          <option value="topnav">Top Navigation</option>
        </select>
      </div>
      <div className="settings-muted">More appearance options coming soon.</div>
    </div>
  );
};

const NotificationSettings: React.FC = () => {
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem('notificationPrefs');
    return saved ? JSON.parse(saved) : defaultPrefs;
  });
  const { addNotification } = useNotification();

  const handleToggle = (type: keyof typeof defaultPrefs) => {
    setPrefs((prev: any) => {
      const updated = { ...prev, [type]: !prev[type] };
      localStorage.setItem('notificationPrefs', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1000, Math.min(10000, Number(e.target.value)));
    setPrefs((prev: any) => {
      const updated = { ...prev, toastDuration: value };
      localStorage.setItem('notificationPrefs', JSON.stringify(updated));
      return updated;
    });
  };

  const triggerMock = (type: 'info' | 'success' | 'warning' | 'error') => {
    addNotification({
      type,
      message:
        type === 'info'
          ? 'This is an info notification.'
          : type === 'success'
          ? 'Success! Your action was completed.'
          : type === 'warning'
          ? 'Warning: Please check your input.'
          : 'Error: Something went wrong.',
      showToast: true,
    });
  };

  return (
    <div className="settings-section">
      <h2>Notification Preferences</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
        <div>
          <label className="settings-label">Notification Types:</label>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            {['info', 'success', 'warning', 'error'].map(type => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="checkbox"
                  checked={prefs[type as keyof typeof defaultPrefs]}
                  onChange={() => handleToggle(type as keyof typeof defaultPrefs)}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="settings-label">Toast Duration (ms):</label>
          <input
            type="number"
            min={1000}
            max={10000}
            step={500}
            value={prefs.toastDuration}
            onChange={handleDurationChange}
            className="settings-input"
            style={{ width: 100, marginLeft: 8 }}
          />
        </div>
        <div>
          <label className="settings-label" style={{ marginRight: 8 }}>Sound Alerts:</label>
          <input
            type="checkbox"
            checked={prefs.sound}
            onChange={() => handleToggle('sound')}
          />
        </div>
      </div>
      <div style={{ marginTop: 40 }}>
        <h3>Demo: Trigger Mock Notifications</h3>
        <p className="settings-muted" style={{ marginBottom: 12 }}>Click a button to trigger a notification of that type. Preferences above will be respected.</p>
        <div className="settings-demo-btns">
          <button onClick={() => triggerMock('info')} className="settings-btn info">Info</button>
          <button onClick={() => triggerMock('success')} className="settings-btn success">Success</button>
          <button onClick={() => triggerMock('warning')} className="settings-btn warning">Warning</button>
          <button onClick={() => triggerMock('error')} className="settings-btn error">Error</button>
        </div>
      </div>
    </div>
  );
};

const SecuritySettings: React.FC = () => {
  const { addNotification } = useNotification();
  const [form, setForm] = useState({ current: '', new: '', confirm: '' });
  const [errors, setErrors] = useState<{ current?: string; new?: string; confirm?: string }>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs: { current?: string; new?: string; confirm?: string } = {};
    if (!form.current) errs.current = 'Current password is required';
    if (!form.new) errs.new = 'New password is required';
    else if (form.new.length < 6) errs.new = 'New password must be at least 6 characters';
    if (!form.confirm) errs.confirm = 'Please confirm new password';
    else if (form.new !== form.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      addNotification({ type: 'success', message: 'Password changed successfully!', showToast: true });
      setForm({ current: '', new: '', confirm: '' });
      setSaving(false);
    }, 700);
  };

  const handleLogoutAll = () => {
    addNotification({ type: 'info', message: 'Logged out of all devices (demo only).', showToast: true });
  };

  return (
    <div className="settings-section">
      <h2>Security Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <div style={{ marginBottom: 18 }}>
          <label className="settings-label">Current Password</label>
          <input
            type="password"
            name="current"
            value={form.current}
            onChange={handleChange}
            className="settings-input"
          />
          {errors.current && <div className="settings-error">{errors.current}</div>}
        </div>
        <div style={{ marginBottom: 18 }}>
          <label className="settings-label">New Password</label>
          <input
            type="password"
            name="new"
            value={form.new}
            onChange={handleChange}
            className="settings-input"
          />
          {errors.new && <div className="settings-error">{errors.new}</div>}
        </div>
        <div style={{ marginBottom: 18 }}>
          <label className="settings-label">Confirm New Password</label>
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            className="settings-input"
          />
          {errors.confirm && <div className="settings-error">{errors.confirm}</div>}
        </div>
        <button type="submit" disabled={saving} className="settings-btn">
          {saving ? 'Saving...' : 'Change Password'}
        </button>
      </form>
      <div>
        <button onClick={handleLogoutAll} className="settings-btn secondary">
          Log out of all devices
        </button>
      </div>
    </div>
  );
};

const sections = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'appearance', label: 'Appearance', icon: '🎨' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'security', label: 'Security', icon: '🔒' },
];

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="settings-page">
      <aside className="settings-sidebar">
        <nav className="settings-nav">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`settings-nav-btn${activeSection === section.id ? ' active' : ''}`}
            >
              <span style={{ fontSize: 22 }}>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="settings-content">
        {activeSection === 'profile' && <ProfileSettings user={user} />}
        {activeSection === 'appearance' && <AppearanceSettings theme={theme} toggleTheme={toggleTheme} />}
        {activeSection === 'notifications' && <NotificationSettings />}
        {activeSection === 'security' && <SecuritySettings />}
      </main>
    </div>
  );
};

export default Settings; 