import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  FileText, 
  Check, 
  Trash2, 
  Clock 
} from 'lucide-react';
import './Notifications.css';

const initialNotifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Contract Expiring Soon',
    message: 'The vendor agreement with TechCorp is expiring in 15 days.',
    time: '2 hours ago',
    read: false,
    icon: <AlertCircle size={20} className="text-danger" />
  },
  {
    id: 2,
    type: 'success',
    title: 'Obligation Met',
    message: 'Q3 Payment to Global Logistics has been successfully processed.',
    time: '5 hours ago',
    read: false,
    icon: <CheckCircle size={20} className="text-success" />
  },
  {
    id: 3,
    type: 'info',
    title: 'New Contract Added',
    message: 'A new NDA contract for Project X has been uploaded by Sarah.',
    time: 'Yesterday',
    read: true,
    icon: <FileText size={20} className="text-primary" />
  },
  {
    id: 4,
    type: 'warning',
    title: 'Pending Approval',
    message: 'Marketing Services Agreement requires your signature.',
    time: '2 days ago',
    read: true,
    icon: <Info size={20} className="text-warning" />
  },
  {
    id: 5,
    type: 'system',
    title: 'System Update',
    message: 'Scheduled maintenance on Saturday 2AM - 4AM EST.',
    time: '1 week ago',
    read: true,
    icon: <Bell size={20} className="text-muted" />
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'unread'

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
    <div className="notifications-page p-6 fade-in">
      <div className="notifications-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Notifications 
            {unreadCount > 0 && <span className="badge badge-primary">{unreadCount} New</span>}
          </h1>
          <p className="text-muted mt-1">Stay updated on your contracts and obligations.</p>
        </div>
        <div className="flex gap-4">
          {unreadCount > 0 && (
            <button className="btn btn-outline" onClick={markAllAsRead}>
              <Check size={16} /> Mark all as read
            </button>
          )}
        </div>
      </div>

      <div className="card notifications-card p-0">
        <div className="notifications-tabs flex border-b">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Notifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveTab('unread')}
          >
            Unread
          </button>
        </div>

        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state p-8 flex flex-col items-center justify-center text-center">
              <div className="empty-icon-wrapper mb-4">
                <Bell size={48} className="text-muted" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
              <p className="text-muted">You're all caught up! There are no new alerts to review.</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`notification-item flex items-start gap-4 p-4 ${!notif.read ? 'unread' : ''}`}
                onClick={() => markAsRead(notif.id)}
              >
                <div className={`notification-icon ${notif.type}`}>
                  {notif.icon}
                </div>
                
                <div className="notification-content flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="notification-title font-semibold mb-1">{notif.title}</h4>
                    <span className="notification-time text-xs text-muted flex items-center gap-1">
                      <Clock size={12} /> {notif.time}
                    </span>
                  </div>
                  <p className="notification-message text-sm text-muted mb-2">
                    {notif.message}
                  </p>
                  
                  <div className="notification-actions flex gap-2 opacity-0 transition-fast">
                    {!notif.read && (
                      <button 
                        className="action-btn text-primary text-xs flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notif.id);
                        }}
                      >
                        <Check size={14} /> Mark Read
                      </button>
                    )}
                    <button 
                      className="action-btn text-danger text-xs flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>

                {!notif.read && (
                  <div className="unread-indicator"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
