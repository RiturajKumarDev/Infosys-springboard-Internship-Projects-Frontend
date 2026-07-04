import React, { useState } from 'react';
import { 
  CalendarClock, Search, Filter, AlertTriangle, 
  RefreshCw, CheckCircle, Clock, DollarSign,
  ChevronRight, CalendarDays, ArrowRight
} from 'lucide-react';
import FormInput from '../../components/Form/FormInput';
import Button from '../../components/Buttons/Button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../contracts/Contracts.css';
import './Renewals.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Renewals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('expiryDate');

  const renewalsData = [
    { id: 'REN-001', contractId: 'CON-2023-089', entity: 'Adobe Systems', type: 'Software License', expiryDate: '2023-10-15', daysLeft: 12, value: '$12,000', status: 'Action Required', autoRenew: false },
    { id: 'REN-002', contractId: 'CON-2023-045', entity: 'Downtown Plaza', type: 'Office Lease', expiryDate: '2023-11-30', daysLeft: 58, value: '$50,000/yr', status: 'Negotiating', autoRenew: false },
    { id: 'REN-003', contractId: 'CON-2023-001', entity: 'TechCorp', type: 'Vendor Agreement', expiryDate: '2023-12-31', daysLeft: 89, value: '$120,000', status: 'Auto-Renewing', autoRenew: true },
    { id: 'REN-004', contractId: 'CON-2022-404', entity: 'GlobalTech', type: 'Partnership', expiryDate: '2023-10-05', daysLeft: 2, value: '$250,000', status: 'Critical', autoRenew: false },
    { id: 'REN-005', contractId: 'CON-2023-112', entity: 'HostProvider', type: 'Cloud Services', expiryDate: '2024-03-15', daysLeft: 164, value: '$45,000', status: 'On Track', autoRenew: true },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'On Track': return <span className="rnw-status-pill rnw-success"><CheckCircle size={14} /> {status}</span>;
      case 'Critical': return <span className="rnw-status-pill rnw-danger"><AlertTriangle size={14} /> {status}</span>;
      case 'Action Required': return <span className="rnw-status-pill rnw-warning"><Clock size={14} /> Action Needed</span>;
      case 'Auto-Renewing': return <span className="rnw-status-pill rnw-info"><RefreshCw size={14} /> {status}</span>;
      case 'Negotiating': return <span className="rnw-status-pill rnw-primary"><DollarSign size={14} /> {status}</span>;
      default: return <span className="rnw-status-pill">{status}</span>;
    }
  };

  const getDaysLeftVisual = (days) => {
    let colorClass = 'bg-success';
    let urgencyText = 'Safe';
    if (days <= 30) { colorClass = 'bg-danger'; urgencyText = 'Urgent'; }
    else if (days <= 90) { colorClass = 'bg-warning'; urgencyText = 'Upcoming'; }

    const maxDays = 365;
    const widthPercentage = Math.min(100, Math.max(5, (days / maxDays) * 100));

    return (
      <div className="days-visual-container">
        <div className="days-header">
          <span className="days-count">{days} days</span>
          <span className={`days-urgency text-${colorClass.split('-')[1]}`}>{urgencyText}</span>
        </div>
        <div className="days-track">
          <div className={`days-fill ${colorClass}`} style={{ width: `${widthPercentage}%` }}></div>
        </div>
      </div>
    );
  };

  let filteredItems = renewalsData.filter(item => {
    const matchesSearch = item.entity.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.contractId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'Critical') return matchesSearch && item.daysLeft <= 30;
    if (activeFilter === 'Upcoming 90 Days') return matchesSearch && item.daysLeft <= 90 && item.daysLeft > 30;
    if (activeFilter === 'Auto-Renew') return matchesSearch && item.autoRenew;
    
    return matchesSearch;
  });

  // Apply sorting
  filteredItems.sort((a, b) => {
    if (sortBy === 'expiryDate') {
      return a.daysLeft - b.daysLeft;
    } else if (sortBy === 'value') {
      // Parse string values like '$120,000' or '$50,000/yr' to numbers for sorting
      const valA = parseFloat(a.value.replace(/[^0-9.]/g, ''));
      const valB = parseFloat(b.value.replace(/[^0-9.]/g, ''));
      return valB - valA; // Descending value
    }
    return 0;
  });

  const chartData = {
    labels: ['Critical (< 30 days)', 'Upcoming (30-90 days)', 'On Track (> 90 days)', 'Auto-Renewing'],
    datasets: [
      {
        data: [2, 1, 1, 2], // Derived from the mock data
        backgroundColor: [
          '#ef4444', // Danger/Critical
          '#f59e0b', // Warning/Upcoming
          '#10b981', // Success/On Track
          '#3b82f6', // Info/Auto-Renewing
        ],
        borderWidth: 0,
        hoverOffset: 8
      }
    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { family: 'inherit', size: 13 }
        }
      }
    }
  };

  return (
    <div className="renewals-dashboard fade-in">
      <div className="rnw-header-section">
        <div className="rnw-header-content">
          <h1 className="rnw-title">Renewal Command Center</h1>
          <p className="rnw-subtitle">Proactively manage upcoming contract expirations and negotiate better terms.</p>
        </div>
        <div className="rnw-header-actions">
          <Button variant="outline" icon={CalendarDays}>View Calendar</Button>
          <Button variant="primary" icon={ArrowRight}>Bulk Action</Button>
        </div>
      </div>

      <div className="rnw-summary-cards">
        <div className="rnw-card glass-orange">
          <div className="rnw-card-icon"><AlertTriangle size={24} /></div>
          <div className="rnw-card-data">
            <h3>Needs Attention</h3>
            <div className="rnw-val">2</div>
            <p>Expiring in next 30 days</p>
          </div>
        </div>
        
        <div className="rnw-card glass-blue">
          <div className="rnw-card-icon"><RefreshCw size={24} /></div>
          <div className="rnw-card-data">
            <h3>Auto-Renewing</h3>
            <div className="rnw-val">14</div>
            <p>Next 90 days</p>
          </div>
        </div>

        <div className="rnw-card glass-green">
          <div className="rnw-card-icon"><DollarSign size={24} /></div>
          <div className="rnw-card-data">
            <h3>Value at Risk</h3>
            <div className="rnw-val">$312k</div>
            <p>From upcoming expirations</p>
          </div>
        </div>
      </div>

      <div className="rnw-chart-section animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <div className="rnw-chart-card">
          <div className="rnw-chart-header">
            <h3>Renewal Status Overview</h3>
            <p className="text-muted" style={{fontSize: '0.85rem', marginTop: '0.2rem'}}>Distribution of upcoming expirations</p>
          </div>
          <div className="rnw-chart-container" style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="rnw-main-area animate-slide-up" style={{ animationDelay: '0.1s' }}>
        
        <div className="rnw-filter-tabs">
          {['All', 'Critical', 'Upcoming 90 Days', 'Auto-Renew'].map(tab => (
            <button 
              key={tab} 
              className={`rnw-filter-btn ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="rnw-table-wrapper">
          <div className="rnw-toolbar">
            <div className="rnw-search">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search by entity or contract ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <select 
              className="rnw-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="expiryDate">Sort by: Expiry Date</option>
              <option value="value">Sort by: Value</option>
            </select>
          </div>

          <table className="rnw-data-table">
            <thead>
              <tr>
                <th>Contract Details</th>
                <th>Timeline</th>
                <th>Renewal Value</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id} className="rnw-table-row" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td>
                    <div className="rnw-entity">{item.entity}</div>
                    <div className="rnw-meta">{item.type} • ID: {item.contractId}</div>
                  </td>
                  <td style={{ width: '250px' }}>
                    {getDaysLeftVisual(item.daysLeft)}
                    <div className="rnw-meta mt-1">Exp: {item.expiryDate}</div>
                  </td>
                  <td>
                    <div className="rnw-value-text">{item.value}</div>
                    {item.autoRenew && <span className="rnw-micro-badge"><RefreshCw size={10} /> Auto</span>}
                  </td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td className="rnw-action-cell">
                    <button className="rnw-action-btn">Review <ChevronRight size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredItems.length === 0 && (
            <div className="rnw-empty-state">
              <p>No renewals match your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Renewals;
