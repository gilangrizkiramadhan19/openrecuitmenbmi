import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import ApplicantDashboard from "./pages/dashboard/ApplicantDashboard";
import CompleteProfile from "./pages/dashboard/CompleteProfile";
import Settings from "./pages/dashboard/Settings";
import MyApplications from "./pages/dashboard/MyApplications";
import HRDLoginPage from "./pages/auth/HRDLoginPage"; // <-- FIXED PATH
import HRDDashboard from "./pages/dashboard/HRDDashboard";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/dashboard/profile" element={<CompleteProfile />} />
        <Route path="/dashboard/applicant" element={<ApplicantDashboard />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/applications" element={<MyApplications />} />

        {/* HRD/Admin Internal Routes */}
        <Route path="/hrd/login" element={<HRDLoginPage />} />
        <Route path="/dashboard/hrd" element={<HRDDashboard />} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
