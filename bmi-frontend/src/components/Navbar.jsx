import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ showAuth = true, userRole = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo-bmi.png" alt="BMI Logo" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-bmi-navy">BMI Recruitment</span>
              <p className="text-xs text-slate-600">Bumi Menara Internusa</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {userRole ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 text-slate-700 hover:text-bmi-navy transition"
                  >
                    <div className="w-8 h-8 bg-bmi-blue rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      U
                    </div>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 py-2 overflow-hidden">
                      <Link to="/dashboard/profile" onClick={() => setProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-bmi-blue flex items-center gap-3 transition-colors">
                        <User size={18} />
                        Profil Saya
                      </Link>
                      <Link to="/dashboard/applications" onClick={() => setProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-bmi-blue flex items-center gap-3 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        Riwayat Lamaran
                      </Link>
                      <Link to="/dashboard/settings" onClick={() => setProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-bmi-blue flex items-center gap-3 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        Pengaturan Sandi
                      </Link>
                      <button
                        onClick={() => { setProfileOpen(false); handleLogout(); }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3 border-t border-slate-100 transition-colors"
                      >
                        <LogOut size={18} />
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              showAuth && (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="px-6 py-2 text-bmi-navy font-medium hover:bg-bmi-soft rounded-lg transition-all duration-200"
                  >
                    Masuk
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/register"
                      className="px-6 py-2 bg-gradient-to-r from-bmi-navy to-bmi-blue text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      Lamar Sekarang
                    </Link>
                  </motion.div>
                </div>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-bmi-soft rounded-lg transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {userRole ? (
              <>
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-bmi-soft rounded flex items-center gap-2">
                  <User size={16} />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              showAuth && (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-bmi-navy font-medium hover:bg-bmi-soft rounded transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 bg-bmi-navy text-white font-medium rounded hover:bg-bmi-blue transition"
                  >
                    Apply Now
                  </Link>
                </>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
