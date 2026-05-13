import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { KeyRound, ShieldCheck, AlertCircle, Save } from 'lucide-react';
import Navbar from '../../components/Navbar';
import SectionCard from '../../components/forms/SectionCard';
import InputField from '../../components/forms/InputField';
import Button from '../../components/Button';
import api from '../../axios';

const schema = yup.object().shape({
  current_password: yup.string().required('Kata sandi saat ini wajib diisi'),
  new_password: yup.string().min(8, 'Kata sandi baru minimal 8 karakter').required('Kata sandi baru wajib diisi'),
  new_password_confirmation: yup.string()
    .oneOf([yup.ref('new_password'), null], 'Konfirmasi kata sandi tidak cocok')
    .required('Konfirmasi kata sandi wajib diisi'),
});

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    setSuccessMsg('');
    try {
      await api.put('/user/password', data);
      setSuccessMsg('Kata sandi Anda berhasil diperbarui.');
      reset();
    } catch (error) {
      setServerError(
        error.response?.data?.message || 'Terjadi kesalahan saat memperbarui kata sandi.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar showAuth={true} userRole="applicant" />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bmi-navy mb-2">Pengaturan Akun</h1>
          <p className="text-slate-500">Kelola keamanan dan kata sandi akun Anda di sini.</p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2">
            <AlertCircle size={18} />
            {serverError}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium flex items-center gap-2">
            <ShieldCheck size={18} />
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionCard title="Ubah Kata Sandi" icon={KeyRound} description="Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.">
            <div className="space-y-5 max-w-xl">
              <InputField
                label="Kata Sandi Saat Ini"
                type="password"
                placeholder="••••••••"
                {...register('current_password')}
                error={errors.current_password?.message}
                required
              />
              
              <InputField
                label="Kata Sandi Baru"
                type="password"
                placeholder="Minimal 8 karakter"
                {...register('new_password')}
                error={errors.new_password?.message}
                required
              />
              
              <InputField
                label="Konfirmasi Kata Sandi Baru"
                type="password"
                placeholder="Ulangi kata sandi baru"
                {...register('new_password_confirmation')}
                error={errors.new_password_confirmation?.message}
                required
              />

              <div className="pt-4">
                <Button type="submit" disabled={loading} className="w-full sm:w-auto px-8 gap-2">
                  {loading ? 'Menyimpan...' : <><Save size={18} /> Simpan Kata Sandi</>}
                </Button>
              </div>
            </div>
          </SectionCard>
        </form>
      </div>
    </div>
  );
}
