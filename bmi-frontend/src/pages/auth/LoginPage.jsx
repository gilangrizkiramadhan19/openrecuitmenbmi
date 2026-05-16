import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import api from '../../axios';

const schema = yup.object().shape({
  email: yup.string().email('Format email tidak valid').required('Email wajib diisi'),
  password: yup.string().required('Kata sandi wajib diisi'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      const response = await api.post('/login', data);
      localStorage.setItem('token', response.data.token);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      navigate('/dashboard/applicant');
    } catch (error) {
      setServerError(
        error.response?.data?.message || 'Email atau kata sandi salah. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Form Card */}
          <motion.div
            className="glass rounded-2xl p-8 md:p-10 border border-white/40 shadow-glass"
            whileHover={{ boxShadow: '0 8px 32px rgba(31, 41, 55, 0.15)' }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              variants={itemVariants}
              custom={0}
            >
              <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Masuk ke Akun Anda
              </h1>
              <p className="text-neutral-600">
                Lanjutkan perjalanan karir Anda bersama BMI
              </p>
            </motion.div>

            {/* Server Error Alert */}
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Alert
                  type="error"
                  message={serverError}
                  dismissible
                  onDismiss={() => setServerError('')}
                />
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <motion.div variants={itemVariants} custom={1}>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    {...register('email')}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 border border-neutral-200 rounded-lg focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-neutral-400"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-error mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants} custom={2}>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">
                  Kata Sandi
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className="w-full pl-12 pr-12 py-3 bg-white/50 border border-neutral-200 rounded-lg focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-error mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password.message}
                  </p>
                )}
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div
                variants={itemVariants}
                custom={3}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-neutral-300" />
                  <span className="text-neutral-600">Ingat saya</span>
                </label>
                <Link
                  to="#"
                  className="text-primary hover:text-primary-600 font-medium transition"
                >
                  Lupa password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} custom={4} className="pt-4">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={loading}
                  disabled={loading}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Masuk
                </Button>
              </motion.div>

              {/* Divider */}
              <motion.div variants={itemVariants} custom={5} className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 text-neutral-500 bg-white/60">
                    Belum punya akun?
                  </span>
                </div>
              </motion.div>

              {/* Register Link */}
              <motion.div variants={itemVariants} custom={6}>
                <Link to="/register" className="w-full block">
                  <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    size="lg"
                  >
                    Daftar Sekarang
                  </Button>
                </Link>
              </motion.div>
            </form>

            {/* HR Login Link */}
            <motion.div
              variants={itemVariants}
              custom={7}
              className="mt-8 pt-6 border-t border-neutral-200 text-center"
            >
              <p className="text-sm text-neutral-600 mb-3">
                Anda HR dari BMI?
              </p>
              <Link
                to="/login/hrd"
                className="inline-block text-sm font-semibold text-primary hover:text-primary-600 transition"
              >
                Masuk sebagai HRD →
              </Link>
            </motion.div>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            variants={itemVariants}
            custom={8}
            className="mt-8 text-center text-sm text-neutral-600"
          >
            <p>
              Dengan masuk, Anda setuju dengan{' '}
              <a href="#" className="text-primary hover:underline">
                Syarat & Ketentuan
              </a>
              {' '}kami
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
