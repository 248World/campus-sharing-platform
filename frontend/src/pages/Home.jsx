import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const FeatureIcon = ({ children, color = '#3b82f6' }) => (
    <div className="feature-icon" style={{ color }}>
      {children}
    </div>
  );

  const SearchIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const ShareIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );

  const SecurityIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const CommunityIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Share More, Spend Less</h1>
        <p>
          Connect with fellow students to share textbooks, equipment, and resources on campus
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-primary">
            Get Started Free
          </Link>
          <Link to="/items" className="btn" style={{ background: 'white', color: '#3b82f6' }}>
            Browse Items
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ marginTop: '3rem' }}>
        <h2 className="text-center" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
          Why Campus Share?
        </h2>
        <div className="features">
          <div className="feature-card">
            <FeatureIcon>
              <SearchIcon />
            </FeatureIcon>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Easy Search</h3>
            <p style={{ color: '#6b7280' }}>Find exactly what you need with powerful filters</p>
          </div>
          
          <div className="feature-card">
            <FeatureIcon color="#10b981">
              <ShareIcon />
            </FeatureIcon>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Simple Sharing</h3>
            <p style={{ color: '#6b7280' }}>Post items in minutes, connect with borrowers</p>
          </div>
          
          <div className="feature-card">
            <FeatureIcon color="#8b5cf6">
              <SecurityIcon />
            </FeatureIcon>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Verified Users</h3>
            <p style={{ color: '#6b7280' }}>University email verification for safety</p>
          </div>
          
          <div className="feature-card">
            <FeatureIcon color="#ef4444">
              <CommunityIcon />
            </FeatureIcon>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Build Community</h3>
            <p style={{ color: '#6b7280' }}>Connect with students across campus</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Ready to start sharing?</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Join thousands of students sharing resources on campus
        </p>
        <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '12px 24px' }}>
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

export default Home;