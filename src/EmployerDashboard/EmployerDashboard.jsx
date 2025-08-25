import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import { useNavigate, Routes, Route } from 'react-router-dom';
import JobPostingForm from './components/JobPostingForm';
import EmployerProfile from './components/EmployerProfile';
import styles from './EmployerDashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faBriefcase, 
  faListCheck, 
  faBuilding, 
  faChartLine,
  faSignOutAlt,
  faPlus,
  faFileAlt,
  faInbox,
  faChartBar,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';

const EmployerDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('post-job');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.userType !== 'employer') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };
  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  if (!currentUser) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className={styles.dashboard}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title} onClick={() => navigate('/employer')} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faBuilding} />
            <span>Employer Dashboard</span>
            {/* change the title to logo structure */}
          </h1>
          <div className={styles.userInfo}>
            <span className={styles.welcomeText}>
              Welcome back, <strong>{currentUser.name || 'Employer'}</strong>
            </span>
            <div className={styles.actions}>
              <button 
                onClick={handleProfileClick}
                className={`${styles.btn} ${styles.btnOutline}`}
              >
                <FontAwesomeIcon icon={faUser} className={styles.mr1} />
                Profile
              </button>
              <button 
                className={`${styles.btn} ${styles.btnPrimary} ${isLoggingOut ? styles.btnLoading : ''}`}
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <FontAwesomeIcon 
                  icon={isLoggingOut ? 'spinner' : faSignOutAlt} 
                  className={`${styles.mr1} ${isLoggingOut ? styles.spin : ''}`} 
                />
                {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        </div>

        {/* NAVIGATION - Only show on main dashboard */}
        {!window.location.pathname.includes('/profile') && (
          <div className={styles.navTabs}>
            <nav className={styles.tabList}>
              <button 
                onClick={() => setActiveTab('post-job')} 
                className={`${styles.tab} ${activeTab === 'post-job' ? styles.tabActive : ''}`}
              >
                <FontAwesomeIcon icon={faBriefcase} />
                <span>Post a Job</span>
              </button>
              <button 
                onClick={() => setActiveTab('my-jobs')} 
                className={`${styles.tab} ${activeTab === 'my-jobs' ? styles.tabActive : ''}`}
              >
                <FontAwesomeIcon icon={faListCheck} />
                <span>My Job Posts</span>
              </button>
              <button 
                onClick={() => setActiveTab('applications')} 
                className={`${styles.tab} ${activeTab === 'applications' ? styles.tabActive : ''}`}
              >
                <FontAwesomeIcon icon={faClipboardList} />
                <span>Applications</span>
              </button>
              <button 
                onClick={() => setActiveTab('analytics')} 
                className={`${styles.tab} ${activeTab === 'analytics' ? styles.tabActive : ''}`}
              >
                <FontAwesomeIcon icon={faChartLine} />
                <span>Analytics</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className={styles.mainContent}>
        {activeTab === 'post-job' && <JobPostingForm />}
        
        {activeTab === 'my-jobs' && (
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <FontAwesomeIcon icon={faListCheck} />
                <span>My Job Posts</span>
              </h2>
              <button 
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => setActiveTab('post-job')}
              >
                <FontAwesomeIcon icon={faPlus} className={styles.mr1} />
                <span>New Job Post</span>
              </button>
            </div>
            <div className={styles.emptyState}>
              <FontAwesomeIcon icon={faFileAlt} className={styles.emptyStateIcon} />
              <h3 className={styles.emptyStateTitle}>No Job Posts Yet</h3>
              <p className={styles.emptyStateText}>
                You haven't posted any jobs yet. Get started by creating your first job posting.
              </p>
              <button 
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => setActiveTab('post-job')}
              >
                <FontAwesomeIcon icon={faPlus} className={styles.mr1} />
                <span>Post a Job</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <FontAwesomeIcon icon={faClipboardList} />
                <span>Job Applications</span>
              </h2>
            </div>
            <div className={styles.emptyState}>
              <FontAwesomeIcon icon={faInbox} className={styles.emptyStateIcon} />
              <h3 className={styles.emptyStateTitle}>No Applications Yet</h3>
              <p className={styles.emptyStateText}>
                Applications for your job postings will appear here once candidates start applying.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <FontAwesomeIcon icon={faChartLine} />
                <span>Job Post Analytics</span>
              </h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>0</div>
                  <div className={styles.statLabel}>Total Jobs Posted</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>0</div>
                  <div className={styles.statLabel}>Total Applications</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>0%</div>
                  <div className={styles.statLabel}>Application Rate</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>0</div>
                  <div className={styles.statLabel}>Active Listings</div>
                </div>
              </div>
              
              <div className={styles.emptyState}>
                <FontAwesomeIcon icon={faChartBar} className={styles.emptyStateIcon} />
                <h3 className={styles.emptyStateTitle}>No Analytics Data Yet</h3>
                <p className={styles.emptyStateText}>
                  Analytics data will be displayed here as you post jobs and receive applications.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && <EmployerProfile />}
      </main>
    </div>
  );
};

export default EmployerDashboard;
