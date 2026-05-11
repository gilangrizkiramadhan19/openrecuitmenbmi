import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import JobsPage from './pages/JobsPage';
import ApplicantDashboard from './pages/dashboard/ApplicantDashboard';
import HRDLoginPage from './pages/hrd/HRDLoginPage';
import HRDDashboard from './pages/dashboard/HRDDashboard';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/dashboard/applicant" element={<ApplicantDashboard />} />

        {/* HRD/Admin Internal Routes */}
        <Route path="/hrd/login" element={<HRDLoginPage />} />
        <Route path="/dashboard/hrd" element={<HRDDashboard />} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
