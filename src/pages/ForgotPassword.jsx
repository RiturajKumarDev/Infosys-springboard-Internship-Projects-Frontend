import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="auth-container fade-in">
      <div className="auth-card text-center">
        <h2>Reset Password</h2>
        <p className="text-muted mt-2">Enter your email to receive a reset link.</p>
        <div className="mt-4">
          <input type="email" placeholder="Email" className="form-input" style={{ width: '100%', marginBottom: '1rem' }} />
          <button className="btn btn-primary w-full">Send Link</button>
        </div>
        <div className="mt-4">
          <Link to="/login" className="text-primary">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
