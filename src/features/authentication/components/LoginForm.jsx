import React, { useState } from 'react';
import FormInput from '../../../components/Form/FormInput';
import Checkbox from '../../../components/Form/Checkbox';
import Button from '../../../components/Buttons/Button';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="input-group">
        <label className="input-label">Email Address</label>
        <div className="input-with-icon">
          <Mail size={18} className="input-icon" />
          <FormInput 
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@contractiq.com" 
            required 
            style={{ width: '100%', paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Password</label>
        <div className="input-with-icon">
          <Lock size={18} className="input-icon" />
          <FormInput 
            type="password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            required 
            style={{ width: '100%', paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      <div className="auth-options" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <Checkbox 
          label="Remember me" 
          name="rememberMe" 
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)} 
        />
        <Link to="/forgot-password" className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>Forgot Password?</Link>
      </div>

      <Button type="submit" variant="primary" fullWidth className="mt-4" style={{ marginTop: '1.5rem', padding: '0.75rem', fontSize: '1rem' }}>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
