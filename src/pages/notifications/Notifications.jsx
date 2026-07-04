import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  FileText, 
  Check, 
  Trash2, 
  Clock,
  Settings,
  MoreVertical
} from 'lucide-react';
import Button from '../../components/Buttons/Button';
import './Notifications.css';

const initialNotifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Contract Expiring Soon',
    message: 'The vendor agreement with TechCorp is expiring in 15 days. Action is required to avoid service interruption.',
    time: '2 hours ago',
    read: false,
    icon: <AlertCircle size={22} className="notif-icon-danger" />
  },
  {
    id: 2,
    type: 'success',
    title: 'Obligation Met',
    message: 'Q3 Payment to Global Logistics has been successfully processed and recorded.',
    time: '5 hours ago',
    read: false,
    icon: <CheckCircle size={22} className="notif-icon-success" />
  },
  {
    id: 3,
    type: 'info',
    title: 'New Contract Added',
    message: 'A new NDA contract for Project X has been uploaded by Sarah and is awaiting your review.',
    time: 'Yesterday',
    read: true,
    icon: <FileText size={22} className="notif-icon-primary" />
  },
  {
    id: 4,
    type: 'warning',
    title: 'Pending Approval',
    message: 'Marketing Services Agreement requires your signature before end of week.',
    time: '2 days ago',
    read: true,
    icon: <Info size={22} className="notif-icon-warning" />
  },
  {
    id: 5,
    type: 'system',
    title: 'System Update',
    message: 'Scheduled maintenance on Saturday 2AM - 4AM EST. The portal will be briefly unavailable.',
    time: '1 week ago',
    read: true,
    icon: <Bell size={22} className="notif-icon-muted" />
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => 
    activeTab === 'unread' ? !n.read : true
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notif-dashboard fade-in">
      <div className="notif-header-section">
        <div className="notif-header-content">
          <div className="notif-title-row">
            <h1 className="notif-title">Notifications</h1>
            {unreadCount > 0 && <span className="notif-badge-pill">{unreadCount} New</span>}
          </div>
          <p className="notif-subtitle">Stay updated on your contracts, obligations, and system alerts.</p>
        </div>
        <div className="notif-header-actions">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead} icon={Check}>
              Mark all as read
            </Button>
          )}
          <Button variant="outline" icon={Settings}>
            Preferences
          </Button>
        </div>
      </div>

      <div className="notif-main-area animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="notif-tabs">
          <button 
            className={`notif-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Notifications
          </button>
          <button 
            className={`notif-tab-btn ${activeTab === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveTab('unread')}
          >
            Unread
          </button>
        </div>

        <div className="notif-list-container">
          {filteredNotifications.length === 0 ? (
            <div className="notif-empty-state">
              <div className="empty-bell-wrapper">
                <Bell size={48} className="empty-bell-icon" />
              </div>
              <h3>You're all caught up!</h3>
              <p>There are no {activeTab === 'unread' ? 'unread' : 'new'} alerts to review right now.</p>
            </div>
          ) : (
            filteredNotifications.map((notif, index) => (
              <div 
                key={notif.id} 
                className={`notif-item-card ${!notif.read ? 'is-unread' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => markAsRead(notif.id)}
              >
                {!notif.read && <div className="unread-dot"></div>}
                
                <div className={`notif-avatar bg-tint-${notif.type}`}>
                  {notif.icon}
                </div>
                
                <div className="notif-content-block">
                  <div className="notif-top-row">
                    <h4 className="notif-item-title">{notif.title}</h4>
                    <span className="notif-timestamp">
                      <Clock size={12} /> {notif.time}
                    </span>
                  </div>
                  <p className="notif-item-message">{notif.message}</p>
                  
                  <div className="notif-hover-actions">
                    {!notif.read && (
                      <button 
                        className="quick-action-btn action-read"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notif.id);
                        }}
                      >
                        <Check size={14} /> Mark Read
                      </button>
                    )}
                    <button 
                      className="quick-action-btn action-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
                
                <button className="notif-menu-btn">
                  <MoreVertical size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
