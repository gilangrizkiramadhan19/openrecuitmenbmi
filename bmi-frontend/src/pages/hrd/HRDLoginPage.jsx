import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HRDLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email diperlukan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email tidak valid';
    }
    if (!password) {
      newErrors.password = 'Kata sandi diperlukan';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // TODO: Implement actual HRD authentication
      navigate('/dashboard/hrd');
      setLoading(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.4 + custom * 0.1, duration: 0.6 },
    }),
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-transparent to-slate-950 pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#003366_1px,transparent_1px),linear-gradient(0deg,#003366_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top accent line */}
        <div className="absolute -top-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        {/* Login Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 border-b border-slate-700/50">
            <motion.div
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-6"
            >
              <img src="/logo-bmi.png" alt="BMI" className="h-8 w-auto" />
            </motion.div>

            <motion.div
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-2xl font-bold text-white mb-2">
                Sistem Manajemen Recruitment
              </h1>
              <p className="text-slate-400 text-sm">
                Portal Internal HRD/Admin
              </p>
            </motion.div>

            <motion.div
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg inline-block"
            >
              <p className="text-xs text-slate-300 font-mono">
                AKSES TERBATAS • INTERNAL USE ONLY
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div
                custom={3}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Email HRD
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="hrd@bmi.co.id"
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-800 focus:outline-none transition-colors"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    {errors.email}
                  </div>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                custom={4}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                    }}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-800 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    {errors.password}
                  </div>
                )}
              </motion.div>

              {/* Remember & Forgot */}
              <motion.div
                custom={5}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-slate-800 border border-slate-700 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-slate-400">Ingat saya</span>
                </label>
                <a href="#" className="text-blue-500 hover:text-blue-400 transition">
                  Lupa Kata Sandi?
                </a>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                custom={6}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
              </motion.button>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-slate-900/50 px-8 py-4 border-t border-slate-700/50 text-center">
            <p className="text-xs text-slate-500">
              © 2024 PT Bumi Menara Internusa • Internal System
            </p>
          </div>
        </div>

        {/* Security notice */}
        <motion.div
          custom={7}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 text-center text-xs text-slate-500"
        >
          <p>Sistem ini dilindungi dengan enkripsi enterprise-level.</p>
          <p>Akses tidak sah akan dicatat dan dilaporkan.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
