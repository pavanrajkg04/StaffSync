import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Navbar from '../components/navbar'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Payroll() {
  const [payrollRuns, setPayrollRuns] = useState([]);
  const [summary, setSummary] = useState({
    currentTotal: 125000,
    avgSalary: 6500,
    pendingApprovals: 3,
    budgetUsedPercent: 75,
  });

  useEffect(() => {
    // Dummy payroll runs data
    setPayrollRuns([
      { id: '1', date: '2025-08-31', status: 'Completed', total: 125000 },
      { id: '2', date: '2025-07-31', status: 'Completed', total: 120000 },
      { id: '3', date: '2025-06-30', status: 'Completed', total: 118500 },
      { id: '4', date: '2025-05-31', status: 'Pending', total: 0 },
    ]);
  }, []);

  const chartData = {
    labels: payrollRuns.map(run => new Date(run.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })),
    datasets: [
      {
        label: 'Payroll Spend',
        data: payrollRuns.map(run => run.total),
        backgroundColor: '#f59e0b',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' }, title: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div style={styles.container}>
      <>    <Navbar /></>
      <header style={styles.header}>
        <h1 style={styles.title}>Payroll Dashboard</h1>
        <button style={styles.runButton}>Run Payroll</button>
      </header>

      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3 style={styles.statValue}>${summary.currentTotal.toLocaleString()}</h3>
          <p>Current Payroll Run Total</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statValue}>${summary.avgSalary.toLocaleString()}</h3>
          <p>Average Salary</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statValue}>{summary.pendingApprovals}</h3>
          <p>Pending Approvals</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Budget Utilization</p>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${summary.budgetUsedPercent}%`}}/>
          </div>
          <small>{summary.budgetUsedPercent}% used</small>
        </div>
      </section>

      <section style={styles.chartSection}>
        <h2 style={styles.chartTitle}>Monthly Payroll Spending</h2>
        <div style={styles.chartContainer}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </section>

      <section style={styles.runsSection}>
        <h2>Recent Payroll Runs</h2>
        <ul style={styles.runsList}>
          {payrollRuns.map(run => (
            <li key={run.id} style={styles.runItem}>
              <div>
                <strong>{new Date(run.date).toLocaleDateString()}</strong> - <em>{run.status}</em>
              </div>
              <div>
                <span>${run.total.toLocaleString()}</span>
                <button style={{...styles.actionButton, backgroundColor: '#3b82f6'}}>View</button>
                {run.status === 'Completed' ? (
                  <button style={{...styles.actionButton, backgroundColor: '#10b981'}}>Download</button>
                ) : (
                  <button disabled style={{...styles.actionButton, backgroundColor: '#9ca3af', cursor: 'not-allowed'}}>Download</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: '2rem auto',
    padding: '0 1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1e293b',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  runButton: {
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '10px 24px',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: '600',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
    gap: 24,
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  statLabel: {
    fontWeight: '500',
    marginBottom: 4,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
  },
  chartSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
    marginBottom: 40,
  },
  chartTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 20,
    color: '#334155',
  },
  chartContainer: {
    height: 300,
  },
  runsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
  },
  runsList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  runItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e5e7eb',
    padding: '12px 0',
  },
  actionButton: {
    border: 'none',
    borderRadius: 6,
    color: 'white',
    padding: '6px 14px',
    marginLeft: 8,
    cursor: 'pointer',
    fontWeight: '600',
  },
};
