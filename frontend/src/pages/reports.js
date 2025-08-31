import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Bar, Line, Pie
} from 'react-chartjs-2';
import Navbar from '../components/navbar'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
);

export default function Reports() {
  const [timeframe, setTimeframe] = useState('Monthly');
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Dummy KPI metrics
  const kpis = [
    { title: "Employee Satisfaction", value: 92, delta: "+5%", description: "Compared to last quarter", color: "#10b981" },
    { title: "Avg. Tenure (years)", value: 3.4, delta: "+0.2y", description: "Improved retention", color: "#3b82f6" },
    { title: "Cost per Hire ($)", value: 4500, delta: "-200", description: "Savings from optimized hiring", color: "#f59e0b" },
    { title: "Turnover Rate (%)", value: 8, delta: "-1%", description: "Reduced turnover", color: "#ef4444" },
  ];

  // Chart data placeholders per timeframe
  const attendanceData = {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [{
      label: 'Attendance %',
      data:
        timeframe === 'Weekly' ? [95, 93, 97, 90, 98, 70, 65] :
        timeframe === 'Monthly' ? [93, 96, 94, 95, 97, 75, 70] :
        [94, 95, 96, 97, 98, 80, 78],
      backgroundColor: '#3b82f6',
      borderRadius: 6,
    }]
  };

  const performanceData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Avg Performance Score',
      data:
        timeframe === 'Weekly' ? [79, 81, 75, 78] :
        timeframe === 'Monthly' ? [78, 82, 85, 88] :
        [80, 83, 86, 89],
      borderColor: '#10b981',
      fill: false,
      tension: 0.3,
      pointRadius: 6,
      pointHoverRadius: 8,
    }]
  };

  const payrollData = {
    labels: ['Jan','Feb','Mar','Apr','May'],
    datasets: [{
      label: 'Payroll Spending',
      data:
        timeframe === 'Weekly' ? [28000, 27000, 29000, 30000, 28000] :
        timeframe === 'Monthly' ? [120000, 125000, 123500, 130000, 128000] :
        [130000, 135000, 132000, 138000, 137000],
      backgroundColor: '#f59e0b',
      borderRadius: 6,
    }]
  };

  const deptDistData = {
    labels: ['Engineering', 'Design', 'HR', 'Sales', 'Support'],
    datasets: [{
      data: [40, 15, 10, 20, 15],
      backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#6366f1'],
      hoverOffset: 30,
    }]
  };

  // Attendance heatmap data (mocked presence/absence on calendar)
  const attendancePresenceDates = [
    new Date(2025, 8, 1),
    new Date(2025, 8, 2),
    new Date(2025, 8, 4),
    new Date(2025, 8, 5),
    new Date(2025, 8, 6),
    new Date(2025, 8, 7),
    new Date(2025, 8, 9),
  ];

  // Calendar tile content for attendance presence
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const present = attendancePresenceDates.some(d => d.toDateString() === date.toDateString());
      return present ? (<span style={{
        display:'block',
        marginTop:4,
        width:8,
        height:8,
        borderRadius:'50%',
        backgroundColor:'#10b981'
      }}/>) : null;
    }
    return null;
  };

  return (
    <div style={styles.container}>
      <>    <Navbar /></>
      <h1 style={styles.title}>Reports & Insights</h1>

      {/* Timeframe Selector */}
      <div style={styles.timeframeSelector}>
        {['Weekly', 'Monthly', 'Quarterly'].map(tf => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            style={timeframe === tf ? styles.activeTimeframe : styles.timeframeBtn}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div style={styles.kpiGrid}>
        {kpis.map(({title, value, delta, description, color}) => (
          <div key={title} style={styles.kpiCard}>
            <div style={{...styles.kpiValue, color}}>{value}{title.includes('Cost') ? '$' : ''}</div>
            <div style={styles.kpiTitle}>{title}</div>
            <div style={{color, fontWeight:'600'}}>{delta}</div>
            <small style={styles.kpiDesc}>{description}</small>
          </div>
        ))}
      </div>

      {/* Grid of Charts and Calendar */}
      <div style={styles.grid}>
        <div style={styles.chartFullWidth}>
          <h3 style={styles.chartTitle}>Attendance Trend</h3>
          <Bar data={attendanceData} options={{...chartOptions, maintainAspectRatio: false }} height={200} />
        </div>

        <div style={styles.chartHalf}>
          <h3 style={styles.chartTitle}>Performance Trend</h3>
          <Line data={performanceData} options={{...chartOptions, maintainAspectRatio: false}} height={200} />
        </div>

        <div style={styles.chartHalf}>
          <h3 style={styles.chartTitle}>Payroll Spend</h3>
          <Bar data={payrollData} options={{...chartOptions, maintainAspectRatio: false}} height={200} />
        </div>

        <div style={styles.chartFullWidth}>
          <h3 style={styles.chartTitle}>Department Distribution</h3>
          <Pie data={deptDistData} options={{plugins:{legend:{position:'right'}}}} height={250} />
        </div>

        <div style={styles.calendarSection}>
          <h3 style={styles.chartTitle}>Attendance Calendar</h3>
          <Calendar
            value={calendarDate}
            onChange={setCalendarDate}
            tileContent={tileContent}
          />
        </div>
      </div>

      {/* Export Buttons (placeholders) */}
      <div style={styles.exportButtons}>
        <button style={styles.exportBtn} onClick={() => alert('Exporting PDF...')}>Export PDF</button>
        <button style={styles.exportBtn} onClick={() => alert('Exporting CSV...')}>Export CSV</button>
      </div>
    </div>
  );
}

const chartOptions = {
  plugins: {
    tooltip: { enabled: true },
    legend: { display: true, position: 'bottom' },
    title: { display: false }
  },
  scales: {
    y: { beginAtZero: true }
  }
};

const styles = {
  container: {
    maxWidth: 960,
    margin: 'auto',
    padding: 24,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1e293b',
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 20,
    textAlign: 'center',
  },
  timeframeSelector: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  timeframeBtn: {
    backgroundColor: '#f3f4f6',
    border: 'none',
    padding: '8px 20px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    color: '#64748b',
  },
  activeTimeframe: {
    backgroundColor: '#3b82f6',
    border: 'none',
    padding: '8px 20px',
    borderRadius: 8,
    cursor: 'pointer',
    color: 'white',
    fontWeight: 700,
    fontSize: 14,
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 20,
    marginBottom: 36,
  },
  kpiCard: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 6,
  },
  kpiTitle: {
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 4,
  },
  kpiDesc: {
    color: '#6b7280',
    fontSize: 12,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 32,
    marginBottom: 40,
  },
  chartFullWidth: {
    gridColumn: '1 / -1',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
    height: 280,
  },
  chartHalf: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
    height: 280,
  },
  chartTitle: {
    marginBottom: 12,
    fontWeight: 700,
    fontSize: 18,
    color: '#334155',
  },
  calendarSection: {
    gridColumn: '1 / -1',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
  },
  exportButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
  },
  exportBtn: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
  },
};
