import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { LayoutProvider, useLayout } from '../../contexts/LayoutContext';

const LayoutInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { layoutType, sidebarOpen } = useLayout();
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        {layoutType === 'sidebar' && sidebarOpen && <Sidebar />}
        <main style={{ flex: 1, padding: 24 }}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LayoutProvider>
    <LayoutInner>{children}</LayoutInner>
  </LayoutProvider>
);

export default Layout; 