import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Briefcase, Users, TrendingUp, Award } from 'lucide-react';
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
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.6 },
    }),
  };

  const features = [
    { icon: Briefcase, label: 'Lowongan Terbaru', value: '50+' },
    { icon: Users, label: 'Pelamar Aktif', value: '5K+' },
    { icon: TrendingUp, label: 'Tingkat Keberhasilan', value: '85%' },
    { icon: Award, label: 'Perusahaan Terpercaya', value: 'BMI' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-bmi-navy via-bmi-blue to-bmi-soft">
      <Navbar showAuth={false} />

      <div className="relative min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Wave Elements */}
        <div className="absolute inset-0 -z-10">
          <svg className="absolute top-0 left-0 w-full opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,138.7C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-white z-10"
            >
              <motion.div
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3 mb-6"
              >
                <img src="/logo-bmi.png" alt="BMI Logo" className="h-12 w-auto" />
              </motion.div>

              <motion.h1
                custom={1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              >
                Mulai Karir Impian Anda
              </motion.h1>

              <motion.p
                custom={2}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-white/80 text-lg mb-8 leading-relaxed"
              >
                Bergabunglah dengan ribuan profesional yang telah menemukan peluang karir terbaik mereka bersama PT Bumi Menara Internusa. Jelajahi lowongan pekerjaan di industri seafood dan ekspor terkemuka Indonesia.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                      <Icon size={24} className="mb-2 text-bmi-cyan" />
                      <p className="text-sm text-white/80 mb-1">{feature.label}</p>
                      <p className="text-2xl font-bold text-white">{feature.value}</p>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right - Login Card */}
            <motion.div
              className="lg:sticky lg:top-1/2 lg:-translate-y-1/2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-bmi-navy to-bmi-blue p-8 text-white">
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-2xl font-bold"
                  >
                    Masuk ke Akun
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-white/80 text-sm mt-2"
                  >
                    Gunakan email dan kata sandi Anda
                  </motion.p>
                </div>

                {/* Form */}
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <motion.div
                      custom={1}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-semibold text-bmi-navy mb-3">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                          }}
                          placeholder="nama@email.com"
                          className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
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
                      custom={2}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
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
                            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                          }}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-12 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-bmi-navy"
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
                      custom={3}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center justify-between"
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300"
                        />
                        <span className="text-sm text-slate-700">Ingat saya</span>
                      </label>
                      <a href="#" className="text-sm text-bmi-blue hover:text-bmi-navy font-semibold">
                        Lupa kata sandi?
                      </a>
                    </motion.div>

                    {/* Login Button */}
                    <motion.div
                      custom={4}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full justify-center bg-gradient-to-r from-bmi-navy to-bmi-blue"
                      >
                        {loading ? 'Sedang Masuk...' : 'Masuk'}
                      </Button>
                    </motion.div>
                  </form>

                  {/* Divider */}
                  <motion.div
                    custom={5}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative my-6"
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 bg-white text-slate-600 text-sm">atau</span>
                    </div>
                  </motion.div>

                  {/* Register Link */}
                  <motion.div
                    custom={6}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center text-sm text-slate-700"
                  >
                    Belum memiliki akun?{' '}
                    <Link to="/register" className="text-bmi-blue font-semibold hover:text-bmi-navy transition">
                      Daftar sekarang
                    </Link>
                  </motion.div>
                </div>

                {/* Footer with Career Search Button */}
                <div className="bg-bmi-soft/50 px-8 py-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center text-bmi-blue border-bmi-blue hover:bg-bmi-cyan/10"
                    onClick={() => navigate('/jobs')}
                  >
                    Cari Lowongan Karir
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
