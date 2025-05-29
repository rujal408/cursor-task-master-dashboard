import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <small>&copy; {new Date().getFullYear()} React Dashboard</small>
  </footer>
);

export default Footer; 