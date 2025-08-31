import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'Loading...',
    role: '',
    company: '',
    avatar: '👨‍💼'
  });

  // Attendance state
  const [attendanceStatus, setAttendanceStatus] = useState('out'); // 'in' or 'out'
  const [todayHours, setTodayHours] = useState('0h 0m');
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [isProcessingAttendance, setIsProcessingAttendance] = useState(false);

  // Existing state
  const [stats] = useState({
    totalEmployees: 247,
    activeProjects: 18,
    pendingReviews: 12,
    newHires: 8
  });

  const [activities] = useState([
    { id: 1, type: 'hire', message: 'Sarah Johnson joined as Product Designer', time: '2 hours ago', icon: '👋' },
    { id: 2, type: 'review', message: 'Performance review completed for Mike Chen', time: '4 hours ago', icon: '📊' },
    { id: 3, type: 'leave', message: 'Lisa Park submitted vacation request', time: '6 hours ago', icon: '🌴' },
    { id: 4, type: 'payroll', message: 'Monthly payroll processed successfully', time: '1 day ago', icon: '💰' },
    { id: 5, type: 'training', message: 'New training module published', time: '2 days ago', icon: '📚' }
  ]);

  const [quickActions] = useState([
    { id: 1, title: 'Add Employee', icon: '👥', color: '#10b981', path: '/employees/add' },
    { id: 2, title: 'Run Payroll', icon: '💰', color: '#f59e0b', path: '/payroll/run' },
    { id: 3, title: 'Schedule Review', icon: '📋', color: '#8b5cf6', path: '/reviews/schedule' },
    { id: 4, title: 'View Reports', icon: '📈', color: '#ef4444', path: '/reports' },
    { id: 5, title: 'Time Tracking', icon: '⏰', color: '#06b6d4', path: '/timetracking' },
    { id: 6, title: 'Settings', icon: '⚙️', color: '#6b7280', path: '/settings' }
  ]);

  const [metrics] = useState([
    { label: 'Employee Satisfaction', value: 92, color: '#10b981', trend: '+5%' },
    { label: 'Attendance Rate', value: 96, color: '#3b82f6', trend: '+2%' },
    { label: 'Training Completion', value: 78, color: '#f59e0b', trend: '+12%' },
    { label: 'Retention Rate', value: 89, color: '#8b5cf6', trend: '+3%' }
  ]);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        name: `${parsedUser.first_name} ${parsedUser.last_name}`,
        role: parsedUser.role || 'Employee',
        company: parsedUser.company_name || 'Your Company',
        avatar: '👨‍💼'
      });
    } else {
      // Redirect to login if no user data
      navigate('/login');
    }

    // Load today's attendance status from localStorage
    const todayKey = new Date().toDateString();
    const todayAttendance = localStorage.getItem(`attendance_${todayKey}`);
    if (todayAttendance) {
      const attendance = JSON.parse(todayAttendance);
      setAttendanceStatus(attendance.status);
      setClockInTime(attendance.clockIn ? new Date(attendance.clockIn) : null);
      setClockOutTime(attendance.clockOut ? new Date(attendance.clockOut) : null);
      calculateHoursWorked(attendance.clockIn, attendance.clockOut);
    }
  }, [navigate]);

  const calculateHoursWorked = (clockIn, clockOut) => {
    if (!clockIn) return;
    
    const start = new Date(clockIn);
    const end = clockOut ? new Date(clockOut) : new Date();
    const diffMs = end - start;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    setTodayHours(`${hours}h ${minutes}m`);
  };

  const handleAttendanceAction = async () => {
    setIsProcessingAttendance(true);
    
    try {
      const now = new Date();
      const todayKey = now.toDateString();
      
      if (attendanceStatus === 'out') {
        // Clock In
        const attendanceData = {
          status: 'in',
          clockIn: now.toISOString(),
          clockOut: null
        };
        
        localStorage.setItem(`attendance_${todayKey}`, JSON.stringify(attendanceData));
        setAttendanceStatus('in');
        setClockInTime(now);
        setClockOutTime(null);
        
        // Add to activities
        const newActivity = {
          id: Date.now(),
          type: 'attendance',
          message: `${user.name.split(' ')[0]} clocked in for the day`,
          time: 'Just now',
          icon: '🕘'
        };
        
        // You can also send this to your backend API
        // await fetch('/api/attendance/clock-in', { ... });
        
      } else {
        // Clock Out
        const todayAttendance = JSON.parse(localStorage.getItem(`attendance_${todayKey}`));
        const attendanceData = {
          ...todayAttendance,
          status: 'out',
          clockOut: now.toISOString()
        };
        
        localStorage.setItem(`attendance_${todayKey}`, JSON.stringify(attendanceData));
        setAttendanceStatus('out');
        setClockOutTime(now);
        
        calculateHoursWorked(attendanceData.clockIn, now.toISOString());
        
        // Add to activities
        const newActivity = {
          id: Date.now(),
          type: 'attendance',
          message: `${user.name.split(' ')[0]} clocked out for the day`,
          time: 'Just now',
          icon: '🕕'
        };
        
        // You can also send this to your backend API
        // await fetch('/api/attendance/clock-out', { ... });
      }
      
    } catch (error) {
      console.error('Attendance action failed:', error);
    } finally {
      setIsProcessingAttendance(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link to="/" style={styles.logo}>
            Staff<span style={styles.logoAccent}>Sync</span>
          </Link>
          <nav style={styles.nav}>
            <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
            <Link to="/employees" style={styles.navLink}>Employees</Link>
            <Link to="/payroll" style={styles.navLink}>Payroll</Link>
            <Link to="/reports" style={styles.navLink}>Reports</Link>
            <Link to="/attendance" style={styles.navLink}>Attendance</Link>
          </nav>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.notificationBtn}>🔔</button>
          <div style={styles.userProfile}>
            <span style={styles.userAvatar}>{user.avatar}</span>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user.name}</span>
              <span style={styles.userRole}>{user.role}</span>
            </div>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Welcome Section with Attendance */}
        <section style={styles.welcomeSection}>
          <div style={styles.welcomeContent}>
            <h1 style={styles.welcomeTitle}>
              Good morning, {user.name.split(' ')[0]}! 👋
            </h1>
            <p style={styles.welcomeSubtitle}>
              Here's what's happening at {user.company} today
            </p>
          </div>
          
          {/* Attendance Card */}
          <div style={styles.attendanceCard}>
            <div style={styles.attendanceHeader}>
              <span style={styles.attendanceTitle}>Today's Attendance</span>
              <span style={styles.attendanceDate}>{new Date().toLocaleDateString()}</span>
            </div>
            
            <div style={styles.attendanceTime}>
              <div style={styles.timeDisplay}>
                <span style={styles.currentTime}>
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
                <span style={styles.hoursWorked}>Worked: {todayHours}</span>
              </div>
            </div>
            
            <div style={styles.attendanceActions}>
              {clockInTime && (
                <div style={styles.timeStamp}>
                  <span style={styles.timeLabel}>In:</span>
                  <span style={styles.timeValue}>
                    {clockInTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              )}
              
              {clockOutTime && (
                <div style={styles.timeStamp}>
                  <span style={styles.timeLabel}>Out:</span>
                  <span style={styles.timeValue}>
                    {clockOutTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              )}
              
              <button
                onClick={handleAttendanceAction}
                disabled={isProcessingAttendance}
                style={{
                  ...styles.attendanceBtn,
                  ...(attendanceStatus === 'in' ? styles.clockOutBtn : styles.clockInBtn),
                  ...(isProcessingAttendance ? styles.attendanceBtnDisabled : {})
                }}
              >
                {isProcessingAttendance ? (
                  <>⏳ Processing...</>
                ) : attendanceStatus === 'out' ? (
                  <>🕘 Clock In</>
                ) : (
                  <>🕕 Clock Out</>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section style={styles.statsSection}>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <div style={styles.statContent}>
                <h3 style={styles.statValue}>{stats.totalEmployees}</h3>
                <p style={styles.statLabel}>Total Employees</p>
                <span style={styles.statTrend}>↗️ +12 this month</span>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>🚀</div>
              <div style={styles.statContent}>
                <h3 style={styles.statValue}>{stats.activeProjects}</h3>
                <p style={styles.statLabel}>Active Projects</p>
                <span style={styles.statTrend}>↗️ +3 this week</span>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>📋</div>
              <div style={styles.statContent}>
                <h3 style={styles.statValue}>{stats.pendingReviews}</h3>
                <p style={styles.statLabel}>Pending Reviews</p>
                <span style={styles.statTrend}>⚠️ Due soon</span>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>✨</div>
              <div style={styles.statContent}>
                <h3 style={styles.statValue}>{stats.newHires}</h3>
                <p style={styles.statLabel}>New Hires</p>
                <span style={styles.statTrend}>🎉 This quarter</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <div style={styles.dashboardGrid}>
          {/* Quick Actions */}
          <section style={styles.quickActionsSection}>
            <h2 style={styles.sectionTitle}>Quick Actions</h2>
            <div style={styles.quickActionsGrid}>
              {quickActions.map(action => (
                <Link
                  key={action.id}
                  to={action.path}
                  style={{
                    ...styles.actionCard,
                    borderLeftColor: action.color
                  }}
                >
                  <span style={styles.actionIcon}>{action.icon}</span>
                  <span style={styles.actionTitle}>{action.title}</span>
                  <span style={styles.actionArrow}>→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Performance Metrics */}
          <section style={styles.metricsSection}>
            <h2 style={styles.sectionTitle}>Performance Metrics</h2>
            <div style={styles.metricsGrid}>
              {metrics.map((metric, index) => (
                <div key={index} style={styles.metricCard}>
                  <div style={styles.metricHeader}>
                    <span style={styles.metricLabel}>{metric.label}</span>
                    <span style={styles.metricTrend}>{metric.trend}</span>
                  </div>
                  <div style={styles.metricValue}>{metric.value}%</div>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${metric.value}%`,
                        backgroundColor: metric.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activities */}
          <section style={styles.activitiesSection}>
            <h2 style={styles.sectionTitle}>Recent Activities</h2>
            <div style={styles.activitiesList}>
              {activities.map(activity => (
                <div key={activity.id} style={styles.activityItem}>
                  <span style={styles.activityIcon}>{activity.icon}</span>
                  <div style={styles.activityContent}>
                    <p style={styles.activityMessage}>{activity.message}</p>
                    <span style={styles.activityTime}>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button style={styles.viewAllBtn}>View All Activities</button>
          </section>

          {/* Calendar Widget */}
          <section style={styles.calendarSection}>
            <h2 style={styles.sectionTitle}>Upcoming Events</h2>
            <div style={styles.calendarWidget}>
              <div style={styles.calendarEvent}>
                <div style={styles.eventDate}>
                  <span style={styles.eventDay}>15</span>
                  <span style={styles.eventMonth}>Sep</span>
                </div>
                <div style={styles.eventContent}>
                  <h4 style={styles.eventTitle}>All Hands Meeting</h4>
                  <p style={styles.eventTime}>2:00 PM - 3:30 PM</p>
                </div>
              </div>

              <div style={styles.calendarEvent}>
                <div style={styles.eventDate}>
                  <span style={styles.eventDay}>18</span>
                  <span style={styles.eventMonth}>Sep</span>
                </div>
                <div style={styles.eventContent}>
                  <h4 style={styles.eventTitle}>Performance Reviews Due</h4>
                  <p style={styles.eventTime}>End of day</p>
                </div>
              </div>

              <div style={styles.calendarEvent}>
                <div style={styles.eventDate}>
                  <span style={styles.eventDay}>22</span>
                  <span style={styles.eventMonth}>Sep</span>
                </div>
                <div style={styles.eventContent}>
                  <h4 style={styles.eventTitle}>Payroll Processing</h4>
                  <p style={styles.eventTime}>9:00 AM - 11:00 AM</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
  },
  logo: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#1e293b',
    textDecoration: 'none',
  },
  logoAccent: {
    color: '#f59e0b',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: '#64748b',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  notificationBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '8px',
    transition: 'background 0.2s ease',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    backgroundColor: '#f1f5f9',
  },
  userAvatar: {
    fontSize: '2rem',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1e293b',
  },
  userRole: {
    fontSize: '0.8rem',
    color: '#64748b',
  },
  logoutBtn: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background 0.2s ease',
  },
  main: {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  welcomeSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    color: 'white',
  },
  welcomeContent: {},
  welcomeTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '0 0 0.5rem 0',
  },
  welcomeSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    margin: 0,
  },
  
  // Attendance Card Styles
  attendanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '1.5rem',
    minWidth: '300px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  attendanceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  attendanceTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    opacity: 0.9,
  },
  attendanceDate: {
    fontSize: '0.8rem',
    opacity: 0.7,
  },
  attendanceTime: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  timeDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
  },
  currentTime: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'white',
  },
  hoursWorked: {
    fontSize: '0.9rem',
    opacity: 0.8,
  },
  attendanceActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  timeStamp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    fontSize: '0.9rem',
  },
  timeLabel: {
    opacity: 0.8,
  },
  timeValue: {
    fontWeight: '600',
  },
  attendanceBtn: {
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  clockInBtn: {
    backgroundColor: '#10b981',
    color: 'white',
  },
  clockOutBtn: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
  attendanceBtnDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },

  // Rest of the existing styles...
  statsSection: {
    marginBottom: '3rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  statIcon: {
    fontSize: '2.5rem',
    padding: '1rem',
    borderRadius: '12px',
    backgroundColor: '#f1f5f9',
  },
  statContent: {},
  statValue: {
    fontSize: '2rem',
    fontWeight: '800',
    margin: '0 0 0.25rem 0',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    margin: '0 0 0.5rem 0',
  },
  statTrend: {
    fontSize: '0.8rem',
    color: '#10b981',
    fontWeight: '500',
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
  },
  quickActionsSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    margin: '0 0 1.5rem 0',
    color: '#1e293b',
  },
  quickActionsGrid: {
    display: 'grid',
    gap: '0.75rem',
  },
  actionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#334155',
    transition: 'all 0.2s ease',
    borderLeft: '4px solid',
  },
  actionIcon: {
    fontSize: '1.5rem',
  },
  actionTitle: {
    flex: 1,
    fontWeight: '600',
  },
  actionArrow: {
    fontSize: '1.2rem',
    opacity: 0.6,
  },
  metricsSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  metricsGrid: {
    display: 'grid',
    gap: '1rem',
  },
  metricCard: {
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  metricLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '500',
  },
  metricTrend: {
    fontSize: '0.8rem',
    color: '#10b981',
    fontWeight: '600',
  },
  metricValue: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },
  progressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
  activitiesSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    gridColumn: 'span 2',
  },
  activitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
  },
  activityIcon: {
    fontSize: '1.5rem',
    padding: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    margin: '0 0 0.25rem 0',
    color: '#334155',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: '0.8rem',
    color: '#94a3b8',
  },
  viewAllBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    color: '#475569',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  calendarSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  calendarWidget: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  calendarEvent: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
  },
  eventDate: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.75rem',
    backgroundColor: '#667eea',
    color: 'white',
    borderRadius: '8px',
    minWidth: '60px',
  },
  eventDay: {
    fontSize: '1.25rem',
    fontWeight: '800',
  },
  eventMonth: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    margin: '0 0 0.25rem 0',
    color: '#1e293b',
    fontSize: '1rem',
    fontWeight: '600',
  },
  eventTime: {
    margin: 0,
    color: '#64748b',
    fontSize: '0.9rem',
  },
};
