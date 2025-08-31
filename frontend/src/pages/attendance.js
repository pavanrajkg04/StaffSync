import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Bar } from 'react-chartjs-2';
import Navbar from '../components/navbar'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function Attendance() {
  // Attendance & Leaves dummy data
  const [attendanceRecords, setAttendanceRecords] = useState([
    { date: new Date(2025, 7, 25), status: 'in', clockIn: '09:05', clockOut: '17:15' },
    { date: new Date(2025, 7, 26), status: 'in', clockIn: '08:55', clockOut: '17:00' },
    { date: new Date(2025, 7, 27), status: 'out' }, // Absent
    { date: new Date(2025, 7, 28), status: 'in', clockIn: '09:10', clockOut: '17:20' },
    { date: new Date(2025, 7, 29), status: 'in', clockIn: '09:00', clockOut: '16:45' },
  ]);
  const [leaveRecords, setLeaveRecords] = useState([
    { type: 'Vacation', start: '2025-07-15', end: '2025-07-20', status: 'Approved' },
    { type: 'Sick', start: '2025-08-05', end: '2025-08-06', status: 'Approved' },
  ]);

  const [leaveBalance, setLeaveBalance] = useState({
    vacation: { allocated: 15, used: 5 },
    sick: { allocated: 10, used: 4 },
    personal: { allocated: 5, used: 1 },
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Calculate attendance rates, hours worked, etc.
  const totalDays = attendanceRecords.length;
  const attendedDays = attendanceRecords.filter(r => r.status === 'in').length;
  const attendancePercent = ((attendedDays / totalDays) * 100).toFixed(0);

  // Find records for selected date
  const selectedRecord = attendanceRecords.find(r => r.date.toDateString() === selectedDate.toDateString()) || {};

  // Chart data for attendance trend (past 5 days)
  const chartData = {
    labels: attendanceRecords.map(r => r.date.toLocaleDateString()),
    datasets: [{
      label: 'Attendance',
      data: attendanceRecords.map(r => r.status === 'in' ? 1 : 0),
      backgroundColor: attendanceRecords.map(r => r.status === 'in' ? '#10b981' : '#ef4444'),
    }]
  };
  const chartOptions = { scales: { y: { min: 0, max: 1, ticks: { stepSize: 1, display: false } } }, plugins: { legend: { display: false } }, maintainAspectRatio: false };

  // Helper to format clock times and duration
  function getDuration(inT, outT) {
    if (!inT || !outT) return '--';
    const [inH,inM] = inT.split(':').map(Number);
    const [outH,outM] = outT.split(':').map(Number);
    let mins = (outH*60+outM) - (inH*60+inM);
    if (mins < 0) mins = 0;
    return `${Math.floor(mins/60)}h ${mins%60}m`;
  }

  // Render calendar tile content with colored dots indicating status
  function tileContent({ date, view }) {
    if (view === 'month') {
      const record = attendanceRecords.find(r => r.date.toDateString() === date.toDateString());
      if (record) {
        return (
          <span
            style={{
              display: 'block',
              marginTop: 4,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: record.status === 'in' ? '#10b981' : '#ef4444'
            }}
          />
        );
      }
    }
    return null;
  }

  return (
    <div style={styles.container}>
      <>    <Navbar /></>
      <h1 style={styles.pageTitle}>Attendance Dashboard</h1>

      {/* Summary Cards */}
      <div style={styles.cardsContainer}>
        <div style={{ ...styles.card, borderLeftColor: '#10b981' }}>
          <h3 style={styles.cardTitle}>Attendance Rate</h3>
          <p style={styles.cardValue}>{attendancePercent}%</p>
          <small>{attendedDays} / {totalDays} days present</small>
        </div>

        <div style={{ ...styles.card, borderLeftColor: '#3b82f6' }}>
          <h3 style={styles.cardTitle}>Selected Day Status</h3>
          <p style={{ ...styles.cardValue, color: selectedRecord.status === 'in' ? '#10b981' : '#ef4444' }}>
            {selectedRecord.status ? selectedRecord.status.toUpperCase() : 'No Data'}
          </p>
          <small>
            In: {selectedRecord.clockIn || '--'} | Out: {selectedRecord.clockOut || '--'} | Duration: {getDuration(selectedRecord.clockIn, selectedRecord.clockOut)}
          </small>
        </div>

        <div style={{ ...styles.card, borderLeftColor: '#f59e0b' }}>
          <h3 style={styles.cardTitle}>Leave Balance</h3>
          {Object.entries(leaveBalance).map(([type, { allocated, used }]) => (
            <p key={type} style={{ margin: '4px 0' }}>
              {type.charAt(0).toUpperCase()+type.slice(1)}: {allocated - used} days left of {allocated}
            </p>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div style={styles.gridContainer}>

        {/* Calendar */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Attendance Calendar</h2>
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            tileContent={tileContent}
          />
        </section>

        {/* Attendance Trend Chart */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Attendance Trend (Last {attendanceRecords.length} days)</h2>
          <div style={{ height: 200 }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </section>

        {/* Leave Records */}
        <section style={styles.sectionFullWidth}>
          <h2 style={styles.sectionTitle}>Recent Leave Applications</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Type</th><th>Start</th><th>End</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRecords.map((leave, i) => (
                <tr key={i}>
                  <td>{leave.type}</td>
                  <td>{new Date(leave.start).toLocaleDateString()}</td>
                  <td>{new Date(leave.end).toLocaleDateString()}</td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Upcoming Holidays & Events */}
        <section style={styles.sectionFullWidth}>
          <h2 style={styles.sectionTitle}>Upcoming Holidays & Events</h2>
          <ul>
            <li><bold>2025-09-05:</bold> Company Holiday (Labor Day)</li>
            <li><bold>2025-09-15:</bold> Quarterly Team Meeting</li>
            <li><bold>2025-10-01:</bold> Annual Leave Deadline</li>
          </ul>
        </section>

      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: '2rem auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1e293b',
    lineHeight: 1.5,
    padding: '0 1rem'
  },
  pageTitle: {
    fontWeight: '700',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center'
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 32,
    flexWrap: 'wrap'
  },
  card: {
    flex: '1 1 30%',
    borderLeft: '8px solid',
    background: 'white',
    padding: 16,
    borderRadius: 12,
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
    minWidth: 260
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  cardValue: { fontSize: 28, fontWeight: '700', margin: 0 },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 32
  },
  section: {
    background: 'white',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 0 20px rgba(0,0,0,0.05)'
  },
  sectionFullWidth: {
    gridColumn: '1 / -1',
    background: 'white',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 0 20px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  'table th, table td': {
    padding: 12,
    borderBottom: '1px solid #e2e8f0'
  },
  ul: {
    paddingLeft: 20,
    lineHeight: 1.6
  }
};
