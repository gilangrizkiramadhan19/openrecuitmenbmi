import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap diperlukan';
    }
    if (!formData.email) {
      newErrors.email = 'Email diperlukan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Nomor telepon diperlukan';
    }
    if (!formData.password) {
      newErrors.password = 'Kata sandi diperlukan';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Kata sandi minimal 8 karakter';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi kata sandi diperlukan';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Kata sandi tidak cocok';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Anda harus menyetujui syarat dan ketentuan';
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
    // TODO: Implement actual registration API call
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.6 },
    }),
  };

  return (
    <div className="min-h-screen bg-bmi-soft">
      <Navbar showAuth={false} />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-bmi-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-bmi-blue/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="w-full max-w-2xl"
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
                <h1 className="text-3xl font-bold mb-2">Daftar Akun Baru</h1>
                <p className="text-white/80 text-sm">Mulai aplikasi karir Anda hari ini</p>
              </motion.div>
            </div>

            {/* Form */}
            {!success ? (
              <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <motion.div
                    custom={0}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="block text-sm font-semibold text-bmi-navy mb-3">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Nama lengkap Anda"
                        className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors text-slate-900 placeholder-slate-400"
                      />
                    </div>
                    {errors.fullName && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        {errors.fullName}
                      </div>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    custom={1}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="block text-sm font-semibold text-bmi-navy mb-3">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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

                  {/* Phone */}
                  <motion.div
                    custom={2}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="block text-sm font-semibold text-bmi-navy mb-3">
                      Nomor Telepon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+62 812 3456 7890"
                        className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors text-slate-900 placeholder-slate-400"
                      />
                    </div>
                    {errors.phone && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        {errors.phone}
                      </div>
                    )}
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    custom={3}
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
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

                  {/* Confirm Password */}
                  <motion.div
                    custom={4}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="block text-sm font-semibold text-bmi-navy mb-3">
                      Konfirmasi Kata Sandi
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors text-slate-900 placeholder-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-bmi-navy transition"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        {errors.confirmPassword}
                      </div>
                    )}
                  </motion.div>

                  {/* Terms & Conditions */}
                  <motion.div
                    custom={5}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-2 border-slate-300 text-bmi-navy focus:ring-2 focus:ring-bmi-cyan mt-1 flex-shrink-0"
                      />
                      <span className="text-slate-700 text-sm">
                        Saya setuju dengan{' '}
                        <a href="#" className="text-bmi-blue font-semibold hover:underline">
                          Syarat Layanan
                        </a>
                        {' dan '}
                        <a href="#" className="text-bmi-blue font-semibold hover:underline">
                          Kebijakan Privasi
                        </a>
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        {errors.agreeTerms}
                      </div>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    custom={6}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full justify-center"
                    >
                      {loading ? 'Mendaftarkan...' : 'Buat Akun'}
                    </Button>
                  </motion.div>

                  {/* Sign In Link */}
                  <motion.div
                    custom={7}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center text-sm text-slate-700"
                  >
                    Sudah memiliki akun?{' '}
                    <Link to="/login" className="text-bmi-blue font-semibold hover:text-bmi-navy transition">
                      Masuk di sini
                    </Link>
                  </motion.div>
                </form>
              </div>
            ) : (
              /* Success Message */
              <div className="p-8 md:p-10 flex flex-col items-center justify-center min-h-96">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
                >
                  <Check size={32} className="text-green-600" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-2xl font-bold text-bmi-navy mb-2 text-center"
                >
                  Pendaftaran Berhasil!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-slate-700 text-center mb-6"
                >
                  Silakan login dengan email dan kata sandi Anda untuk memulai aplikasi karir.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="w-full max-w-xs"
                >
                  <Button
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => navigate('/login')}
                  >
                    Lanjut ke Login
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Footer */}
            {!success && (
              <div className="bg-bmi-soft/50 px-8 py-4 border-t border-slate-100">
                <p className="text-xs text-slate-600 text-center">
                  Data Anda dilindungi dengan enkripsi tingkat enterprise
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
