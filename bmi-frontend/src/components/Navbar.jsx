import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ showAuth = true, userRole = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-bmi-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-lg font-bold text-bmi-navy">BMI Recruitment</span>
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
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-bmi-soft flex items-center gap-2">
                        <User size={16} />
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100"
                      >
                        <LogOut size={16} />
                        Logout
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
                    className="px-6 py-2 text-bmi-navy font-medium hover:bg-bmi-soft rounded-lg transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-bmi-navy text-white font-medium rounded-lg hover:bg-bmi-blue transition"
                  >
                    Apply Now
                  </Link>
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
