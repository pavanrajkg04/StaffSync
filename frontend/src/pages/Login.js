import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      
      if (response.ok && data.success) {
        // Store user data for dashboard
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setErrors({
          general: data.message || "Incorrect email or password.",
        });
      }
    } catch (error) {
      setErrors({ general: error.message || "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <Link to="/" style={styles.logo}>
          Staff<span style={styles.logoAccent}>Sync</span>
        </Link>
        <div style={styles.headerActions}>
          <span style={styles.headerText}>Don't have an account?</span>
          <Link to="/register" style={styles.headerLink}>Sign up</Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.loginCard}>
          {/* Welcome Section */}
          <div style={styles.welcomeSection}>
            <div style={styles.iconContainer}>
              <div style={styles.icon}>🔐</div>
            </div>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>
              Sign in to your StaffSync account to continue managing your workforce
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {errors.general && (
              <div style={styles.errorAlert}>
                <span style={styles.errorIcon}>⚠️</span>
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {})
                  }}
                />
              </div>
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {})
                  }}
                />
              </div>
              {errors.password && <span style={styles.errorText}>{errors.password}</span>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={styles.formOptions}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>Remember me</span>
              </label>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitBtn,
                ...(isLoading ? styles.submitBtnDisabled : {})
              }}
            >
              {isLoading ? (
                <>
                  <span style={styles.spinner}>⏳</span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span style={styles.btnIcon}>→</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={styles.divider}>
            <span style={styles.dividerText}>or continue with</span>
          </div>

          {/* Social Login Options */}
          <div style={styles.socialLogin}>
            <button style={styles.socialBtn}>
              <span style={styles.socialIcon}>🔵</span>
              Google
            </button>
            <button style={styles.socialBtn}>
              <span style={styles.socialIcon}>⚫</span>
              GitHub
            </button>
          </div>

          {/* Footer Links */}
          <div style={styles.cardFooter}>
            <p style={styles.footerText}>
              New to StaffSync?{' '}
              <Link to="/register" style={styles.footerLink}>
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Side Benefits */}
        <div style={styles.benefits}>
          <h3 style={styles.benefitsTitle}>Why StaffSync?</h3>
          <div style={styles.benefitsList}>
            <div style={styles.benefit}>
              <span style={styles.benefitIcon}>⚡</span>
              <div>
                <h4 style={styles.benefitTitle}>Lightning Fast</h4>
                <p style={styles.benefitDesc}>Get up and running in minutes</p>
              </div>
            </div>
            <div style={styles.benefit}>
              <span style={styles.benefitIcon}>🔒</span>
              <div>
                <h4 style={styles.benefitTitle}>Enterprise Security</h4>
                <p style={styles.benefitDesc}>Bank-level encryption & compliance</p>
              </div>
            </div>
            <div style={styles.benefit}>
              <span style={styles.benefitIcon}>🌐</span>
              <div>
                <h4 style={styles.benefitTitle}>Open Source</h4>
                <p style={styles.benefitDesc}>Fully customizable & transparent</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#1a202c',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  logo: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: 'white',
    textDecoration: 'none',
  },
  logoAccent: {
    color: '#fbbf24',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  headerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
  },
  headerLink: {
    color: '#fbbf24',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '0.5rem 1rem',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
  },
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
    alignItems: 'start',
  },
  loginCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '3rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    maxWidth: '450px',
    width: '100%',
  },
  welcomeSection: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '3rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '0.5rem',
    color: '#1a202c',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  errorAlert: {
    background: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
  },
  errorIcon: {
    fontSize: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    fontSize: '1rem',
    zIndex: 1,
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
  },
  inputError: {
    borderColor: '#f87171',
    background: '#fef2f2',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  formOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
  },
  checkboxText: {
    color: '#6b7280',
  },
  forgotLink: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '500',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
    fontFamily: "'Inter', sans-serif",
  },
  submitBtnDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  spinner: {
    fontSize: '1rem',
  },
  btnIcon: {
    fontSize: '1.2rem',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
  },
  dividerText: {
    background: 'white',
    color: '#9ca3af',
    fontSize: '0.9rem',
    padding: '0 1rem',
    position: 'relative',
    width: '100%',
    textAlign: 'center',
  },
  socialLogin: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  socialBtn: {
    background: 'white',
    border: '2px solid #e5e7eb',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
    fontFamily: "'Inter', sans-serif",
  },
  socialIcon: {
    fontSize: '1rem',
  },
  cardFooter: {
    textAlign: 'center',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e5e7eb',
  },
  footerText: {
    color: '#6b7280',
    fontSize: '0.9rem',
    margin: 0,
  },
  footerLink: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '600',
  },
  benefits: {
    color: 'white',
    padding: '2rem 0',
  },
  benefitsTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    marginBottom: '2rem',
  },
  benefitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  benefit: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  benefitIcon: {
    fontSize: '2rem',
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '0.75rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  benefitTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.25rem',
    margin: 0,
  },
  benefitDesc: {
    opacity: 0.9,
    fontSize: '0.9rem',
    margin: 0,
    lineHeight: '1.5',
  },
};
