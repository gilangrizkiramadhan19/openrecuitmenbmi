import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Calendar,
  Menu,
  TrendingUp,
  CheckCircle,
  Clock,
  ChevronRight,
  Briefcase,
  GraduationCap,
  MapPin,
  User,
  Eye,
  X,
  Edit3,
  ArrowRight,
  Sparkles,
  XCircle
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import api from '../../axios';
import AnimatedCounter from '../../animations/AnimatedCounter';
import { SkeletonStatCard, SkeletonCard } from '../../animations/Skeleton';
import { fadeInUp, staggerContainer } from '../../animations/variants';

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);




  const [latestJobs, setLatestJobs] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Welcome banner state
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('hasSeenWelcomeBanner');
  });

  // Auto-hide welcome banner
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        localStorage.setItem('hasSeenWelcomeBanner', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Calculate profile completeness
  const getProfileCompleteness = () => {
    if (!profile) return 0;
    const fields = [
      'full_name', 'ktp_number', 'phone', 'birth_place', 'birth_date', 
      'gender', 'religion', 'marital_status', 'address_ktp', 'province', 
      'city', 'district', 'sub_district', 'postal_code', 'last_education'
    ];
    const filled = fields.filter(f => profile[f] && profile[f].toString().trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  };
  const completeness = getProfileCompleteness();


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Check Profile
        const statusRes = await api.get('/profile/status');
        if (!statusRes.data.is_complete) {
          navigate('/dashboard/profile');
          return;
        }

        // 2. Fetch Profile Details
        const profileRes = await api.get('/profile');
        setProfile(profileRes.data.data.profile || null);

        // 3. Fetch My Applications
        const appsRes = await api.get('/my-applications');
        setMyApps(appsRes.data.data || []);

        // 4. Fetch Available Jobs
        const jobsRes = await api.get('/jobs');
        const publishedJobs = (jobsRes.data.data || []).filter(
          (job) => job.status === 'Publish' || job.status === 'open'
        );
        setLatestJobs(publishedJobs.slice(0, 5));
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);


  const getStatusColor = (status) => {
    const colors = {
      interview: 'bg-info/10 text-info border-info/20',
      reviewing: 'bg-warning/10 text-warning border-warning/20',
      accepted: 'bg-success/10 text-success border-success/20',
      rejected: 'bg-error/10 text-error border-error/20',
    };
    return colors[status] || 'bg-neutral-100/80 text-neutral-800 border-neutral-300';
  };

  const getStatusLabel = (status) => {
    const labels = {
      interview: 'Wawancara',
      reviewing: 'Dalam Review',
      accepted: 'Diterima',
      rejected: 'Ditolak',
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar userRole="applicant" />

      <div className="flex justify-center w-full">
        {/* Main Content */}
        <div className="flex-1 w-full">

          {/* Page Content */}
          <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
            
            {/* Temporary Welcome Banner */}
            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } }}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl p-4 md:p-6 text-white shadow-lg relative flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full hidden sm:block">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg md:text-xl">Selamat Datang{profile ? `, ${profile.full_name}` : ''}!</h3>
                      <p className="text-white/90 text-sm md:text-base mt-1">Profil Anda sudah siap digunakan. Semoga sukses dalam melamar pekerjaan!</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowWelcome(false);
                      localStorage.setItem('hasSeenWelcomeBanner', 'true');
                    }}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors ml-4 shrink-0"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rejection Banner */}
            {myApps.some(app => app.status === 'rejected') && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-4 md:p-5 flex items-start sm:items-center gap-4 shadow-sm mb-6"
              >
                <div className="bg-red-100 p-2 rounded-full shrink-0">
                  <XCircle size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-red-800 text-sm md:text-base">Pemberitahuan Status Lamaran</h3>
                  <p className="text-red-600/90 text-xs md:text-sm mt-1">
                    Mohon maaf, ada lamaran Anda yang berstatus <strong>Ditolak</strong>. Jangan berkecil hati, silakan eksplorasi lowongan lain yang sesuai dengan keahlian Anda!
                  </p>
                </div>
              </motion.div>
            )}

            {/* Dashboard Overview Section */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              
              {/* Header & Quick Profile */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white card p-6 flex-1 flex flex-col justify-center"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-1">Dashboard Pelamar</h2>
                    <p className="text-neutral-500 text-sm">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="bg-gradient-to-r from-success/10 to-success/5 p-3 rounded-xl border border-success/20">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-semibold text-neutral-600">Kelengkapan Profil</span>
                      <span className="font-bold text-primary">{completeness}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${completeness}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${completeness >= 100 ? 'bg-success' : 'bg-primary'}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary shadow-base overflow-hidden shrink-0">
                    {profile?.photo ? (
                      <img src={`http://127.0.0.1:8000/storage/${profile.photo}`} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400"><User size={28} /></div>
                    )}
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="font-bold text-neutral-900 text-lg mb-1">{profile?.full_name || 'Nama Belum Diatur'}</h3>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-sm text-neutral-600">
                      <span className="flex items-center gap-1.5"><GraduationCap size={15} className="text-neutral-400"/> {profile?.last_education || 'Pendidikan belum diatur'}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={15} className="text-neutral-400"/> {profile?.city ? `${profile.city}, ${profile.province}` : 'Lokasi belum diatur'}</span>
                    </div>
                  </div>
                  <div className="shrink-0 mt-2 sm:mt-0">
                    {completeness >= 100 ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-success/10 text-success rounded-full">
                        <CheckCircle size={14} /> Profil Lengkap
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-warning/10 text-warning rounded-full">
                        <Clock size={14} /> Belum Lengkap
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Quick Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-bmi-navy rounded-2xl shadow-sm p-6 lg:w-72 flex flex-col justify-center text-white relative overflow-hidden shrink-0"
              >
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
                <h3 className="font-semibold text-lg mb-4 relative z-10">Aksi Cepat</h3>
                <div className="space-y-3 relative z-10">
                  <button 
                    onClick={() => navigate('/jobs')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-colors text-sm font-medium group"
                  >
                    <span className="flex items-center gap-2.5"><Briefcase size={18} className="text-blue-300" /> Cari Lowongan</span>
                    <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/applications')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-colors text-sm font-medium group"
                  >
                    <span className="flex items-center gap-2.5"><FileText size={18} className="text-blue-300" /> Lihat Lamaran</span>
                    <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/profile')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-bmi-blue/80 hover:bg-bmi-blue border border-bmi-blue rounded-xl transition-colors text-sm font-medium group"
                  >
                    <span className="flex items-center gap-2.5"><Edit3 size={18} className="text-white" /> Edit Profil</span>
                    <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Compact Stats Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {loading ? (
                <>
                  <SkeletonStatCard />
                  <SkeletonStatCard />
                  <SkeletonStatCard />
                  <SkeletonStatCard />
                  <SkeletonStatCard />
                </>
              ) : (
                <>
                  {[
                    { label: 'Total Lamaran', value: myApps.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', delay: 0 },
                    { label: 'Review', value: myApps.filter(a => a.status === 'pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', delay: 100 },
                    { label: 'Interview', value: myApps.filter(a => a.status === 'interview').length, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', delay: 200 },
                    { label: 'Diterima', value: myApps.filter(a => a.status === 'accepted').length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', delay: 300 },
                    { label: 'Ditolak', value: myApps.filter(a => a.status === 'rejected').length, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', delay: 400 },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        variants={fadeInUp}
                        whileHover={{ y: -2 }}
                        className={`bg-white border rounded-2xl p-4 md:p-5 flex items-center gap-4 cursor-default transition-all shadow-sm hover:shadow-md ${stat.border}`}
                      >
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} shrink-0`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <AnimatedCounter
                            value={stat.value}
                            delay={stat.delay}
                            duration={1400}
                            className="text-xl md:text-2xl font-bold text-bmi-navy leading-none block mb-1"
                          />
                          <p className="text-slate-500 text-xs md:text-sm font-medium">{stat.label}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Jobs Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-bmi-navy flex items-center gap-2">
                    <Sparkles size={22} className="text-amber-500" />
                    Rekomendasi Untuk Anda
                  </h3>
                  <a href="/jobs" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
                    Lihat Semua Lowongan <ChevronRight size={16} />
                  </a>
                </div>

                <div className="divide-y divide-slate-200">
                  {loading ? (
                    <div className="p-6 text-center text-slate-500">Memuat data...</div>
                  ) : latestJobs.length > 0 ? (
                    latestJobs.map((job, idx) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="p-6 hover:bg-bmi-soft transition-colors cursor-pointer group"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-bmi-navy group-hover:text-bmi-blue transition">{job.title}</h4>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-slate-600">
                              <span className="flex items-center gap-1"><Briefcase size={16} /> {job.department}</span>
                              <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                              <span className="flex items-center gap-1"><FileText size={16} /> {job.type}</span>
                            </div>
                          </div>
                          <div className="shrink-0">
                            <span className="inline-flex items-center justify-center px-4 py-2 bg-slate-50 text-bmi-blue font-medium rounded-lg group-hover:bg-blue-100 transition-colors text-sm">
                              Lihat Detail
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-slate-500">Belum ada lowongan pekerjaan saat ini.</div>
                  )}
                </div>
              </motion.div>

              {/* Upcoming Interviews - real data dari myApps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-bmi-navy flex items-center gap-2">
                    <Calendar size={20} />
                    Interview Mendatang
                  </h3>
                </div>

                <div className="divide-y divide-slate-200">
                  {loading ? (
                    <div className="p-6 text-center text-slate-400 text-sm">Memuat...</div>
                  ) : myApps.filter(a => a.status === 'interview' && (!a.interview_date || new Date(a.interview_date) >= new Date(new Date().setHours(0,0,0,0)))).length > 0 ? (
                    myApps.filter(a => a.status === 'interview' && (!a.interview_date || new Date(a.interview_date) >= new Date(new Date().setHours(0,0,0,0)))).map((app, idx) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="p-5 hover:bg-bmi-soft transition-colors cursor-pointer border-b border-slate-100 last:border-0"
                      >
                        <h4 className="font-semibold text-bmi-navy text-sm mb-2">{app.job?.title || 'Posisi Tidak Diketahui'}</h4>
                        <div className="space-y-2 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                          {app.interview_date ? (
                            <>
                              <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-emerald-500" />
                                <span className="font-bold text-emerald-700">{new Date(app.interview_date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})} • {app.interview_time ? app.interview_time.substring(0,5) : ''} WIB</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <MapPin size={14} className="text-blue-500 shrink-0 mt-0.5" />
                                <div className="text-slate-600">
                                  <span className="font-semibold block text-blue-700">{app.interview_type}</span>
                                  {app.interview_type === 'Online' && app.interview_location ? (
                                    <a href={app.interview_location} target="_blank" rel="noreferrer" className="text-blue-500 underline text-xs break-all block mt-0.5">{app.interview_location}</a>
                                  ) : (
                                    <span className="text-xs break-words block mt-0.5">{app.interview_location}</span>
                                  )}
                                </div>
                              </div>
                              {app.interview_notes && (
                                <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-500 italic">
                                  "{app.interview_notes}"
                                </div>
                              )}
                              {app.interview_type === 'Online' && app.interview_location && (
                                <a href={app.interview_location} target="_blank" rel="noreferrer" className="mt-2 w-full inline-block text-center py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition">Gabung Meeting</a>
                              )}
                            </>
                          ) : (
                            <div className="text-slate-500 text-xs py-1">
                              <span className="font-semibold text-amber-600 block mb-1">Interview belum dijadwalkan.</span>
                              HRD akan menghubungi Anda segera.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-10 text-center text-slate-500 flex flex-col items-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Calendar size={28} className="text-slate-300" />
                      </div>
                      <p className="font-semibold text-slate-700 mb-1">Belum ada jadwal interview</p>
                      <p className="text-sm text-slate-500 max-w-[200px]">HRD akan menghubungi Anda jika lolos tahap seleksi.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* All Applications Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-xl font-bold text-bmi-navy">Riwayat Lamaran</h3>
                <a href="/dashboard/applications" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
                  Lihat Detail <ChevronRight size={16} />
                </a>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-bmi-soft border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-bmi-navy">Posisi</th>
                      <th className="px-6 py-4 text-left font-semibold text-bmi-navy">Departemen</th>
                      <th className="px-6 py-4 text-left font-semibold text-bmi-navy">Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-bmi-navy">Tanggal Lamar</th>
                      <th className="px-6 py-4 text-center font-semibold text-bmi-navy">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-slate-500">
                          Memuat data...
                        </td>
                      </tr>
                    ) : myApps.length > 0 ? (
                      myApps.slice(0, 5).map((app) => (
                        <tr key={app.id} className="hover:bg-bmi-soft transition-colors">
                          <td className="px-6 py-4 font-medium text-bmi-navy">{app.job?.title}</td>
                          <td className="px-6 py-4 text-slate-600">{app.job?.department}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                              {getStatusLabel(app.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {new Date(app.applied_at || app.created_at).toLocaleDateString('id-ID')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => navigate(`/jobs/${app.job_id}`)}
                              className="p-2 hover:bg-slate-200 rounded-lg transition"
                            >
                              <Eye size={16} className="text-bmi-blue" />
                            </motion.button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-slate-500 py-10">
                          Anda belum memiliki riwayat lamaran.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


    </div>
  );
}
