import React, { useState } from 'react';
import Card from '../components/DataDisplay/Card';
import FormInput from '../components/Form/FormInput';
import Checkbox from '../components/Form/Checkbox';
import Button from '../components/Buttons/Button';
import { Save, User, Bell, Shield } from 'lucide-react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@contractiq.com',
    role: 'Administrator'
  });
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saved settings', profile, notifications);
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>Settings</h1>
          <p className="text-muted">Manage your personal preferences and account settings.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <Card title="Profile Information" glow={true}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <FormInput 
                  value={profile.name} 
                  onChange={(e) => setProfile({...profile, name: e.target.value})} 
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                />
              </div>
            </div>
            
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <FormInput 
                type="email"
                value={profile.email} 
                onChange={(e) => setProfile({...profile, email: e.target.value})} 
                style={{ width: '100%' }}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Role</label>
              <FormInput 
                value={profile.role} 
                disabled
                style={{ width: '100%', backgroundColor: 'var(--color-bg)' }}
              />
            </div>
            
            <Button type="submit" variant="primary" icon={Save}>
              Save Profile
            </Button>
          </form>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card title="Notifications" glow={true}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-primary-15)', color: 'var(--color-primary)', borderRadius: '8px' }}>
                <Bell size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Email Notifications</h4>
                <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Receive updates about contract expirations and pending reviews.</p>
                <Checkbox 
                  label="Enable Email Alerts" 
                  checked={notifications} 
                  onChange={(e) => setNotifications(e.target.checked)} 
                />
              </div>
            </div>
          </Card>
          
          <Card title="Security" glow={true}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-warning-15)', color: 'var(--color-warning)', borderRadius: '8px' }}>
                <Shield size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Password Management</h4>
                <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Update your password regularly to keep your account secure.</p>
                <Button variant="outline">Change Password</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
