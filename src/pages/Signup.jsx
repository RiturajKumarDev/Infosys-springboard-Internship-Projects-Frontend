import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import SignupForm from '../features/authentication/components/SignupForm';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignupSubmit = (details) => {
    console.log('Signup details:', details);
    // Simulate authentication
    navigate('/dashboard');
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card">
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <ShieldCheck size={48} className="auth-logo mx-auto" style={{ color: 'var(--color-primary)' }} />
          <h1>Join Contract<span>IQ</span></h1>
          <p className="text-muted">Request access to the platform</p>
        </div>

        <SignupForm onSubmit={handleSignupSubmit} />

        <div className="auth-footer" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
          <p>Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
