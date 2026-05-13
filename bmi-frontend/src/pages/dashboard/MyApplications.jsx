import { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, Search, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import api from '../../axios';
import { motion } from 'framer-motion';

export default function MyApplications() {
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
      <Navbar showAuth={true} userRole="applicant" />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bmi-blue"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-bmi-navy mb-2">Belum ada lamaran</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Anda belum melamar pekerjaan apapun. Silakan kunjungi halaman lowongan untuk mulai membangun karir Anda bersama kami.
            </p>
            <a href="/jobs" className="inline-block px-6 py-2.5 bg-bmi-blue text-white rounded-lg font-medium hover:bg-bmi-navy transition-colors">
              Cari Lowongan
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app, idx) => (
              <motion.div 
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-bmi-blue/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-bmi-navy">{app.job?.title || 'Posisi Tidak Diketahui'}</h3>
                      {getStatusBadge(app.status)}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
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
                        <span>Melamar pada: {formatDate(app.applied_at)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0">
                    <a 
                      href={`/jobs/${app.job_id}`}
                      className="inline-flex items-center justify-center px-4 py-2 bg-slate-50 text-bmi-blue font-medium rounded-lg hover:bg-slate-100 transition-colors text-sm"
                    >
                      Lihat Lowongan
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
