// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>Staff<span style={styles.logoAccent}>Sync</span></Link>
        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
          <Link to="/employees" style={styles.navLink}>Employees</Link>
          <Link to="/payroll" style={styles.navLink}>Payroll</Link>
          <Link to="/reports" style={styles.navLink}>Reports</Link>
          <Link to="/attendance" style={styles.navLink}>Attendance</Link>
        </nav>
      </div>
      <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  left: { display: 'flex', alignItems: 'center', gap: '2rem' },
  logo: { fontSize: '1.75rem', fontWeight: '800', color: '#fbbf24', textDecoration: 'none' },
  logoAccent: { color: '#fbbf24' },
  nav: { display: 'flex', gap: '1.5rem' },
  navLink: { color: 'white', textDecoration: 'none', fontWeight: '600' },
  logoutBtn: { backgroundColor: '#ef4444', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', color: 'white', cursor: 'pointer' },
};
