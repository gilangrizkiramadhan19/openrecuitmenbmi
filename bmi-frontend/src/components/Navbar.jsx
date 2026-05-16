import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, FileText, Settings, Bell, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dropdownVariants } from '../animations/variants';

const profileMenuItems = [
  {
    to: '/dashboard/profile',
    icon: User,
    label: 'Profil Saya',
  },
  {
    to: '/dashboard/applications',
    icon: FileText,
    label: 'Riwayat Lamaran',
  },
  {
    to: '/dashboard/settings',
    icon: Settings,
    label: 'Pengaturan Sandi',
  },
];

export default function Navbar({ showAuth = true, userRole = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Read user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userName = user?.name || user?.email || 'User';
  const userInitial = userName.charAt(0).toUpperCase();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/60'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src="/logo-bmi.png"
              alt="BMI Logo"
              className="h-10 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-bmi-navy leading-tight">BMI Recruitment</span>
              <p className="text-xs text-slate-500 leading-tight">Bumi Menara Internusa</p>
            </div>
          </Link>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {userRole ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Button */}
                <motion.button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-all duration-200 group"
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Avatar */}
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-br from-bmi-blue to-bmi-navy rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {userInitial}
                  </motion.div>
                  <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate hidden lg:block">
                    {userName}
                  </span>
                  <motion.div
                    animate={{ rotate: profileOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} className="text-slate-400" />
                  </motion.div>
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-100/80 py-2 overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="px-4 pt-2 pb-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-bmi-navy truncate">{userName}</p>
                        <p className="text-xs text-slate-500 capitalize">{userRole}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        {profileMenuItems.map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.to}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 + 0.1 }}
                            >
                              <Link
                                to={item.to}
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-bmi-soft hover:text-bmi-blue transition-all duration-150 group"
                              >
                                <Icon size={16} className="text-slate-400 group-hover:text-bmi-blue transition-colors" />
                                {item.label}
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-slate-100 pt-1 mt-1">
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          onClick={() => { setProfileOpen(false); handleLogout(); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-150"
                        >
                          <LogOut size={16} />
                          Keluar
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              showAuth && (
                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/login"
                      className="px-5 py-2 text-bmi-navy font-medium rounded-lg hover:bg-bmi-soft transition-all duration-200 text-sm"
                    >
                      Masuk
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/register"
                      className="btn-ripple px-5 py-2 bg-gradient-to-r from-bmi-navy to-bmi-blue text-white font-medium rounded-lg hover:shadow-lg hover:shadow-bmi-blue/20 transition-all duration-200 text-sm"
                    >
                      Lamar Sekarang
                    </Link>
                  </motion.div>
                </div>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-bmi-soft rounded-lg transition-colors"
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} className="text-bmi-navy" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} className="text-bmi-navy" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-slate-100"
            >
              <div className="py-3 space-y-1">
                {userRole ? (
                  <>
                    <div className="px-4 py-3 border-b border-slate-100 mb-2">
                      <p className="text-sm font-semibold text-bmi-navy">{userName}</p>
                      <p className="text-xs text-slate-500 capitalize">{userRole}</p>
                    </div>
                    {profileMenuItems.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.to}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <Link
                            to={item.to}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-bmi-soft hover:text-bmi-blue rounded-lg mx-2 transition-all"
                          >
                            <Icon size={16} className="text-slate-400" />
                            {item.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                    <div className="border-t border-slate-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg mx-2 transition-all"
                        style={{ width: 'calc(100% - 16px)' }}
                      >
                        <LogOut size={16} />
                        Keluar
                      </button>
                    </div>
                  </>
                ) : (
                  showAuth && (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2.5 text-bmi-navy font-medium hover:bg-bmi-soft rounded-lg mx-2 transition text-sm"
                      >
                        Masuk
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2.5 bg-bmi-navy text-white font-medium rounded-lg mx-2 hover:bg-bmi-blue transition text-sm text-center"
                      >
                        Lamar Sekarang
                      </Link>
                    </>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
