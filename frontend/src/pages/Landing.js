import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={styles.container}>
      {/* Navigation Header */}
      <header style={styles.header}>
        <div style={styles.nav}>
          <div style={styles.logoSection}>
            <h1 style={styles.logo}>
              Staff<span style={styles.logoAccent}>Sync</span>
            </h1>
            <span style={styles.badge}>Open Source</span>
          </div>
          <nav style={styles.navLinks}>
            <a href="#features" style={styles.navLink}>Features</a>
            <a href="https://github.com/pavanrajkg04/staffsync" style={styles.navLink}>GitHub</a>
            <Link to="/login" style={styles.loginBtn}>Login</Link>
            <Link to="/register" style={styles.ctaBtn}>Start Free</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              The Future of <span style={styles.highlight}>HR Management</span> is Here
            </h1>
            <p style={styles.heroSubtitle}>
              StaffSync is a powerful, open-source HRMS platform that streamlines your entire workforce management. From payroll automation to performance tracking, we've got you covered.
            </p>
            <div style={styles.heroButtons}>
              <Link to="/register" style={styles.primaryBtn}>
                Get Started Free
                <span style={styles.btnIcon}>→</span>
              </Link>
              <a href="#demo" style={styles.secondaryBtn}>
                <span style={styles.playIcon}>▶</span>
                Watch Demo
              </a>
            </div>
            <div style={styles.socialProof}>
              <span style={styles.proofText}>Trusted by 500+ companies worldwide</span>
            </div>
          </div>
          <div style={styles.heroVisual}>
            <div style={styles.dashboardPreview}>
              <div style={styles.mockup}>📊 Dashboard Preview</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Everything You Need to Manage Your Team</h2>
          <div style={styles.featuresGrid}>
            {featuresData.map((feature, index) => (
              <div key={index} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.benefits}>
        <div style={styles.container}>
          <div style={styles.benefitsContent}>
            <div style={styles.benefitsText}>
              <h2 style={styles.benefitsTitle}>Why Choose StaffSync?</h2>
              <div style={styles.benefitsList}>
                <div style={styles.benefit}>
                  <span style={styles.checkIcon}>✓</span>
                  <div>
                    <h4>100% Open Source</h4>
                    <p>Complete transparency and customization freedom</p>
                  </div>
                </div>
                <div style={styles.benefit}>
                  <span style={styles.checkIcon}>✓</span>
                  <div>
                    <h4>Multi-Tenant Architecture</h4>
                    <p>Perfect for agencies managing multiple clients</p>
                  </div>
                </div>
                <div style={styles.benefit}>
                  <span style={styles.checkIcon}>✓</span>
                  <div>
                    <h4>Enterprise-Grade Security</h4>
                    <p>Bank-level encryption and compliance ready</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.statsGrid}>
              <div style={styles.stat}>
                <div style={styles.statNumber}>99.9%</div>
                <div style={styles.statLabel}>Uptime</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>50+</div>
                <div style={styles.statLabel}>Features</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>0</div>
                <div style={styles.statLabel}>Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your HR Operations?</h2>
          <p style={styles.ctaSubtitle}>Join thousands of companies using StaffSync to streamline their workforce management</p>
          <Link to="/register" style={styles.ctaButton}>
            Start Now
            <span style={styles.btnIcon}>→</span>
          </Link>
          <p style={styles.ctaNote}>No credit card required • Setup in 5 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <h3 style={styles.footerLogo}>StaffSync</h3>
            <p style={styles.footerDesc}>Open-source HRMS for modern teams</p>
          </div>
          <div style={styles.footerLinks}>
            <div style={styles.linkGroup}>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#demo">Demo</a>
            </div>
            <div style={styles.linkGroup}>
              <h4>Community</h4>
              <a href="https://github.com/yourusername/staffsync">GitHub</a>
              <a href="#docs">Documentation</a>
              <a href="#support">Support</a>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>© 2025 StaffSync. Open-source project under MIT License.</p>
        </div>
      </footer>
    </div>
  );
}

// Features data
const featuresData = [
  {
    icon: '👥',
    title: 'Employee Management',
    description: 'Centralized employee profiles, onboarding workflows, and organizational hierarchy management'
  },
  {
    icon: '⏰',
    title: 'Time & Attendance',
    description: 'Automated time tracking, leave management, and attendance reporting with multiple clock-in methods'
  },
  {
    icon: '💰',
    title: 'Payroll Automation',
    description: 'Streamlined payroll processing, tax calculations, and automated salary slip generation'
  },
  {
    icon: '📊',
    title: 'Performance Analytics',
    description: 'Goal setting, performance reviews, and comprehensive HR analytics dashboard'
  },
  {
    icon: '🎓',
    title: 'Training & Development',
    description: 'Learning management, skill tracking, and employee development programs'
  },
  {
    icon: '🔒',
    title: 'Compliance & Security',
    description: 'GDPR compliant, audit logs, and enterprise-grade security features'
  }
];

// Styles object
const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    lineHeight: 1.6,
    color: '#1a202c',
    margin: 0,
    padding: 0,
  },
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 2rem',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logo: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#2d3748',
    margin: 0,
  },
  logoAccent: {
    color: '#4f46e5',
  },
  badge: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontWeight: '600',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: '#4a5568',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  loginBtn: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '0.5rem 1rem',
  },
  ctaBtn: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    transition: 'transform 0.2s ease',
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '5rem 2rem',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },
  heroText: {
    maxWidth: '500px',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '900',
    lineHeight: '1.1',
    marginBottom: '1.5rem',
  },
  highlight: {
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    opacity: 0.9,
    marginBottom: '2rem',
    lineHeight: '1.7',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  primaryBtn: {
    background: 'white',
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '700',
    padding: '1rem 2rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'transform 0.2s ease',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
  secondaryBtn: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '1rem 2rem',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
  },
  btnIcon: {
    fontSize: '1.2rem',
  },
  playIcon: {
    fontSize: '0.9rem',
  },
  socialProof: {
    opacity: 0.8,
  },
  proofText: {
    fontSize: '0.9rem',
  },
  heroVisual: {
    display: 'flex',
    justifyContent: 'center',
  },
  dashboardPreview: {
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '2rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  mockup: {
    background: 'white',
    color: '#4a5568',
    borderRadius: '12px',
    padding: '3rem 2rem',
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  features: {
    padding: '6rem 2rem',
    background: '#f7fafc',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: '4rem',
    color: '#2d3748',
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease',
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
    color: '#2d3748',
  },
  featureDesc: {
    color: '#4a5568',
    lineHeight: '1.6',
  },
  benefits: {
    padding: '6rem 2rem',
  },
  benefitsContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },
  benefitsTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '2rem',
    color: '#2d3748',
  },
  benefitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  benefit: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  checkIcon: {
    background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    color: 'white',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: '700',
    flexShrink: 0,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  stat: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: '600',
  },
  cta: {
    background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
    color: 'white',
    padding: '6rem 2rem',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
  },
  ctaSubtitle: {
    fontSize: '1.25rem',
    opacity: 0.9,
    marginBottom: '2rem',
  },
  ctaButton: {
    background: 'white',
    color: '#1e40af',
    textDecoration: 'none',
    fontWeight: '700',
    padding: '1rem 2rem',
    borderRadius: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.1rem',
    marginBottom: '1rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  ctaNote: {
    fontSize: '0.9rem',
    opacity: 0.8,
  },
  footer: {
    background: '#1a202c',
    color: 'white',
    padding: '3rem 2rem 1rem',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '3rem',
    marginBottom: '2rem',
  },
  footerBrand: {
    maxWidth: '300px',
  },
  footerLogo: {
    fontSize: '1.5rem',
    fontWeight: '800',
    marginBottom: '0.5rem',
  },
  footerDesc: {
    color: '#a0aec0',
    fontSize: '0.9rem',
  },
  footerLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '2rem',
  },
  linkGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  footerBottom: {
    borderTop: '1px solid #2d3748',
    paddingTop: '1rem',
    textAlign: 'center',
    color: '#a0aec0',
    fontSize: '0.9rem',
  },
};
