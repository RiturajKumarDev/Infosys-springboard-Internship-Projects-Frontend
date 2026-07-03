import { Link } from 'react-router-dom';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-search">
        <Search size={16} className="text-muted" />
        <input type="text" placeholder="Search contracts, obligations..." />
      </div>

      <div className="header-actions">
        <Link to="/notifications" className="notification-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </Link>

        <div className="header-divider"></div>

        <div className="user-profile">
          <div className="avatar">JD</div>
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <span className="user-role">Legal Manager</span>
          </div>
          <ChevronDown size={14} className="text-muted" />
        </div>
      </div>
    </header>
  );
};

export default Header;
