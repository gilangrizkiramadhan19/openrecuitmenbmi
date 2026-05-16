import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  ChevronLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  FileText,
  User
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../axios';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Application state
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState('');

  // Check auth
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isApplicant = user?.role === 'applicant';

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`);
        const data = await res.json();
        if (data.success) {
          setJob(data.data);
        } else {
          setError(data.message || 'Lowongan tidak ditemukan');
        }
      } catch (err) {
        console.error("Error fetching job details", err);
        setError('Gagal memuat detail lowongan');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (!isApplicant) {
      setApplyError('Hanya pelamar yang dapat mengirim lamaran.');
      return;
    }

    setApplying(true);
    setApplyError('');
    
    try {
      const response = await api.post(`/jobs/${id}/apply`);
      if (response.data.success) {
        setApplySuccess(true);
      }
    } catch (err) {
      setApplyError(err.response?.data?.message || 'Terjadi kesalahan saat mengirim lamaran.');
      
      // If error is related to incomplete profile (we'll assume 403 or specific message, but let's check profile completion generally)
      // Wait, if it says "sudah melamar", it's 400.
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <Navbar showAuth={!token} userRole={user?.role} />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <Navbar showAuth={!token} userRole={user?.role} />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <AlertCircle size={48} className="text-slate-400 mb-4" />
          <h2 className="text-2xl font-bold text-bmi-navy mb-2">{error || 'Lowongan tidak ditemukan'}</h2>
          <button onClick={() => navigate('/jobs')} className="text-bmi-blue hover:underline mt-4">
            Kembali ke daftar lowongan
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar showAuth={!token} userRole={user?.role} />
      
      {/* Header Banner */}
      <div className="bg-bmi-navy text-white pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <button 
            onClick={() => navigate('/jobs')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition"
          >
            <ChevronLeft size={20} /> Kembali ke pencarian
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-bmi-cyan mb-3 font-medium text-sm">
                <span className="px-3 py-1 bg-white/10 rounded-full">{job.department}</span>
                {job.status === 'Publish' || job.status === 'open' ? (
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Dibuka
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full">Ditutup</span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{job.title}</h1>
              <p className="text-lg text-white/80 flex items-center gap-2">
                <MapPin size={20} /> {job.location}
              </p>
            </div>
            
            <div className="shrink-0 flex items-center gap-4 text-white/90">
              <div className="text-right">
                <p className="text-sm text-white/60">Tipe Pekerjaan</p>
                <p className="font-semibold flex items-center gap-2 justify-end">
                  <Briefcase size={16} /> {job.type}
                </p>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div className="text-left">
                <p className="text-sm text-white/60">Sistem Kerja</p>
                <p className="font-semibold flex items-center gap-2">
                  <FileText size={16} /> {job.work_system || 'WFO'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 -mt-10 relative z-20 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Left Column (Main Details) */}
          <div className="md:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
            >
              <h3 className="text-xl font-bold text-bmi-navy mb-4">Deskripsi Pekerjaan</h3>
              <div className="prose prose-slate max-w-none text-slate-600 mb-8 whitespace-pre-wrap">
                {job.description}
              </div>

              <h3 className="text-xl font-bold text-bmi-navy mb-4">Kualifikasi</h3>
              <div className="prose prose-slate max-w-none text-slate-600 mb-8 whitespace-pre-wrap">
                {job.qualifications}
              </div>

              {job.benefits && (
                <>
                  <h3 className="text-xl font-bold text-bmi-navy mb-4">Benefit</h3>
                  <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap">
                    {job.benefits}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column (Sidebar & Action) */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="font-bold text-bmi-navy mb-4">Ringkasan</h3>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex gap-3">
                  <GraduationCap size={20} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Pendidikan Minimal</p>
                    <p>{job.min_education}</p>
                    {job.major && <p className="text-xs text-slate-500 mt-1">Jurusan: {job.major}</p>}
                  </div>
                </li>
                {job.min_age && (
                  <li className="flex gap-3">
                    <User size={20} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Usia Minimal</p>
                      <p>{job.min_age} Tahun</p>
                    </div>
                  </li>
                )}
                <li className="flex gap-3">
                  <Clock size={20} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Batas Lamaran</p>
                    <p>{new Date(job.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </li>
                {job.headcount && (
                  <li className="flex gap-3">
                    <Briefcase size={20} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Kebutuhan</p>
                      <p>{job.headcount} Orang</p>
                    </div>
                  </li>
                )}
              </ul>
            </motion.div>

            {user?.role !== 'hrd' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-bmi-navy to-bmi-blue rounded-2xl shadow-sm p-6 text-white text-center"
              >
              {applySuccess ? (
                <div className="py-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-300" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Lamaran Berhasil!</h3>
                  <p className="text-sm text-white/80 mb-6">Anda dapat memantau status lamaran ini di Dashboard Anda.</p>
                  <button 
                    onClick={() => navigate('/dashboard/applications')}
                    className="w-full py-3 bg-white text-bmi-navy font-bold rounded-xl hover:bg-slate-50 transition"
                  >
                    Lihat Riwayat Lamaran
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-xl mb-2">Tertarik?</h3>
                  <p className="text-sm text-white/80 mb-6">Kirimkan profil Anda segera sebelum batas waktu berakhir.</p>
                  
                  {applyError && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-100 flex items-start gap-2 text-left">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <p>{applyError}</p>
                    </div>
                  )}

                  <button 
                    onClick={handleApply}
                    disabled={applying || job.status !== 'Publish'}
                    className={`w-full py-3 font-bold rounded-xl flex items-center justify-center gap-2 transition ${
                      job.status !== 'Publish' 
                        ? 'bg-slate-500 text-slate-300 cursor-not-allowed'
                        : applying 
                        ? 'bg-white/80 text-bmi-navy cursor-wait' 
                        : 'bg-bmi-cyan text-bmi-navy hover:bg-[#00E5FF] shadow-lg shadow-bmi-cyan/20'
                    }`}
                  >
                    {applying ? 'Mengirim...' : job.status !== 'Publish' ? 'Lowongan Ditutup' : <>Kirim Lamaran <ArrowRight size={20} /></>}
                  </button>

                  {!token && (
                    <p className="text-xs text-white/60 mt-4">
                      Anda akan diarahkan ke halaman login jika belum masuk.
                    </p>
                  )}
                </>
              )}
              </motion.div>
            )}
          </div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
