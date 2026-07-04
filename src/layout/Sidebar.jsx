import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Files, 
  CheckSquare, 
  CalendarClock, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Archive,
  BarChart3
} from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/contracts', label: 'Contracts', icon: <Files size={20} /> },
    { path: '/archived', label: 'Archived', icon: <Archive size={20} /> },
    { path: '/obligations', label: 'Obligations', icon: <CheckSquare size={20} /> },
    { path: '/renewals', label: 'Renewals', icon: <CalendarClock size={20} /> },
    { path: '/compliance', label: 'Compliance', icon: <ShieldCheck size={20} /> },
    { path: '/reports', label: 'Report Dashboard', icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <ShieldCheck className="sidebar-logo-icon" size={28} />
        <div className="sidebar-title">Contract<span>IQ</span></div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <nav className="sidebar-footer-nav">
          <NavLink to="/settings" className="nav-item" onClick={closeSidebar}>
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
          <NavLink to="/login" className="nav-item nav-item-danger" onClick={closeSidebar}>
            <LogOut size={20} />
            <span>Logout</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
