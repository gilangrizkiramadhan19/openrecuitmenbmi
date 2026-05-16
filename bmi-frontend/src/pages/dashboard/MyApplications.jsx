import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle, ChevronLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import api from '../../axios';
import { motion } from 'framer-motion';
import { SkeletonCard } from '../../animations/Skeleton';
import { staggerContainer, fadeInUp } from '../../animations/variants';


export default function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/my-applications');
        setApplications(response.data.data);
      } catch (err) {
        console.error("Error fetching applications", err);
        setError('Gagal memuat riwayat lamaran Anda.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"><CheckCircle size={14} /> Diterima</span>;
      case 'rejected':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700"><XCircle size={14} /> Ditolak</span>;
      case 'interview':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-bmi-cyan/20 text-bmi-cyan"><Calendar size={14} /> Tahap Interview</span>;
      default:
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700"><Clock size={14} /> Menunggu Review</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar showAuth={false} userRole="applicant" />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/dashboard/applicant')}
          className="flex items-center gap-2 text-slate-500 hover:text-bmi-blue mb-6 transition-colors text-sm font-medium"
          whileHover={{ x: -3 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ChevronLeft size={18} />
          Kembali ke Dashboard
        </motion.button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bmi-navy mb-2">Riwayat Lamaran Saya</h1>
          <p className="text-slate-500">Pantau status semua lowongan kerja yang telah Anda lamar di sini.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {loading ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <SkeletonCard />
              </motion.div>
            ))}
          </motion.div>
        ) : applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center"
          >
            <div className="animate-float inline-block mb-6">
              <Briefcase size={56} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-bmi-navy mb-2">Belum ada lamaran</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Anda belum melamar pekerjaan apapun. Silakan kunjungi halaman lowongan untuk mulai membangun karir Anda bersama kami.
            </p>
            <a href="/jobs" className="inline-block px-6 py-2.5 bg-bmi-blue text-white rounded-lg font-medium hover:bg-bmi-navy transition-colors">
              Cari Lowongan
            </a>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {applications.map((app, idx) => (
              <motion.div 
                key={app.id}
                variants={fadeInUp}
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,56,150,0.08)' }}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-bmi-blue/30 transition-all duration-200 will-animate"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-bmi-navy">{app.job?.title || 'Posisi Tidak Diketahui'}</h3>
                      {getStatusBadge(app.status)}
                    </div>
                    
                    <div className="flex flex-col gap-3 mt-3 text-sm text-slate-500">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <div className="flex items-center gap-1.5">
                          <Briefcase size={16} />
                          <span>{app.job?.department || '-'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={16} />
                          <span>{app.job?.location || '-'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} />
                          <span>Tanggal Lamar: {formatDate(app.applied_at || app.created_at)}</span>
                        </div>
                      </div>

                      {app.status === 'interview' && (
                        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl mt-2 w-full">
                          <h4 className="font-bold text-bmi-navy mb-3 flex items-center gap-2 text-sm">
                            <Calendar size={16} className="text-bmi-blue" /> Jadwal Interview
                          </h4>
                          {app.interview_date ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="block text-xs text-slate-500 font-semibold mb-1">TANGGAL & WAKTU</span>
                                <span className="text-slate-700 font-medium">{formatDate(app.interview_date)} • {app.interview_time ? app.interview_time.substring(0,5) : ''} WIB</span>
                              </div>
                              <div>
                                <span className="block text-xs text-slate-500 font-semibold mb-1">TIPE INTERVIEW</span>
                                <span className="text-slate-700 font-medium">{app.interview_type}</span>
                              </div>
                              <div className="md:col-span-2">
                                <span className="block text-xs text-slate-500 font-semibold mb-1">{app.interview_type === 'Online' ? 'LINK MEETING' : 'LOKASI'}</span>
                                {app.interview_type === 'Online' && app.interview_location ? (
                                  <a href={app.interview_location} target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium break-all">{app.interview_location}</a>
                                ) : (
                                  <span className="text-slate-700 font-medium break-words">{app.interview_location || '-'}</span>
                                )}
                              </div>
                              {app.interview_notes && (
                                <div className="md:col-span-2 mt-2 pt-2 border-t border-blue-100/50">
                                  <span className="block text-xs text-slate-500 font-semibold mb-1">CATATAN HRD</span>
                                  <span className="text-slate-600 italic">"{app.interview_notes}"</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-amber-700 text-sm font-medium bg-amber-50 p-3 rounded-lg border border-amber-100">
                              Interview belum dijadwalkan. HRD akan menghubungi Anda segera.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="shrink-0">
                    <a 
                      href={`/jobs/${app.job_id}`}
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-bmi-blue font-medium rounded-lg hover:bg-bmi-blue hover:text-white transition-all duration-200 text-sm"
                    >
                      Lihat Lowongan
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
