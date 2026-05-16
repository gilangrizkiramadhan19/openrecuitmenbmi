import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Lock, Phone, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import Badge from '../../components/Badge';
import api from '../../axios';

const schema = yup.object().shape({
  name: yup.string().required('Nama lengkap wajib diisi'),
  email: yup.string().email('Format email tidak valid').required('Email wajib diisi'),
  phone: yup.string().required('Nomor telepon wajib diisi'),
  password: yup.string().min(8, 'Password minimal 8 karakter').required('Password wajib diisi'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Konfirmasi password tidak cocok')
    .required('Konfirmasi password wajib diisi'),
  terms: yup
    .boolean()
    .oneOf([true], 'Anda harus menyetujui syarat dan ketentuan')
    .required(),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const password = watch('password');
  const passwordStrength = password
    ? password.length >= 12
      ? 'Kuat'
      : password.length >= 8
      ? 'Cukup'
      : 'Lemah'
    : null;

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      await api.post('/register', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          Object.values(error.response?.data?.errors || {}).flat()[0] ||
          'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
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
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        </div>

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              className="w-full max-w-md"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              exit={{ opacity: 0, scale: 0.95 }}
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
                  <div className="inline-block p-3 bg-success/10 rounded-lg mb-4">
                    <User className="w-6 h-6 text-success" />
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                    Buat Akun Pelamar
                  </h1>
                  <p className="text-neutral-600">
                    Daftar dan mulai lamaran Anda hari ini
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
                  {/* Full Name Field */}
                  <motion.div variants={itemVariants} custom={1}>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register('name')}
                        className="w-full pl-12 pr-4 py-3 bg-white/50 border border-neutral-200 rounded-lg focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-neutral-400"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-error mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={itemVariants} custom={2}>
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

                  {/* Phone Field */}
                  <motion.div variants={itemVariants} custom={3}>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Nomor Telepon
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition" />
                      <input
                        type="tel"
                        placeholder="+62 812 3456 7890"
                        {...register('phone')}
                        className="w-full pl-12 pr-4 py-3 bg-white/50 border border-neutral-200 rounded-lg focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-neutral-400"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-error mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Password Field */}
                  <motion.div variants={itemVariants} custom={4}>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Kata Sandi
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        {...register('password')}
                        className="w-full pl-12 pr-4 py-3 bg-white/50 border border-neutral-200 rounded-lg focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-neutral-400"
                      />
                    </div>
                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full transition-all ${
                              passwordStrength === 'Kuat'
                                ? 'bg-success w-full'
                                : passwordStrength === 'Cukup'
                                ? 'bg-warning w-2/3'
                                : 'bg-error w-1/3'
                            }`}
                            layoutId="strength"
                          />
                        </div>
                        <Badge
                          variant={
                            passwordStrength === 'Kuat'
                              ? 'success'
                              : passwordStrength === 'Cukup'
                              ? 'warning'
                              : 'error'
                          }
                          size="sm"
                        >
                          {passwordStrength}
                        </Badge>
                      </div>
                    )}
                    {errors.password && (
                      <p className="text-sm text-error mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.password.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Confirm Password Field */}
                  <motion.div variants={itemVariants} custom={5}>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Konfirmasi Kata Sandi
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        {...register('password_confirmation')}
                        className="w-full pl-12 pr-4 py-3 bg-white/50 border border-neutral-200 rounded-lg focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-neutral-400"
                      />
                    </div>
                    {errors.password_confirmation && (
                      <p className="text-sm text-error mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.password_confirmation.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Terms Agreement */}
                  <motion.div variants={itemVariants} custom={6}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register('terms')}
                        className="w-5 h-5 mt-0.5 rounded border-neutral-300 text-primary focus:ring-primary/20"
                      />
                      <span className="text-sm text-neutral-700">
                        Saya setuju dengan{' '}
                        <a href="#" className="text-primary hover:underline font-medium">
                          Syarat & Ketentuan
                        </a>
                        {' '}dan{' '}
                        <a href="#" className="text-primary hover:underline font-medium">
                          Kebijakan Privasi
                        </a>
                        {' '}BMI
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-sm text-error mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.terms.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants} custom={7} className="pt-4">
                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      isLoading={loading}
                      disabled={loading}
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Buat Akun
                    </Button>
                  </motion.div>

                  {/* Divider */}
                  <motion.div variants={itemVariants} custom={8} className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 text-neutral-500 bg-white/60">
                        Sudah punya akun?
                      </span>
                    </div>
                  </motion.div>

                  {/* Login Link */}
                  <motion.div variants={itemVariants} custom={9}>
                    <Link to="/login" className="w-full block">
                      <Button
                        type="button"
                        variant="outline"
                        fullWidth
                        size="lg"
                      >
                        Masuk Sekarang
                      </Button>
                    </Link>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              className="w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass rounded-2xl p-8 md:p-10 border border-white/40 shadow-glass text-center space-y-6">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="flex justify-center"
                >
                  <div className="p-4 bg-success/10 rounded-full">
                    <CheckCircle className="w-12 h-12 text-success" />
                  </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Pendaftaran Berhasil!
                  </h2>
                  <p className="text-neutral-600">
                    Akun Anda telah dibuat. Silakan masuk dengan email dan password Anda.
                  </p>
                </motion.div>

                {/* Countdown */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-neutral-500"
                >
                  Anda akan diarahkan ke halaman login dalam 3 detik...
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
