import React, { useState, useRef, useEffect } from 'react';
import { useLayout } from '../../contexts/LayoutContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotification } from '../../contexts/NotificationContext';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { layoutType, setLayoutType, sidebarOpen, setSidebarOpen } = useLayout();
  const { theme, toggleTheme } = useTheme();
  const { notifications, markAsRead, clearAll } = useNotification();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // code
  }, [notifications]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>React Admin Dashboard</h1>
      <div className={styles.header__actions}>
        {layoutType === 'sidebar' && (
          <button
            className={styles.header__btn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
        )}
        <button
          className={styles.header__btn}
          onClick={() => setLayoutType(layoutType === 'sidebar' ? 'topnav' : 'sidebar')}
        >
          Switch to {layoutType === 'sidebar' ? 'Topnav' : 'Sidebar'}
        </button>
        <button
          className={styles.header__btn}
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
        </button>
        {/* Notification Bell */}
        <div ref={bellRef} className={styles.header__bell}>
          <button
            className={styles["header__bell-btn"]}
            onClick={() => setDropdownOpen(d => !d)}
            aria-label="Notifications"
          >
            <span role="img" aria-label="bell">🔔</span>
            {unreadCount > 0 && (
              <span className={styles.header__badge}>{unreadCount}</span>
            )}
          </button>
          {dropdownOpen && (
            <div className={styles.header__dropdown}>
              <div className={styles["header__dropdown-header"]}>
                <strong>Notifications</strong>
                <button className={styles["header__dropdown-clear"]} onClick={clearAll}>Clear All</button>
              </div>
              <div className={styles["header__dropdown-list"]}>
                {notifications.length === 0 ? (
                  <div className={styles["header__dropdown-empty"]}>No notifications</div>
                ) : notifications.map(n => (
                  <div
                    key={n.id}
                    className={[
                      styles["header__dropdown-item"],
                      !n.read && styles['header__dropdown-item--unread']
                    ].filter(Boolean).join(' ')}
                  >
                    <span className={styles["header__dropdown-icon"]}>{n.type === 'success' ? '✅' : n.type === 'error' ? '❌' : n.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                    <span className={styles["header__dropdown-message"]}>{n.message}</span>
                    {!n.read && <button className={styles["header__dropdown-mark"]} onClick={() => markAsRead(n.id)}>Mark as read</button>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.header__user}>User ▼</div>
      </div>
    </header>
  );
};

export default Header; 