import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  read: boolean;
  timestamp: Date;
  showToast?: boolean;
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => number;
  markAsRead: (id: number) => void;
  removeNotification: (id: number) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

const defaultPrefs = {
  info: true,
  success: true,
  warning: true,
  error: true,
  toastDuration: 3500,
  sound: false,
};

const NOTIF_STORAGE_KEY = 'notifications';
const NOTIF_EXPIRY_DAYS = 7;

const ToastContainer: React.FC<{ toasts?: Notification[] }> = ({ toasts = [] }) => (
  <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
    {toasts.map(toast => (
      <div key={toast.id} style={{
        background: toast.type === 'success' ? '#4caf50' : toast.type === 'error' ? '#f44336' : toast.type === 'warning' ? '#ff9800' : '#2196f3',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: 6,
        marginBottom: 12,
        boxShadow: '0 2px 8px #0002',
        minWidth: 220,
        fontWeight: 500,
      }}>
        {toast.message}
      </div>
    ))}
  </div>
);

function filterExpired(notifs: Notification[]) {
  const now = Date.now();
  const expiry = NOTIF_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return notifs.filter(n => now - new Date(n.timestamp).getTime() < expiry);
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toasts, setToasts] = useState<Notification[]>([]);
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem('notificationPrefs');
    return saved ? JSON.parse(saved) : defaultPrefs;
  });
  const soundRef = useRef<HTMLAudioElement | null>(null);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(NOTIF_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Notification[] = JSON.parse(stored).map((n: any) => ({ ...n, timestamp: new Date(n.timestamp) }));
        setNotifications(filterExpired(parsed));
      } catch {}
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      NOTIF_STORAGE_KEY,
      JSON.stringify(notifications.map(n => ({ ...n, timestamp: n.timestamp.toISOString() })))
    );
  }, [notifications]);

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('notificationPrefs');
      setPrefs(saved ? JSON.parse(saved) : defaultPrefs);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Optionally, play a simple beep for sound alerts
  const playSound = () => {
    if (!prefs.sound) return;
    if (!soundRef.current) {
      soundRef.current = new window.Audio(
        'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='
      );
    }
    soundRef.current.currentTime = 0;
    soundRef.current.play();
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => {
    if (!prefs[notification.type]) return -1;
    const id = Date.now();
    const newNotification: Notification = {
      id,
      read: false,
      timestamp: new Date(),
      ...notification,
    };
    setNotifications(prev => [newNotification, ...prev]);
    if (notification.showToast !== false) {
      setToasts(prev => [...prev, newNotification]);
      if (prefs.sound) playSound();
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, prefs.toastDuration || 3500);
    }
    return id;
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, removeNotification, clearAll }}>
      {children}
      <ToastContainer toasts={toasts} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within a NotificationProvider');
  return context;
}; 