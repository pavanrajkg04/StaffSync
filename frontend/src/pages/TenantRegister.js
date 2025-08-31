import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TenantRegister() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    companySize: '',
    industry: '',
    website: '',
    // Admin Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    // Account Setup
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'Company Info', icon: '🏢' },
    { number: 2, title: 'Admin Details', icon: '👤' },
    { number: 3, title: 'Account Setup', icon: '🔐' }
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees'
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Consulting',
    'Other'
  ];

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

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.companySize) newErrors.companySize = 'Company size is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
    }
    
    if (step === 2) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    }
    
    if (step === 3) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }
    
    return newErrors;
  };

  const nextStep = () => {
    const newErrors = validateStep(currentStep);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep(3);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const payload = {
      company_name: formData.companyName,
      company_size: formData.companySize,
      industry: formData.industry,
      website: formData.website,
      admin_first_name: formData.firstName,
      admin_last_name: formData.lastName,
      admin_email: formData.email,
      admin_phone: formData.phone,
      job_title: formData.jobTitle,
      subscribe_newsletter: formData.subscribeNewsletter,
      admin_password: formData.password,
    };
 
    try {
      console.log("API URL:", process.env.REACT_APP_API_URL);
      const response = await fetch(
       
        // Recommended: Use environment variable for API URL, e.g., process.env.REACT_APP_API_URL + '/api/tenant/register'
        process.env.REACT_APP_API_URL + "/api/tenant/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      console.log("status", response.status);
      const text = await response.text();
      console.log("raw response", text);
      
      const data = await response.json();
      console.log("API response:", data);

      if (response.ok) {
        alert(`✅ ${data.message || "Registration successful!"}`);
        // Reset form data
        setFormData({
          companyName: '',
          companySize: '',
          industry: '',
          website: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          jobTitle: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false,
          subscribeNewsletter: false
        });
        // Redirect to login page (assuming you have a /login route)
        window.location.href = '/login';
      } else {
        setErrors({
          general: data.detail || data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({
        general: error.message || "Network error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <h2 style={styles.stepTitle}>Tell us about your company</h2>
              <p style={styles.stepSubtitle}>Help us customize StaffSync for your organization</p>
            </div>
            
            <div style={styles.inputGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.companyName ? styles.inputError : {})
                  }}
                />
                {errors.companyName && <span style={styles.errorText}>{errors.companyName}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Company Size *</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  style={{
                    ...styles.select,
                    ...(errors.companySize ? styles.inputError : {})
                  }}
                >
                  <option value="">Select company size</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.companySize && <span style={styles.errorText}>{errors.companySize}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Industry *</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  style={{
                    ...styles.select,
                    ...(errors.industry ? styles.inputError : {})
                  }}
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {errors.industry && <span style={styles.errorText}>{errors.industry}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Website (Optional)</label>
                <input
                  type="url"
                  name="website"
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <h2 style={styles.stepTitle}>Admin account details</h2>
              <p style={styles.stepSubtitle}>This will be your primary admin account</p>
            </div>
            
            <div style={styles.inputGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.firstName ? styles.inputError : {})
                  }}
                />
                {errors.firstName && <span style={styles.errorText}>{errors.firstName}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.lastName ? styles.inputError : {})
                  }}
                />
                {errors.lastName && <span style={styles.errorText}>{errors.lastName}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {})
                  }}
                />
                {errors.email && <span style={styles.errorText}>{errors.email}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.phone ? styles.inputError : {})
                  }}
                />
                {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
              </div>

              <div style={styles.inputGroupFull}>
                <label style={styles.label}>Job Title *</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="e.g., HR Manager, CEO, Operations Director"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.jobTitle ? styles.inputError : {})
                  }}
                />
                {errors.jobTitle && <span style={styles.errorText}>{errors.jobTitle}</span>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <h2 style={styles.stepTitle}>Secure your account</h2>
              <p style={styles.stepSubtitle}>Create a strong password to protect your data</p>
            </div>
            
            {errors.general && (
              <div style={styles.errorAlert}>
                <span style={styles.errorIcon}>⚠️</span>
                {errors.general}
              </div>
            )}

            <div style={styles.inputGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {})
                  }}
                />
                {errors.password && <span style={styles.errorText}>{errors.password}</span>}
                <div style={styles.passwordHint}>
                  Password should be at least 8 characters long
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.confirmPassword ? styles.inputError : {})
                  }}
                />
                {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
              </div>
            </div>

            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>
                  I agree to the{' '}
                  <a href="/terms" style={styles.link}>Terms of Service</a>{' '}
                  and{' '}
                  <a href="/privacy" style={styles.link}>Privacy Policy</a> *
                </span>
              </label>
              {errors.agreeToTerms && <span style={styles.errorText}>{errors.agreeToTerms}</span>}
            </div>

            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>
                  Send me product updates and HR management tips
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
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
          <span style={styles.headerText}>Already have an account?</span>
          <Link to="/login" style={styles.headerLink}>Sign in</Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.registerCard}>
          {/* Progress Steps */}
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              {steps.map((step, index) => (
                <div key={step.number} style={styles.step}>
                  <div style={{
                    ...styles.stepCircle,
                    ...(currentStep >= step.number ? styles.stepCircleActive : {})
                  }}>
                    {currentStep > step.number ? '✓' : step.icon}
                  </div>
                  <span style={{
                    ...styles.stepLabel,
                    ...(currentStep >= step.number ? styles.stepLabelActive : {})
                  }}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div style={{
                      ...styles.stepConnector,
                      ...(currentStep > step.number ? styles.stepConnectorActive : {})
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div style={styles.buttonGroup}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  style={styles.backBtn}
                >
                  ← Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  style={styles.nextBtn}
                >
                  Continue →
                </button>
              ) : (
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <span style={styles.btnIcon}>🚀</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Side Info */}
        <div style={styles.sideInfo}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>🎉 What's Included</h3>
            <ul style={styles.featuresList}>
              <li>✓ Unlimited employees</li>
              <li>✓ Complete payroll management</li>
              <li>✓ Attendance tracking</li>
              <li>✓ Performance reviews</li>
              <li>✓ Document management</li>
              <li>✓ HR analytics dashboard</li>
              <li>✓ Multi-tenant support</li>
              <li>✓ 24/7 community support</li>
            </ul>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>🔒 Enterprise Security</h3>
            <p style={styles.infoText}>
              Your data is protected with bank-level encryption, regular security audits, 
              and compliance with GDPR and other data protection regulations.
            </p>
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
    gridTemplateColumns: '2fr 1fr',
    gap: '3rem',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    alignItems: 'start',
  },
  registerCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '3rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  },
  progressContainer: {
    marginBottom: '3rem',
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    maxWidth: '500px',
    margin: '0 auto',
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  stepCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: '#e5e7eb',
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    transition: 'all 0.3s ease',
  },
  stepCircleActive: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: 'white',
  },
  stepLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#9ca3af',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#4f46e5',
  },
  stepConnector: {
    position: 'absolute',
    top: '25px',
    left: '50%',
    right: '-50%',
    height: '2px',
    background: '#e5e7eb',
    zIndex: -1,
  },
  stepConnectorActive: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
  },
  stepContent: {
    marginBottom: '2rem',
  },
  stepHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  stepTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    marginBottom: '0.5rem',
    color: '#1a202c',
  },
  stepSubtitle: {
    color: '#6b7280',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  inputGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  inputGroupFull: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    gridColumn: '1 / -1',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '0.75rem 1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
  },
  select: {
    padding: '0.75rem 1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
    background: 'white',
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
    marginBottom: '1.5rem',
  },
  errorIcon: {
    fontSize: '1rem',
  },
  passwordHint: {
    fontSize: '0.8rem',
    color: '#6b7280',
    marginTop: '0.25rem',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1.5rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    marginTop: '2px',
    flexShrink: 0,
  },
  checkboxText: {
    fontSize: '0.9rem',
    color: '#374151',
    lineHeight: '1.5',
  },
  link: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '600',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb',
  },
  backBtn: {
    background: 'transparent',
    border: '2px solid #e5e7eb',
    color: '#6b7280',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: "'Inter', sans-serif",
  },
  nextBtn: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: "'Inter', sans-serif'",
    marginLeft: 'auto',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    border: 'none',
    color: 'white',
    padding: '0.75rem 2rem',
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
    marginLeft: 'auto',
  },
  submitBtnDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  spinner: {
    fontSize: '1rem',
  },
  btnIcon: {
    fontSize: '1rem',
  },
  sideInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    color: 'white',
  },
  infoCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  infoTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  infoText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    opacity: 0.9,
    margin: 0,
  },
};