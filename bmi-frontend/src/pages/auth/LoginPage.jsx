import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = 'Email diperlukan';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email tidak valid';
    if (!password) newErrors.password = 'Kata sandi diperlukan';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // TODO: Implement actual login API call
    setTimeout(() => {
      navigate('/dashboard/applicant');
      setLoading(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-bmi-soft">
      <Navbar showAuth={false} />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px)] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-bmi-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-bmi-blue/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-premium border border-slate-200/50 overflow-hidden backdrop-blur-xl">
            {/* Header */}
            <div className="bg-gradient-to-br from-bmi-navy via-bmi-navy to-bmi-blue p-8 text-white">
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <img src="/logo-bmi.png" alt="BMI Logo" className="h-10 w-auto" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="text-3xl font-bold mb-2">Masuk ke Akun Anda</h1>
                <p className="text-white/80 text-sm">Kelola aplikasi karir Anda dengan mudah</p>
              </motion.div>
            </div>

            {/* Form */}
            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-bmi-navy mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors text-slate-900 placeholder-slate-400"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.email}
                    </div>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-bmi-navy mb-3">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: '' });
                      }}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors text-slate-900 placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-bmi-navy transition"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.password}
                    </div>
                  )}
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-2 border-slate-300 text-bmi-navy focus:ring-2 focus:ring-bmi-cyan"
                    />
                    <span className="text-slate-700">Ingat saya</span>
                  </label>
                  <a href="#" className="text-bmi-blue hover:text-bmi-navy font-semibold transition">
                    Lupa kata sandi?
                  </a>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full justify-center"
                  >
                    {loading ? 'Memproses...' : 'Masuk'}
                  </Button>
                </motion.div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-600">atau</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-center text-sm text-slate-700"
                >
                  Belum memiliki akun?{' '}
                  <Link to="/register" className="text-bmi-blue font-semibold hover:text-bmi-navy transition">
                    Daftar sekarang
                  </Link>
                </motion.div>
              </form>
            </div>

            {/* Footer */}
            <div className="bg-bmi-soft/50 px-8 py-4 border-t border-slate-100">
              <p className="text-xs text-slate-600 text-center">
                Dengan masuk, Anda menyetujui <a href="#" className="text-bmi-blue hover:underline">Kebijakan Privasi</a> dan{' '}
                <a href="#" className="text-bmi-blue hover:underline">Syarat Layanan</a> kami.
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <motion.div
            className="mt-8 text-center text-slate-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <p>Akses sebagai HRD? <a href="#" className="text-bmi-navy font-semibold hover:text-bmi-blue transition">Login HRD</a></p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
