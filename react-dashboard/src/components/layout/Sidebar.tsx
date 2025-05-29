import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/settings', label: 'Settings' },
  { to: '/form-demo', label: 'Form Demo' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.sidebar__nav}>
        <ul className={styles.sidebar__list}>
          {links.map(link => (
            <li className={styles.sidebar__item} key={link.to}>
              <Link
                to={link.to}
                className={
                  location.pathname.startsWith(link.to)
                    ? `${styles.sidebar__link} ${styles['sidebar__link--active']}`
                    : styles.sidebar__link
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 