import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Briefcase, Users, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import InputField from '../../components/forms/InputField';
import api from '../../axios';

const schema = yup.object().shape({
  email: yup.string().email('Format email tidak valid').required('Email wajib diisi'),
  password: yup.string().required('Kata sandi wajib diisi'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      const response = await api.post('/login', data);
      // Store token
      localStorage.setItem('token', response.data.token);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      // Redirect to applicant dashboard (interceptor handles further redirects if needed)
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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({ opacity: 1, y: 0, transition: { delay: custom * 0.1, duration: 0.6 } }),
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
        {/* Background Wave */}
        <div className="absolute inset-0 -z-10">
          <svg className="absolute top-0 left-0 w-full opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,138.7C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-white z-10">
              <motion.img custom={0} variants={itemVariants} src="/logo-bmi.png" alt="BMI Logo" className="h-12 w-auto mb-6" />
              <motion.h1 custom={1} variants={itemVariants} className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Mulai Karir Impian Anda
              </motion.h1>
              <motion.p custom={2} variants={itemVariants} className="text-white/80 text-lg mb-8 leading-relaxed">
                Bergabunglah dengan ribuan profesional yang telah menemukan peluang karir terbaik mereka bersama PT Bumi Menara Internusa.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="grid grid-cols-2 gap-4">
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
            <motion.div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2" variants={containerVariants} initial="hidden" animate="visible">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-bmi-navy to-bmi-blue p-8 text-white relative">
                  <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                  <h2 className="text-3xl font-bold relative z-10">Masuk ke Akun</h2>
                  <p className="text-white/80 text-sm mt-2 relative z-10">Selamat datang kembali! Silakan masukkan email dan sandi.</p>
                </div>

                <div className="p-8">
                  {serverError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2">
                      <AlertCircle size={18} />
                      {serverError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <InputField
                      label="Alamat Email"
                      icon={Mail}
                      type="email"
                      placeholder="nama@email.com"
                      {...register('email')}
                      error={errors.email?.message}
                      required
                    />
                    
                    <InputField
                      label="Kata Sandi"
                      icon={Lock}
                      type="password"
                      placeholder="••••••••"
                      {...register('password')}
                      error={errors.password?.message}
                      required
                    />

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-bmi-navy focus:ring-bmi-navy" />
                        <span className="text-sm text-slate-700 font-medium">Ingat saya</span>
                      </label>
                      <a href="#" className="text-sm text-bmi-blue hover:text-bmi-navy font-bold transition-colors">
                        Lupa kata sandi?
                      </a>
                    </div>

                    <div className="pt-4">
                      <Button type="submit" size="lg" disabled={loading} className="w-full justify-center shadow-lg shadow-bmi-blue/20">
                        {loading ? 'Sedang Memeriksa...' : 'Masuk Sekarang'}
                      </Button>
                    </div>
                  </form>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                    <div className="relative flex justify-center"><span className="px-4 bg-white text-slate-500 text-sm font-medium">Atau</span></div>
                  </div>

                  <p className="text-center text-sm text-slate-600 font-medium">
                    Belum memiliki akun?{' '}
                    <Link to="/register" className="text-bmi-blue font-bold hover:text-bmi-navy transition-colors">
                      Daftar Karir
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
