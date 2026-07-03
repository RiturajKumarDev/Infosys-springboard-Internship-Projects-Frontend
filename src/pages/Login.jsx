import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import LoginForm from '../features/authentication/components/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = (credentials) => {
    console.log('Login credentials:', credentials);
    // Simulate authentication
    navigate('/dashboard');
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card">
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <ShieldCheck size={48} className="auth-logo mx-auto" style={{ color: 'var(--color-primary)' }} />
          <h1>Welcome to Contract<span>IQ</span></h1>
          <p className="text-muted">Sign in to manage your contracts and obligations</p>
        </div>

        <LoginForm onSubmit={handleLoginSubmit} />

        <div className="auth-footer" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
          <p>Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Request Access</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
