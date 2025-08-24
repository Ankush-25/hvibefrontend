import { LandingPageParent } from "./landingpage/LandingPageParent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./signUp/SignUP";
import Blogs from "./Blogs/Blogs";
import Error404 from "./Error404";
import AboutUs from "./aboutPage/AboutUs";
import Login from "./login/Login";
import AppDashboard from "./App/AppDashboard";
import SearchResults from "./landingpage/LandingPageUppersec/UpperSection/UpperSectionSearchFeature/SearchResults";
import ProtectedRoute from "./components/ProtectedRoute";
import JobApplicationPage from "./pages/JobApplicationPage";
import { Profile } from "./profile/profile";
import Layout from "./components/layout";
import EmployerDashboard from "./EmployerDashboard/EmployerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPageParent />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/search-results" element={<SearchResults />} /> 
          {/* QueryUrl based search */}
          <Route path="/jobs/:jobId/apply" element={<JobApplicationPage />} />
          <Route path="/Career" element={<LandingPageParent />} />
          <Route path="/privacy-policy" element={<LandingPageParent />} />
          <Route path="/contact-Us" element={<LandingPageParent />} />
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
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
