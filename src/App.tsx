// Page imports from new structure
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import AboutPage from "./pages/AboutPage";
import BlogsPage from "./pages/BlogsPage";
import CareerPage from "./pages/CareerPage";
import ContactPage from "./pages/ContactPage";
import Error404Page from "./pages/Error404Page";
import { JobDetailPage } from "./pages/jobs/JobDetailPage";

// Component imports from new structure
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Layout from "./components/layout/Layout";

// Legacy imports (to be migrated)
import { LandingPageParent } from "./modules/landingpage/LandingPageParent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppDashboard from "./App/AppDashboard";
import SearchResults from "./modules/landingpage/LandingPageUppersec/UpperSection/UpperSectionSearchFeature/SearchResults";
import { Profile } from "./modules/profile/profile";
import EmployerDashboard from "./modules/employer/EmployerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPageParent />} />
          <Route path="/Blogs" element={<BlogsPage />} />
          <Route path="/aboutUs" element={<AboutPage />} />
          <Route path="/search-results" element={<SearchResults />} />
          {/* QueryUrl based search */}
          {/* <Route path="/jobs/:jobId" element={<JobApplicationPage />} /> */}
          <Route path="/job/:jobId" element={<JobDetailPage />} />
          <Route path="/Career" element={<CareerPage />} />
          <Route path="/privacy-policy" element={<LandingPageParent />} />
          <Route path="/contact-Us" element={<ContactPage />} />
          <Route path="/Browse_Jobs" element={<LandingPageParent />} />
        </Route>

        {/* Protected routes */}
        {/* Employer Dashboard */}
        <Route
          path="/employer"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployerDashboard />} />
          <Route path="profile" element={<EmployerDashboard />} />
          <Route path="jobs" element={<EmployerDashboard />} />
          <Route path="applications" element={<EmployerDashboard />} />
          <Route path="analytics" element={<EmployerDashboard />} />
        </Route>

        {/* App Dashboard */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AppDashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
