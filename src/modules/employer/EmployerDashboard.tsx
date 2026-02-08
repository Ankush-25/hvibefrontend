import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import JobPostingForm from './components/JobPostingForm';
import CompanyProfile from './components/CompanyProfile';
// import styles from './EmployerDashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBriefcase,
  faListCheck,
  faChartLine,
  faSignOutAlt,
  faPlus,
  faFileAlt,
  faInbox,
  faChartBar,
  faClipboardList,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faSpinner);
import axios from 'axios';
import { Api_url } from '../../config/globalConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';
import { Profile } from '../profile/profile';
import { Imagepaths } from '../../assets/Global_Need_files/ImagesPaths';
import { EmployerDashboardProps, UserCompany, DashboardTab } from '../../types/employerDashboard';
import { cn } from '../../lib/utils';

const EmployerDashboard = ({ }: EmployerDashboardProps) => {
  const { currentUser, logout } = useAuth();
  const recruiterDetails = useSelector((state: RootState) => state.usrProfile);
  console.log(recruiterDetails);

  const [activeTab, setActiveTab] = useState<DashboardTab>('post-job');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userCompany, setUserCompany] = useState<UserCompany[]>([]);
  const navigate = useNavigate();

  const FetchRecruiterCompany = async () => {
    try {
      const userCompanyResponse = await axios.get(`${Api_url}/allcompanies`);
      console.log(userCompanyResponse.data);
      setUserCompany(userCompanyResponse.data);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  useEffect(() => {
    FetchRecruiterCompany();

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

  const handleCompanyProfileClick = () => {
    setActiveTab('CompanyProfile');
  };

  const handleRecruiterProfileClick = () => {
    setActiveTab('RecruiterProfile');
  };

  if (!currentUser) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-[#121212] font-['Inter',sans-serif] text-[#f3f4f6] transition-colors duration-300">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#1e1e1e]/90 border-b border-[#3d3d3d] backdrop-blur-md shadow-lg">
        <div className="max-w-[1400px] mx-auto px-6 h-[70px] flex justify-between items-center relative">
          <h1
            className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-purple-400 bg-clip-text text-transparent flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/employer')}
          >
            <img src={Imagepaths.HiringstoreslogoPath} className="h-[50px]" alt="HiringStores Logo" />
            <span className="text-[0.9375rem] font-medium bg-white/10 px-4 py-2 rounded-full hidden sm:block text-white">
              Welcome back, <strong>{currentUser?.name || 'Employer'}</strong>
            </span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex justify-end gap-3 p-2.5">
              <button
                onClick={handleCompanyProfileClick}
                className="inline-flex items-center justify-center font-medium text-[0.9375rem] rounded-lg px-4 py-2 transition-all duration-200 border border-purple-600 text-purple-600 gap-2 whitespace-nowrap cursor-pointer hover:bg-purple-600/10"
              >
                <FontAwesomeIcon icon={faUser} />
                Company Profile
              </button>

              <button
                onClick={handleRecruiterProfileClick}
                className="inline-flex items-center justify-center font-medium text-[0.9375rem] rounded-lg px-4 py-2 transition-all duration-200 border border-purple-600 text-purple-600 gap-2 whitespace-nowrap cursor-pointer hover:bg-purple-600/10"
              >
                <FontAwesomeIcon icon={faUser} />
                Your Profile
              </button>

              <button
                className={cn(
                  "inline-flex items-center justify-center font-medium text-[0.9375rem] rounded-lg px-4 py-2 transition-all duration-200 border border-transparent gap-2 whitespace-nowrap cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed bg-purple-600 text-white hover:bg-purple-500 hover:-translate-y-0.5 shadow-[0_2px_5px_rgba(0,0,0,0.2)] active:translate-y-0",
                  isLoggingOut && "opacity-80 pointer-events-none"
                )}
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <FontAwesomeIcon
                  icon={isLoggingOut ? faSpinner : faSignOutAlt}
                  className={cn(isLoggingOut && "animate-spin")}
                />
                {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        </div>

        {/* NAVIGATION - Only show on main dashboard */}
        {!window.location.pathname.includes('/profile') && (
          <div className="bg-[#252525] border-b border-[#3d3d3d] overflow-x-auto no-scrollbar">
            <nav className="max-w-[1400px] mx-auto px-6 flex gap-6 min-w-max">
              {[
                { id: 'post-job', icon: faBriefcase, label: 'Post a Job' },
                { id: 'my-jobs', icon: faListCheck, label: 'My Job Posts' },
                { id: 'applications', icon: faClipboardList, label: 'Applications' },
                { id: 'analytics', icon: faChartLine, label: 'Analytics' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "px-6 py-4 text-[0.9375rem] font-medium text-[#d1d5db] bg-transparent border-b-2 border-transparent transition-all duration-200 flex items-center gap-2 hover:text-purple-600",
                    activeTab === tab.id && "text-purple-400 border-b-purple-600 bg-purple-600/10 font-semibold"
                  )}
                >
                  <FontAwesomeIcon icon={tab.icon} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="max-w-[1400px] mx-auto my-8 bg-[#121212] rounded-xl border border-[#2d2d2d] overflow-hidden">
        {activeTab === 'post-job' && <JobPostingForm userCompany={userCompany} />}

        {activeTab === 'my-jobs' && (
          <div className="bg-[#121212] rounded-lg border border-[#2d2d2d] mb-6 overflow-hidden transition-all duration-200 hover:border-[#3d3d3d] hover:shadow-md p-6">
            <div className="border-b border-[#252525] mb-4 pb-3 flex justify-between items-center">
              <h2 className="m-0 text-[1.125rem] font-semibold text-[#f3f4f6] flex items-center gap-3">
                <FontAwesomeIcon icon={faListCheck} />
                <span>My Job Posts</span>
              </h2>
              <button
                className="inline-flex items-center justify-center font-medium text-[0.9375rem] rounded-lg px-4 py-2 transition-all duration-200 border border-transparent gap-2 whitespace-nowrap cursor-pointer bg-purple-600 text-white hover:bg-purple-500 hover:-translate-y-0.5 shadow-md"
                onClick={() => setActiveTab('post-job')}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>New Job Post</span>
              </button>
            </div>
            <div className="py-10 px-6 text-center text-[#d1d5db] bg-[#1e1e1e] rounded-lg border border-dashed border-[#3d3d3d] my-6">
              <FontAwesomeIcon icon={faFileAlt} className="text-4xl text-[#4b5563] mb-3" />
              <h3 className="text-xl font-semibold text-[#f3f4f6] mb-2">No Job Posts Yet</h3>
              <p className="max-w-lg mx-auto mb-4 leading-relaxed">
                You haven't posted any jobs yet. Get started by creating your first job posting.
              </p>
              <button
                className="inline-flex items-center justify-center font-medium text-[0.9375rem] rounded-lg px-4 py-2 transition-all duration-200 border border-transparent gap-2 whitespace-nowrap cursor-pointer bg-purple-600 text-white hover:bg-purple-500"
                onClick={() => setActiveTab('post-job')}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Post a Job</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-[#121212] rounded-lg border border-[#2d2d2d] mb-6 overflow-hidden transition-all duration-200 hover:border-[#3d3d3d] hover:shadow-md p-6">
            <div className="border-b border-[#252525] mb-4 pb-3 flex justify-between items-center">
              <h2 className="m-0 text-[1.125rem] font-semibold text-[#f3f4f6] flex items-center gap-3">
                <FontAwesomeIcon icon={faClipboardList} />
                <span>Job Applications</span>
              </h2>
            </div>
            <div className="py-10 px-6 text-center text-[#d1d5db] bg-[#1e1e1e] rounded-lg border border-dashed border-[#3d3d3d] my-6">
              <FontAwesomeIcon icon={faInbox} className="text-4xl text-[#4b5563] mb-3" />
              <h3 className="text-xl font-semibold text-[#f3f4f6] mb-2">No Applications Yet</h3>
              <p className="max-w-lg mx-auto mb-4 leading-relaxed">
                Applications for your job postings will appear here once candidates start applying.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-[#121212] rounded-lg border border-[#2d2d2d] mb-6 overflow-hidden transition-all duration-200 hover:border-[#3d3d3d] hover:shadow-md p-6">
            <div className="border-b border-[#252525] mb-4 pb-3 flex justify-between items-center">
              <h2 className="m-0 text-[1.125rem] font-semibold text-[#f3f4f6] flex items-center gap-3">
                <FontAwesomeIcon icon={faChartLine} />
                <span>Job Post Analytics</span>
              </h2>
            </div>
            <div className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Jobs Posted', value: '0' },
                  { label: 'Total Applications', value: '0' },
                  { label: 'Application Rate', value: '0%' },
                  { label: 'Active Listings', value: '0' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#1e1e1e] rounded-lg p-4 border border-[#2d2d2d] text-center">
                    <div className="text-[1.875rem] font-bold text-purple-600 leading-[1.2] mb-2">{stat.value}</div>
                    <div className="text-[0.875rem] text-[#d1d5db] font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="py-10 px-6 text-center text-[#d1d5db] bg-[#1e1e1e] rounded-lg border border-dashed border-[#3d3d3d] my-6">
                <FontAwesomeIcon icon={faChartBar} className="text-4xl text-[#4b5563] mb-3" />
                <h3 className="text-xl font-semibold text-[#f3f4f6] mb-2">No Analytics Data Yet</h3>
                <p className="max-w-lg mx-auto mb-4 leading-relaxed">
                  Analytics data will be displayed here as you post jobs and receive applications.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'RecruiterProfile' && <Profile />}
        {activeTab === 'CompanyProfile' && <CompanyProfile />}
      </main>
    </div>
  );
};

export default EmployerDashboard;
