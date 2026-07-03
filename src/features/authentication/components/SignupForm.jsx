import React, { useState } from 'react';
import FormInput from '../../../components/Form/FormInput';
import Button from '../../../components/Buttons/Button';
import { Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="input-group">
        <label className="input-label">Full Name</label>
        <div className="input-with-icon">
          <User size={18} className="input-icon" />
          <FormInput 
            type="text" 
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe" 
            required 
            style={{ width: '100%', paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

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

      <Button type="submit" variant="primary" fullWidth className="mt-4" style={{ marginTop: '1.5rem', padding: '0.75rem', fontSize: '1rem' }}>
        Request Access
      </Button>
    </form>
  );
};

export default SignupForm;
