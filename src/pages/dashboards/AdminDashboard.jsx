import React, { useState } from 'react';
import { 
  Files, 
  AlertTriangle, 
  CalendarClock, 
  CheckCircle,
  TrendingUp,
  Activity,
  Plus,
  Search,
  FileSignature,
  FileWarning
} from 'lucide-react';
import ButtonGroup from '../../components/Buttons/ButtonGroup';
import Dropdown from '../../components/Buttons/Dropdown';
import Button from '../../components/Buttons/Button';
import Card from '../../components/DataDisplay/Card';
import Table from '../../components/DataDisplay/Table';
import Badge from '../../components/DataDisplay/Badge';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('30D');

  const stats = [
    { label: 'Active Contracts', value: '1,245', icon: <Files size={24} />, color: 'var(--color-primary)', trend: '+12.5%', trendType: 'positive', subtext: 'vs last month' },
    { label: 'Upcoming Renewals', value: '38', icon: <CalendarClock size={24} />, color: 'var(--color-warning)', trend: '4 critical', trendType: 'warning', subtext: 'needs attention' },
    { label: 'Pending Obligations', value: '112', icon: <AlertTriangle size={24} />, color: 'var(--color-danger)', trend: '-5.2%', trendType: 'positive', subtext: 'vs last month' },
    { label: 'Overall Compliant', value: '94%', icon: <CheckCircle size={24} />, color: 'var(--color-success)', trend: '+2.1%', trendType: 'positive', subtext: 'across portfolio' },
  ];

  // Dummy logic to simulate data changes
  const multiplyData = (dataArray, factor) => dataArray.map(d => Math.round(d * factor));
  const filterFactor = timeFilter === '7D' ? 0.3 : timeFilter === '1Y' ? 3 : 1;

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Contracts',
        data: multiplyData([65, 59, 80, 81, 56, 120], filterFactor),
        borderColor: '#6B8EB1',
        backgroundColor: 'rgba(107, 142, 177, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#6B8EB1',
        pointBorderWidth: 2,
        pointHoverRadius: 6
      }
    ]
  };

  const lineChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#444B53',
        bodyColor: '#444B53',
        borderColor: 'rgba(107, 142, 177, 0.2)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(68, 75, 83, 0.05)', borderDash: [5, 5] }, beginAtZero: true }
    }
  };

  const doughnutData = {
    labels: ['Compliant', 'Pending', 'Non-Compliant'],
    datasets: [
      {
        data: multiplyData([300, 50, 20], filterFactor),
        backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c'],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true, pointStyle: 'circle' } }
    }
  };

  const barChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Obligations Met',
        data: multiplyData([120, 190, 150, 220], filterFactor),
        backgroundColor: '#2ecc71',
        borderRadius: 4
      },
      {
        label: 'Obligations Missed',
        data: multiplyData([15, 25, 10, 30], filterFactor),
        backgroundColor: '#e74c3c',
        borderRadius: 4
      }
    ]
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle' } }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(68, 75, 83, 0.05)', borderDash: [5, 5] }, beginAtZero: true }
    }
  };

  const activities = [
    { id: 1, user: 'Sarah Smith', avatar: 'SS', action: 'Approved', target: 'Vendor Agreement V2', time: '2 hours ago', status: 'Completed', type: 'success' },
    { id: 2, user: 'John Doe', avatar: 'JD', action: 'Created', target: 'NDA - TechCorp', time: '4 hours ago', status: 'Pending', type: 'warning' },
    { id: 3, user: 'System', avatar: 'SY', action: 'Flagged', target: 'Missed Obligation #1042', time: '1 day ago', status: 'Critical', type: 'danger' },
    { id: 4, user: 'Alex Johnson', avatar: 'AJ', action: 'Renewed', target: 'Office Lease 2026', time: '2 days ago', status: 'Completed', type: 'success' },
  ];

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header mb-2 stagger-1">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted mt-1">Welcome back, here is what's happening with your contracts today.</p>
        </div>
        <div className="dashboard-header-actions">
          <ButtonGroup className="time-filters">
            <button className={`filter-btn ${timeFilter === '7D' ? 'active' : ''}`} onClick={() => setTimeFilter('7D')}>7D</button>
            <button className={`filter-btn ${timeFilter === '30D' ? 'active' : ''}`} onClick={() => setTimeFilter('30D')}>30D</button>
            <button className={`filter-btn ${timeFilter === '1Y' ? 'active' : ''}`} onClick={() => setTimeFilter('1Y')}>1Y</button>
          </ButtonGroup>
          <div className="header-buttons">
            <Button variant="outline" icon={TrendingUp}>
              Generate Report
            </Button>
            <Button variant="primary" icon={Plus}>
              New Contract
            </Button>
          </div>
        </div>
      </div>

      <div className="stats-grid stagger-1">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-card-header">
              <p className="stat-label">{stat.label}</p>
              <div className="stat-icon" style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
                {stat.icon}
              </div>
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <div className="stat-footer">
                <span className={`stat-trend ${stat.trendType}`}>{stat.trend}</span>
                <span className="stat-subtext">{stat.subtext}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-middle-grid stagger-2">
        <div className="dashboard-card main-chart-card">
          <div className="dashboard-card-header">
            <div>
              <h3>Contract Growth</h3>
              <p>Monthly contract additions and renewals</p>
            </div>
          </div>
          <div className="chart-wrapper">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="dashboard-card quick-actions-card glow-card">
            <div className="dashboard-card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions-grid">
              <button className="quick-action-btn">
                <div className="qa-icon" style={{ color: 'var(--color-primary)', backgroundColor: 'rgba(107, 142, 177, 0.15)' }}><Plus size={20}/></div>
                <span>Create NDA</span>
              </button>
              <button className="quick-action-btn">
                <div className="qa-icon" style={{ color: 'var(--color-warning)', backgroundColor: 'rgba(241, 196, 15, 0.15)' }}><Search size={20}/></div>
                <span>Search Contracts</span>
              </button>
              <button className="quick-action-btn">
                <div className="qa-icon" style={{ color: 'var(--color-success)', backgroundColor: 'rgba(46, 204, 113, 0.15)' }}><FileSignature size={20}/></div>
                <span>Review Approvals</span>
              </button>
              <button className="quick-action-btn">
                <div className="qa-icon" style={{ color: 'var(--color-danger)', backgroundColor: 'rgba(231, 76, 60, 0.15)' }}><FileWarning size={20}/></div>
                <span>Check Obligations</span>
              </button>
            </div>
          </div>
          
          <div className="dashboard-card flex-1">
            <div className="dashboard-card-header">
              <h3>Compliance Status</h3>
            </div>
            <div className="chart-wrapper doughnut-wrapper">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-middle-grid stagger-3">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h3>Obligations Performance</h3>
              <p>Met vs Missed obligations over time</p>
            </div>
          </div>
          <div className="chart-wrapper">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        
        <div className="dashboard-card activity-dashboard-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="dashboard-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-primary" />
              <h3 style={{ margin: 0 }}>Recent Activities</h3>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="activity-table-wrapper" style={{ flex: 1 }}>
            <table className="activity-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act) => (
                  <tr key={act.id}>
                    <td>
                      <div className="table-user">
                        <div className="table-avatar">{act.avatar}</div>
                        <div>
                          <p className="font-semibold" style={{ marginBottom: 0 }}>{act.user}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p style={{ margin: 0, fontSize: '0.95rem' }}>
                        {act.action} <span className="font-semibold">{act.target}</span>
                      </p>
                    </td>
                    <td>
                      <Badge variant={act.type}>{act.status}</Badge>
                    </td>
                    <td className="text-muted text-sm">{act.time}</td>
                    <td>
                      <Dropdown 
                        label="Manage" 
                        items={[
                          { label: 'View User' },
                          { label: 'Audit Trail' }
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
