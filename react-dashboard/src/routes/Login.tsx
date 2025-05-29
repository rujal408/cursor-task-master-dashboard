import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormInputs {
  email: string;
  password: string;
  remember: boolean;
}

const mockUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'editor@example.com', password: 'editor123', role: 'editor' },
  { email: 'viewer@example.com', password: 'viewer123', role: 'viewer' },
];

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: LoginFormInputs) => {
    setLoading(true);
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === data.email && u.password === data.password);
      if (user) {
        login({ email: user.email, role: user.role as 'admin' | 'editor' | 'viewer' });
        if (data.remember) {
          localStorage.setItem('rememberedUser', JSON.stringify({ email: user.email, role: user.role as 'admin' | 'editor' | 'viewer' }));
        } else {
          localStorage.removeItem('rememberedUser');
        }
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input type="email" {...register('email', { required: 'Email is required' })} style={{ width: '100%', padding: 8, marginTop: 4 }} />
          {errors.email && <div style={{ color: 'red', fontSize: 12 }}>{errors.email.message}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input type="password" {...register('password', { required: 'Password is required' })} style={{ width: '100%', padding: 8, marginTop: 4 }} />
          {errors.password && <div style={{ color: 'red', fontSize: 12 }}>{errors.password.message}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" {...register('remember')} style={{ marginRight: 8 }} />
            Remember me
          </label>
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, background: '#222', color: '#fff', border: 'none', borderRadius: 4 }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login; 