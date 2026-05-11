import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function CompleteProfilePage() {
  const [step, setStep] = useState(1);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    noHandphone: '',
    noHandphoneAlt: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    agama: '',
    statusPerkawinan: '',
    noKtp: '',
    pendidikanTerakhir: '',
    alamat: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    rtRw: '',
    kodePos: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const requiredFields = ['namaLengkap', 'email', 'noHandphone', 'tempatLahir', 'tanggalLahir', 'jenisKelamin', 'agama', 'statusPerkawinan', 'noKtp', 'pendidikanTerakhir', 'alamat'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'Field wajib diisi';
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }

    if (formData.noHandphone && !/^0\d{9,}$/.test(formData.noHandphone)) {
      newErrors.noHandphone = 'Nomor handphone tidak valid (mulai dengan 0)';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setStep(2);
      return;
    }

    if (!agreePrivacy) {
      setErrors({ privacy: 'Anda harus menyetujui kebijakan privasi' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      localStorage.setItem('profileCompleted', 'true');
      setTimeout(() => {
        window.location.href = '/dashboard/applicant';
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bmi-navy via-bmi-blue to-bmi-soft">
        <Navbar showAuth={false} />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={48} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Profil Lengkap!</h2>
            <p className="text-white/80">Anda sekarang dapat melihat semua lowongan karir</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bmi-navy via-bmi-blue to-bmi-soft">
      <Navbar showAuth={false} />

      <div className="relative min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? 'bg-blue-600' : 'bg-slate-600'}`}>
                  {step > 1 ? <Check size={20} /> : '1'}
                </div>
                <span className="text-white">Data Pribadi</span>
              </div>
              <div className="flex-1 h-1 bg-white/20 mx-4">
                <motion.div
                  animate={{ width: step === 1 ? '0%' : '100%' }}
                  className="h-full bg-blue-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${step >= 2 ? 'bg-blue-600' : 'bg-slate-600'}`}>
                  2
                </div>
                <span className="text-white">Persetujuan</span>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-bmi-navy to-bmi-blue p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">
                {step === 1 ? 'Lengkapi Data Profil Anda' : 'Verifikasi & Persetujuan'}
              </h1>
              <p className="text-white/80">
                {step === 1 
                  ? 'Mohon isi semua informasi yang diperlukan dengan lengkap dan akurat'
                  : 'Silakan baca dan setujui kebijakan privasi kami'}
              </p>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-8 md:p-10">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  {/* Informasi Profil */}
                  <div>
                    <h3 className="text-lg font-semibold text-bmi-navy mb-4 pb-2 border-b-2 border-bmi-blue/30">Informasi Profil</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Nama Lengkap (sesuai KTP) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="namaLengkap"
                          value={formData.namaLengkap}
                          onChange={handleChange}
                          placeholder="Ketik nama lengkap"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                        {errors.namaLengkap && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.namaLengkap}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Informasi Kontak */}
                  <div>
                    <h3 className="text-lg font-semibold text-bmi-navy mb-4 pb-2 border-b-2 border-bmi-blue/30">Informasi Kontak</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                        {errors.email && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          No Handphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="noHandphone"
                          value={formData.noHandphone}
                          onChange={handleChange}
                          placeholder="Contoh: 0819999999"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                        {errors.noHandphone && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.noHandphone}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          No Handphone Alternatif
                        </label>
                        <input
                          type="tel"
                          name="noHandphoneAlt"
                          value={formData.noHandphoneAlt}
                          onChange={handleChange}
                          placeholder="Contoh: 0819999999"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informasi Personal */}
                  <div>
                    <h3 className="text-lg font-semibold text-bmi-navy mb-4 pb-2 border-b-2 border-bmi-blue/30">Informasi Personal</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Tempat Lahir <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="tempatLahir"
                          value={formData.tempatLahir}
                          onChange={handleChange}
                          placeholder="Ketik tempat lahir"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                        {errors.tempatLahir && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.tempatLahir}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Tanggal Lahir <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="tanggalLahir"
                          value={formData.tanggalLahir}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                        {errors.tanggalLahir && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.tanggalLahir}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Jenis Kelamin <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="jenisKelamin"
                          value={formData.jenisKelamin}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        >
                          <option value="">Pilih jenis kelamin</option>
                          <option value="laki-laki">Laki-laki</option>
                          <option value="perempuan">Perempuan</option>
                        </select>
                        {errors.jenisKelamin && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.jenisKelamin}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Agama <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="agama"
                          value={formData.agama}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        >
                          <option value="">Pilih agama</option>
                          <option value="islam">Islam</option>
                          <option value="kristen">Kristen</option>
                          <option value="katolik">Katolik</option>
                          <option value="hindu">Hindu</option>
                          <option value="buddha">Buddha</option>
                          <option value="konghucu">Konghucu</option>
                        </select>
                        {errors.agama && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.agama}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Status Perkawinan <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="statusPerkawinan"
                          value={formData.statusPerkawinan}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        >
                          <option value="">Pilih status perkawinan</option>
                          <option value="belum-menikah">Belum Menikah</option>
                          <option value="menikah">Menikah</option>
                          <option value="cerai">Cerai</option>
                        </select>
                        {errors.statusPerkawinan && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.statusPerkawinan}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          No. KTP <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="noKtp"
                          value={formData.noKtp}
                          onChange={handleChange}
                          placeholder="Ketik No KTP"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                        {errors.noKtp && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.noKtp}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Pendidikan Terakhir <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="pendidikanTerakhir"
                          value={formData.pendidikanTerakhir}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        >
                          <option value="">Pilih pendidikan terakhir</option>
                          <option value="smp">SMP</option>
                          <option value="sma">SMA</option>
                          <option value="d3">D3</option>
                          <option value="s1">S1</option>
                          <option value="s2">S2</option>
                          <option value="s3">S3</option>
                        </select>
                        {errors.pendidikanTerakhir && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.pendidikanTerakhir}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Alamat */}
                  <div>
                    <h3 className="text-lg font-semibold text-bmi-navy mb-4 pb-2 border-b-2 border-bmi-blue/30">Alamat</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Alamat (sesuai KTP) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="alamat"
                          value={formData.alamat}
                          onChange={handleChange}
                          placeholder="Ketik alamat"
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                        {errors.alamat && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            {errors.alamat}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-bmi-navy mb-2">
                            Provinsi
                          </label>
                          <input
                            type="text"
                            name="provinsi"
                            value={formData.provinsi}
                            onChange={handleChange}
                            placeholder="Ketik provinsi"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-bmi-navy mb-2">
                            Kota
                          </label>
                          <input
                            type="text"
                            name="kota"
                            value={formData.kota}
                            onChange={handleChange}
                            placeholder="Ketik kota"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-bmi-navy mb-2">
                            Kecamatan
                          </label>
                          <input
                            type="text"
                            name="kecamatan"
                            value={formData.kecamatan}
                            onChange={handleChange}
                            placeholder="Ketik kecamatan"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-bmi-navy mb-2">
                            Kelurahan
                          </label>
                          <input
                            type="text"
                            name="kelurahan"
                            value={formData.kelurahan}
                            onChange={handleChange}
                            placeholder="Ketik kelurahan"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-bmi-navy mb-2">
                            RT/RW
                          </label>
                          <input
                            type="text"
                            name="rtRw"
                            value={formData.rtRw}
                            onChange={handleChange}
                            placeholder="Ketik RT/RW"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-bmi-navy mb-2">
                            Kode Pos
                          </label>
                          <input
                            type="text"
                            name="kodePos"
                            value={formData.kodePos}
                            onChange={handleChange}
                            placeholder="Ketik kode pos"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Media Sosial */}
                  <div>
                    <h3 className="text-lg font-semibold text-bmi-navy mb-4 pb-2 border-b-2 border-bmi-blue/30">Media Sosial (Opsional)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Username Instagram
                        </label>
                        <input
                          type="text"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleChange}
                          placeholder="Ketik username Instagram"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Link Facebook
                        </label>
                        <input
                          type="url"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleChange}
                          placeholder="Ketik link akun Facebook"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Username X (Twitter)
                        </label>
                        <input
                          type="text"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleChange}
                          placeholder="Ketik username X"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-bmi-navy mb-2">
                          Link LinkedIn
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          placeholder="Ketik link akun LinkedIn"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-bmi-blue focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Privacy Policy */}
                  <div className="bg-bmi-soft rounded-lg p-6 max-h-96 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-bmi-navy mb-4">KEBIJAKAN PRIVASI UNTUK PELAMAR KERJA</h3>
                    <h4 className="font-semibold text-bmi-navy mb-3">PT BUMI MENARA INTERNUSA Tbk</h4>
                    
                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                      <div>
                        <h5 className="font-semibold text-bmi-navy mb-2">A. PENDAHULUAN</h5>
                        <p>PT Bumi Menara Internusa Tbk ("BMI") berkomitmen untuk melindungi dan menjaga informasi/data tentang orang perseorangan yang teridentifikasi atau dapat diidentifikasi secara tersendiri atau dikombinasi dengan informasi lainnya baik secara langsung maupun tidak langsung melalui sistem elektronik atau nonelektronik ("Data Pribadi"). Hal ini tentunya sesuai dengan ketentuan sebagaimana diatur dalam Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi.</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-bmi-navy mb-2">B. PERNYATAAN PERSETUJUAN</h5>
                        <p>Kebijakan Privasi untuk Pelamar Kerja ini ("Kebijakan Privasi") merupakan standar yang diterapkan oleh BMI dalam melakukan pemrosesan atas Data Pribadi Pelamar Kerja ("Data Pribadi Pelamar Kerja") dengan tetap memperhatikan prinsip-prinsip pemrosesan Data Pribadi sesuai dengan ketentuan yang berlaku.</p>
                      </div>

                      <div>
                        <p>Dengan mencentang kotak di bawah, Anda menyatakan bahwa:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Anda memberikan persetujuan kepada BMI untuk memproses Data Pribadi Anda sesuai dengan Kebijakan Privasi ini</li>
                          <li>Anda telah membaca, memahami, dan menyetujui semua ketentuan dalam Kebijakan Privasi ini</li>
                          <li>Anda memahami bahwa data Anda akan digunakan untuk proses rekrutmen dan seleksi karir</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <label className="flex items-start gap-4 cursor-pointer p-4 border-2 border-slate-200 rounded-lg hover:bg-bmi-soft transition">
                      <input
                        type="checkbox"
                        checked={agreePrivacy}
                        onChange={(e) => {
                          setAgreePrivacy(e.target.checked);
                          if (errors.privacy) {
                            setErrors(prev => ({ ...prev, privacy: '' }));
                          }
                        }}
                        className="w-6 h-6 text-bmi-blue border-slate-300 rounded focus:ring-2 focus:ring-bmi-blue mt-1 flex-shrink-0"
                      />
                      <span className="text-slate-700">
                        Saya telah membaca dan menyetujui <span className="font-semibold">Kebijakan Privasi untuk Pelamar Kerja PT Bumi Menara Internusa Tbk</span> ini.
                      </span>
                    </label>

                    {errors.privacy && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        {errors.privacy}
                      </div>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">Penting:</span> Dengan menyetujui kebijakan ini, Anda memberikan izin kepada BMI untuk memproses data pribadi Anda dalam rangka proses rekrutmen dan seleksi karir.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 justify-between mt-8 pt-8 border-t-2 border-slate-200">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-8 py-3 border-2 border-bmi-navy text-bmi-navy rounded-lg font-semibold hover:bg-bmi-soft transition-all"
                  >
                    Kembali
                  </button>
                )}
                <div className="flex-1"></div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-bmi-navy to-bmi-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Memproses...' : step === 1 ? 'Lanjutkan' : 'Setujui & Selesai'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
