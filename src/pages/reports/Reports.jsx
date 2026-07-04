import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar, 
  PieChart as PieChartIcon, 
  TrendingUp,
  FileText,
  Activity,
  ArrowUpRight,
  ArrowDownRight
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
import Button from '../../components/Buttons/Button';
import './Reports.css';

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
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderWidth: 2,
        pointHoverRadius: 6
      },
      {
        label: 'Industry Average',
        data: [75, 76, 75, 78, 79, 80, 81, 82, 83, 83, 84, 85],
        borderColor: '#9ca3af',
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
      legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8, font: { family: 'inherit', weight: 500 } } },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        usePointStyle: true,
        cornerRadius: 8
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'inherit' } } },
      y: { grid: { color: 'rgba(0, 0, 0, 0.05)', borderDash: [5, 5] }, min: 50, max: 100, ticks: { font: { family: 'inherit' } } }
    }
  };

  const departmentData = {
    labels: ['IT', 'HR', 'Sales', 'Legal', 'Marketing', 'Operations'],
    datasets: [
      {
        label: 'Active Contracts',
        data: [145, 82, 310, 45, 112, 203],
        backgroundColor: '#6366f1',
        borderRadius: 6
      },
      {
        label: 'Value ($M)',
        data: [12.5, 2.1, 45.3, 8.5, 6.2, 22.4],
        backgroundColor: '#10b981',
        borderRadius: 6
      }
    ]
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8, font: { family: 'inherit', weight: 500 } } }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'inherit' } } },
      y: { grid: { color: 'rgba(0, 0, 0, 0.05)', borderDash: [5, 5] }, beginAtZero: true, ticks: { font: { family: 'inherit' } } }
    }
  };

  const riskData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
    datasets: [
      {
        data: [650, 220, 85, 12],
        backgroundColor: ['#10b981', '#f59e0b', '#f97316', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 8
      }
    ]
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { position: 'right', labels: { padding: 20, usePointStyle: true, pointStyle: 'circle', font: { family: 'inherit', size: 13 } } }
    }
  };

  return (
    <div className="reports-dashboard fade-in">
      {/* Header Section */}
      <div className="rep-header-section">
        <div className="rep-header-content">
          <h1 className="rep-title">Intelligence & Analytics</h1>
          <p className="rep-subtitle">Comprehensive insights across your entire contract portfolio.</p>
        </div>
        <div className="rep-header-actions">
          <div className="rep-time-filters">
            {['Q1', 'Q2', 'Q3', 'YTD'].map(range => (
              <button 
                key={range}
                className={`rep-time-btn ${dateRange === range ? 'active' : ''}`} 
                onClick={() => setDateRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="primary" icon={Download}>Export Report</Button>
        </div>
      </div>

      {/* Premium Analytics Cards */}
      <div className="rep-analytics-grid">
        <div className="rep-card glass-blue">
          <div className="rep-card-top">
            <div className="rep-card-icon"><FileText size={24} /></div>
            <span className="rep-trend positive"><ArrowUpRight size={14} /> 12%</span>
          </div>
          <div className="rep-card-data">
            <h3>Total Contract Value</h3>
            <div className="rep-val">$124.5M</div>
            <p>Active portfolio value</p>
          </div>
        </div>

        <div className="rep-card glass-green">
          <div className="rep-card-top">
            <div className="rep-card-icon"><Activity size={24} /></div>
            <span className="rep-trend positive"><ArrowDownRight size={14} /> 2 days</span>
          </div>
          <div className="rep-card-data">
            <h3>Avg Execution Time</h3>
            <div className="rep-val">14 Days</div>
            <p>Cycle time improved</p>
          </div>
        </div>

        <div className="rep-card glass-orange">
          <div className="rep-card-top">
            <div className="rep-card-icon"><Calendar size={24} /></div>
            <span className="rep-trend neutral">Steady</span>
          </div>
          <div className="rep-card-data">
            <h3>Upcoming Renewals</h3>
            <div className="rep-val">84</div>
            <p>Next 90 days ($18.2M at risk)</p>
          </div>
        </div>

        <div className="rep-card glass-purple">
          <div className="rep-card-top">
            <div className="rep-card-icon"><TrendingUp size={24} /></div>
            <span className="rep-trend positive"><ArrowUpRight size={14} /> 4.2%</span>
          </div>
          <div className="rep-card-data">
            <h3>Obligation Compliance</h3>
            <div className="rep-val">97%</div>
            <p>Overall organizational score</p>
          </div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="rep-charts-grid">
        <div className="rep-chart-card animate-slide-up">
          <div className="rep-chart-header">
            <div className="rep-chart-title">
              <h3>Portfolio Performance</h3>
              <p>Organizational metrics vs industry benchmark</p>
            </div>
            <select 
              className="rep-chart-select"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="compliance">Compliance Trend</option>
              <option value="financial">Financial Impact</option>
              <option value="operational">Operational Efficiency</option>
            </select>
          </div>
          <div className="rep-chart-canvas">
            <Line data={complianceTrendData} options={lineChartOptions} />
          </div>
        </div>

        <div className="rep-chart-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="rep-chart-header">
            <div className="rep-chart-title">
              <h3>Risk Distribution</h3>
              <p>Current portfolio risk assessment</p>
            </div>
          </div>
          <div className="rep-chart-canvas flex-center">
            <Doughnut data={riskData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      <div className="rep-chart-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="rep-chart-header">
          <div className="rep-chart-title">
            <h3>Department Breakdown</h3>
            <p>Contract volume and value distributed across business units</p>
          </div>
          <Button variant="outline" icon={Filter}>More Filters</Button>
        </div>
        <div className="rep-chart-canvas lg">
          <Bar data={departmentData} options={barChartOptions} />
        </div>
      </div>

    </div>
  );
};

export default Reports;
