import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar, 
  PieChart as PieChartIcon, 
  TrendingUp,
  FileText
} from 'lucide-react';
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
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import './Reports.css'; // Import the new premium design CSS

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
  ArcElement,
  Filler
);

const Reports = () => {
  const [reportType, setReportType] = useState('compliance');
  const [dateRange, setDateRange] = useState('YTD');

  const complianceTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Compliance Score (%)',
        data: [82, 85, 84, 88, 89, 92, 91, 94, 95, 96, 94, 97],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2ecc71',
        pointBorderWidth: 2,
        pointHoverRadius: 6
      },
      {
        label: 'Industry Average',
        data: [75, 76, 75, 78, 79, 80, 81, 82, 83, 83, 84, 85],
        borderColor: '#95a5a6',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 0
      }
    ]
  };

  const lineChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8 } },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#444B53',
        bodyColor: '#444B53',
        borderColor: 'rgba(46, 204, 113, 0.2)',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(68, 75, 83, 0.05)', borderDash: [5, 5] }, min: 50, max: 100 }
    }
  };

  const departmentData = {
    labels: ['IT', 'HR', 'Sales', 'Legal', 'Marketing', 'Operations'],
    datasets: [
      {
        label: 'Active Contracts',
        data: [145, 82, 310, 45, 112, 203],
        backgroundColor: '#6B8EB1',
        borderRadius: 4
      },
      {
        label: 'Value ($M)',
        data: [12.5, 2.1, 45.3, 8.5, 6.2, 22.4],
        backgroundColor: '#f39c12',
        borderRadius: 4
      }
    ]
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8 } }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(68, 75, 83, 0.05)', borderDash: [5, 5] }, beginAtZero: true }
    }
  };

  const riskData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
    datasets: [
      {
        data: [650, 220, 85, 12],
        backgroundColor: ['#2ecc71', '#f1c40f', '#e67e22', '#e74c3c'],
        borderWidth: 0,
        hoverOffset: 6
      }
    ]
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const doughnutOptions = {
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { position: isMobile ? 'bottom' : 'right', labels: { padding: 20, usePointStyle: true, pointStyle: 'circle' } }
    }
  };

  return (
    <div className="reports-container">
      {/* Glassmorphic Header */}
      <div className="reports-header-glass animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ marginBottom: 0 }}>
            <BarChart3 size={28} className="text-primary" />
            Report Dashboard
          </h1>
          <p className="text-muted mt-1" style={{ fontSize: '0.95rem' }}>Generate, view, and export comprehensive contract insights.</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="time-filters" style={{ background: 'var(--color-bg)' }}>
            <button className={`filter-btn ${dateRange === 'Q1' ? 'active' : ''}`} onClick={() => setDateRange('Q1')}>Q1</button>
            <button className={`filter-btn ${dateRange === 'Q2' ? 'active' : ''}`} onClick={() => setDateRange('Q2')}>Q2</button>
            <button className={`filter-btn ${dateRange === 'YTD' ? 'active' : ''}`} onClick={() => setDateRange('YTD')}>YTD</button>
          </div>
          <button className="btn btn-outline flex items-center gap-2" style={{ background: '#fff' }}>
            <Filter size={18} /> Filters
          </button>
          <button className="btn btn-primary flex items-center gap-2" style={{ boxShadow: '0 4px 12px rgba(107, 142, 177, 0.3)' }}>
            <Download size={18} /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="reports-kpi-grid animate-fade-in-up delay-100">
        <div className="kpi-card-premium">
          <div className="kpi-icon-wrapper" style={{ color: 'var(--color-primary)' }}>
            <FileText size={24} />
          </div>
          <div className="kpi-content">
            <p>Total Contract Value</p>
            <h3>$124.5M</h3>
            <span className="text-xs text-success flex items-center gap-1 font-semibold">
              <TrendingUp size={14} /> +12% from last year
            </span>
          </div>
        </div>
        <div className="kpi-card-premium">
          <div className="kpi-icon-wrapper" style={{ color: 'var(--color-success)', background: 'rgba(46, 204, 113, 0.1)' }}>
            <PieChartIcon size={24} />
          </div>
          <div className="kpi-content">
            <p>Avg Execution Time</p>
            <h3>14 Days</h3>
            <span className="text-xs text-success flex items-center gap-1 font-semibold">
              <TrendingUp size={14} /> -2 days improvement
            </span>
          </div>
        </div>
        <div className="kpi-card-premium">
          <div className="kpi-icon-wrapper" style={{ color: 'var(--color-warning)', background: 'rgba(241, 196, 15, 0.1)' }}>
            <Calendar size={24} />
          </div>
          <div className="kpi-content">
            <p>Upcoming Renewals (Q3)</p>
            <h3>84</h3>
            <span className="text-xs text-muted font-semibold flex items-center gap-1">
              Value: $18.2M
            </span>
          </div>
        </div>
        <div className="kpi-card-premium">
          <div className="kpi-icon-wrapper" style={{ color: 'var(--color-danger)', background: 'rgba(231, 76, 60, 0.1)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="kpi-content">
            <p>Obligation Risk Index</p>
            <h3>Low (1.2)</h3>
            <span className="text-xs text-success flex items-center gap-1 font-semibold">
              <TrendingUp size={14} /> Stable trend
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="reports-charts-grid animate-fade-in-up delay-200">
        <div className="chart-card-premium">
          <div className="chart-header-premium">
            <div>
              <h3>Compliance Trend</h3>
              <p>Organization-wide compliance score vs industry benchmark</p>
            </div>
            <select 
              className="premium-select"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="compliance">Compliance</option>
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
            </select>
          </div>
          <div className="chart-wrapper report-chart-lg">
            <Line data={complianceTrendData} options={lineChartOptions} />
          </div>
        </div>

        <div className="chart-card-premium">
          <div className="chart-header-premium">
            <h3>Risk Distribution</h3>
          </div>
          <div className="chart-wrapper report-chart-lg flex items-center justify-center">
            <Doughnut data={riskData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      <div className="chart-card-premium full-width-chart animate-fade-in-up delay-300">
        <div className="chart-header-premium">
          <div>
            <h3>Department Breakdown</h3>
            <p>Contract volume and value across departments</p>
          </div>
        </div>
        <div className="chart-wrapper report-chart-xl">
          <Bar data={departmentData} options={barChartOptions} />
        </div>
      </div>

    </div>
  );
};

export default Reports;
