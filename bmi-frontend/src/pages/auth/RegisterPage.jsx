import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Name+Email, 2: Verification+Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap sesuai KTP diperlukan';
    }
    if (!formData.email) {
      newErrors.email = 'Email diperlukan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!verificationCode.trim()) {
      newErrors.verificationCode = 'Kode verifikasi diperlukan';
    } else if (verificationCode.length !== 6) {
      newErrors.verificationCode = 'Kode verifikasi harus 6 digit';
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
    return newErrors;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep1();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 1000);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep2();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.6 },
    }),
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bmi-navy via-bmi-blue to-bmi-soft">
        <Navbar showAuth={false} />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={48} className="text-green-600" />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Akun Berhasil Dibuat!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/80 mb-6"
            >
              Silakan login dengan email dan kata sandi Anda
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bmi-navy via-bmi-blue to-bmi-soft">
      <Navbar showAuth={false} />

      <div className="relative min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Wave */}
        <div className="absolute inset-0 -z-10">
          <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,138.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                {[1, 2].map(s => (
                  <div key={s} className="flex flex-col items-center flex-1">
                    <motion.div
                      animate={{
                        scale: step >= s ? 1.1 : 1,
                        backgroundColor: step >= s ? '#0056B3' : '#E2E8F0',
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-2 text-white font-bold"
                    >
                      {step > s ? <Check size={20} /> : s}
                    </motion.div>
                    <span className="text-xs text-white/70 text-center">
                      {s === 1 ? 'Data Pribadi' : 'Verifikasi & Password'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: step === 1 ? '50%' : '100%' }}
                  className="h-full bg-gradient-to-r from-bmi-navy to-bmi-blue"
                />
              </div>
            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-bmi-navy to-bmi-blue p-8 text-white">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img src="/logo-bmi.png" alt="BMI Logo" className="h-10 w-auto" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-2xl font-bold">
                    {step === 1 ? 'Buat Akun Baru' : 'Verifikasi Email'}
                  </h1>
                  <p className="text-white/80 text-sm mt-2">
                    {step === 1
                      ? 'Mulai perjalanan karir Anda bersama kami'
                      : 'Kami telah mengirim kode verifikasi ke email Anda'}
                  </p>
                </motion.div>
              </div>

              {/* Form */}
              <div className="p-8">
                {step === 1 ? (
                  <form onSubmit={handleStep1Submit} className="space-y-6">
                    {/* Full Name */}
                    <motion.div
                      custom={0}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-semibold text-bmi-navy mb-3">
                        Nama Lengkap (Sesuai KTP)
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Nama lengkap Anda"
                          className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
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

                    {/* Info Box */}
                    <motion.div
                      custom={2}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-bmi-cyan/10 border border-bmi-cyan/30 rounded-lg p-4"
                    >
                      <p className="text-sm text-bmi-navy">
                        Kami akan mengirimkan link verifikasi ke email Anda. Pastikan email yang Anda masukkan aktif dan mudah diakses.
                      </p>
                    </motion.div>

                    {/* Next Button */}
                    <motion.div
                      custom={3}
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
                        {loading ? 'Memproses...' : (
                          <span className="flex items-center justify-center gap-2">
                            Lanjutkan
                            <ArrowRight size={20} />
                          </span>
                        )}
                      </Button>
                    </motion.div>

                    {/* Login Link */}
                    <motion.div
                      custom={4}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-center text-sm text-slate-700"
                    >
                      Sudah punya akun?{' '}
                      <Link to="/login" className="text-bmi-blue font-semibold hover:text-bmi-navy transition">
                        Masuk di sini
                      </Link>
                    </motion.div>
                  </form>
                ) : (
                  <form onSubmit={handleStep2Submit} className="space-y-6">
                    {/* Email Display */}
                    <motion.div
                      custom={0}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-bmi-soft rounded-lg p-4 border border-slate-200"
                    >
                      <p className="text-xs text-slate-600 mb-1">Email tujuan:</p>
                      <p className="font-semibold text-bmi-navy">{formData.email}</p>
                    </motion.div>

                    {/* Verification Code */}
                    <motion.div
                      custom={1}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-semibold text-bmi-navy mb-3">
                        Kode Verifikasi (6 Digit)
                      </label>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => {
                          setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                          if (errors.verificationCode) setErrors(prev => ({ ...prev, verificationCode: '' }));
                        }}
                        placeholder="000000"
                        maxLength="6"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors text-center text-2xl font-mono tracking-widest"
                      />
                      {errors.verificationCode && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                          <AlertCircle size={16} />
                          {errors.verificationCode}
                        </div>
                      )}
                    </motion.div>

                    {/* Password */}
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
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
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

                    {/* Confirm Password */}
                    <motion.div
                      custom={3}
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
                          className="w-full pl-12 pr-12 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-bmi-navy"
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

                    {/* Submit Button */}
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
                        {loading ? 'Membuat Akun...' : 'Buat Akun'}
                      </Button>
                    </motion.div>

                    {/* Back Button */}
                    <motion.button
                      custom={5}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full py-2 text-bmi-blue hover:text-bmi-navy font-semibold text-sm transition"
                    >
                      Kembali
                    </motion.button>
                  </form>
                )}
              </div>

                {/* Footer */}
                <div className="bg-bmi-soft/50 px-8 py-4 border-t border-slate-100">
                  <p className="text-xs text-slate-600 text-center">
                    Data Anda dilindungi dengan enkripsi tingkat enterprise
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
