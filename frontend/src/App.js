import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import TenantRegister from './pages/TenantRegister';
import Dashboard from './pages/dashboard';
import Employees from './pages/employees';
import Payroll from './pages/payroll';
import Reports from './pages/reports';
import Attendance from './pages/attendance';

// Import additional pages as you create them
// import Dashboard from './pages/Dashboard';
// import NotFound from './pages/NotFound';



function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<TenantRegister />} />
        
        {/* Redirect old paths for better UX */}
        <Route path="/signup" element={<Navigate to="/register" replace />} />
        <Route path="/signin" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/attendance" element={<Attendance />} />
        {/* Future Routes - Uncomment as you build these pages */}
        {/* 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        
        // Protected Routes (will need authentication wrapper)
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/employees/*" element={<EmployeeRoutes />} />
        <Route path="/payroll/*" element={<PayrollRoutes />} />
        <Route path="/attendance/*" element={<AttendanceRoutes />} />
        <Route path="/performance/*" element={<PerformanceRoutes />} />
        <Route path="/settings/*" element={<SettingsRoutes />} />
        */}
        
        {/* Catch all route - 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// Simple 404 component for now
function NotFound() {
  return (
    <div style={notFoundStyles.container}>
      <div style={notFoundStyles.content}>
        <h1 style={notFoundStyles.title}>404</h1>
        <h2 style={notFoundStyles.subtitle}>Page Not Found</h2>
        <p style={notFoundStyles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" style={notFoundStyles.homeLink}>
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

const notFoundStyles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '2rem',
  },
  content: {
    maxWidth: '500px',
  },
  title: {
    fontSize: '6rem',
    fontWeight: '900',
    margin: '0 0 1rem 0',
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '2rem',
    fontWeight: '700',
    margin: '0 0 1rem 0',
  },
  description: {
    fontSize: '1.1rem',
    opacity: 0.9,
    margin: '0 0 2rem 0',
    lineHeight: '1.6',
  },
  homeLink: {
    display: 'inline-block',
    background: 'white',
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    transition: 'transform 0.2s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
};

export default App;
