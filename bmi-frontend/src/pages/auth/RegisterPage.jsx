import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import InputField from '../../components/forms/InputField';
import api from '../../axios';

const schema = yup.object().shape({
  name: yup.string().required('Nama lengkap wajib diisi'),
  email: yup.string().email('Format email tidak valid').required('Email wajib diisi'),
  password: yup.string().min(8, 'Password minimal 8 karakter').required('Password wajib diisi'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Konfirmasi password tidak cocok')
    .required('Konfirmasi password wajib diisi'),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      await api.post('/register', data);
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bmi-navy via-bmi-blue to-bmi-soft flex flex-col">
      <Navbar showAuth={false} />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-bmi-navy to-bmi-blue px-8 py-10 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <img src="/logo-bmi.png" alt="BMI Logo" className="h-12 mx-auto mb-6 relative z-10" />
                <h1 className="text-3xl font-bold mb-2 relative z-10">Buat Akun Pelamar</h1>
                <p className="text-white/80 relative z-10">Satu langkah menuju karir impian Anda di BMI.</p>
              </div>

              <div className="p-8 md:p-10">
                {serverError && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium">
                    {serverError}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <InputField
                    label="Nama Lengkap"
                    icon={User}
                    placeholder="Sesuai KTP"
                    {...register('name')}
                    error={errors.name?.message}
                    required
                  />

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
                    placeholder="Minimal 8 karakter"
                    {...register('password')}
                    error={errors.password?.message}
                    required
                  />

                  <InputField
                    label="Konfirmasi Kata Sandi"
                    icon={Lock}
                    type="password"
                    placeholder="Ulangi kata sandi"
                    {...register('password_confirmation')}
                    error={errors.password_confirmation?.message}
                    required
                  />

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full py-4 text-lg rounded-xl shadow-lg shadow-bmi-blue/30 flex justify-center items-center gap-2 group"
                      disabled={loading}
                    >
                      {loading ? 'Memproses...' : 'Daftar Sekarang'}
                      {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </div>
                </form>

                <p className="text-center text-slate-600 mt-8 font-medium">
                  Sudah memiliki akun?{' '}
                  <Link to="/login" className="text-bmi-blue hover:text-bmi-navy transition-colors">
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md bg-white rounded-[2rem] p-10 text-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={60} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-bmi-navy mb-4">Registrasi Berhasil!</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Akun Anda telah berhasil dibuat. Anda akan dialihkan ke halaman login dalam beberapa saat.
              </p>
              <Button onClick={() => navigate('/login')} className="w-full">
                Masuk Sekarang
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
