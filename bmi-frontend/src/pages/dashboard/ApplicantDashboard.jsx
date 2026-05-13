import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  Bell,
  Menu,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Briefcase,
  Eye,
  Download,
  X,
  GraduationCap,
  MapPin,
  User
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import api from '../../axios';

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Interview dijadwalkan untuk Senior Frontend Developer', time: '2 jam lalu', read: false },
    { id: 2, message: 'Lamaran Anda untuk Product Manager masuk tahap review', time: '1 hari lalu', read: false },
    { id: 3, message: 'Penawaran kerja diterima untuk Data Scientist', time: '3 hari lalu', read: true },
  ]);

  const stats = [
    { label: 'Lamaran Aktif', value: '12', icon: FileText, color: 'from-blue-600 to-blue-700' },
    { label: 'Interview Terjadwal', value: '2', icon: Calendar, color: 'from-emerald-600 to-emerald-700' },
    { label: 'Profile Views', value: '48', icon: Eye, color: 'from-purple-600 to-purple-700' },
    { label: 'Ditawarkan', value: '1', icon: CheckCircle, color: 'from-amber-600 to-amber-700' },
  ];

  const [latestJobs, setLatestJobs] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const upcomingInterviews = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      date: '25 May 2024',
      time: '10:00 AM',
      type: 'Video Call',
      interviewer: 'John Smith',
      department: 'Technology',
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      date: '28 May 2024',
      time: '2:00 PM',
      type: 'In-person',
      interviewer: 'Sarah Johnson',
      department: 'Product',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      interview: 'bg-blue-100/80 text-blue-800 border-blue-300',
      reviewing: 'bg-yellow-100/80 text-yellow-800 border-yellow-300',
      accepted: 'bg-green-100/80 text-green-800 border-green-300',
      rejected: 'bg-red-100/80 text-red-800 border-red-300',
    };
    return colors[status] || 'bg-gray-100/80 text-gray-800 border-gray-300';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-bmi-soft">
      <Navbar userRole="applicant" />

      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 80 }}
          className="bg-white border-r border-slate-200 hidden md:block transition-all duration-300 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto"
        >
          <nav className="p-4 space-y-2">
            {[
              { icon: TrendingUp, label: 'Dashboard', href: '/dashboard/applicant' },
              { icon: FileText, label: 'Riwayat Lamaran', href: '/dashboard/applications' },
              { icon: User, label: 'Profil Saya', href: '/dashboard/profile' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={idx}
                  href={item.href}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-bmi-soft transition-colors"
                >
                  <Icon size={20} />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </motion.a>
              );
            })}
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="bg-white border-b border-slate-200 sticky top-16 z-10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-bmi-navy hidden sm:block">Dashboard Lamaran</h1>
            </div>

            {/* Notifications */}
            <div className="relative group">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-bmi-navy">Notifikasi</h3>
                </div>
                <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-4 hover:bg-bmi-soft transition ${!notif.read ? 'bg-blue-50' : ''}`}>
                      <p className="text-sm text-bmi-navy">{notif.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 md:p-8 space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-bmi-navy to-bmi-blue rounded-3xl p-8 text-white shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 backdrop-blur-md flex items-center justify-center overflow-hidden shrink-0 shadow-xl">
                  {profile?.photo ? (
                    <img src={`http://127.0.0.1:8000/storage/${profile.photo}`} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-white" />
                  )}
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-3xl font-bold mb-2">
                    Selamat Datang Kembali{profile ? `, ${profile.full_name}` : ''}!
                  </h2>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
                    <div className="flex items-center gap-1 text-white/90 bg-white/10 px-3 py-1 rounded-full text-sm">
                      <GraduationCap size={16} />
                      <span>{profile?.last_education || 'Pendidikan belum diatur'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/90 bg-white/10 px-3 py-1 rounded-full text-sm">
                      <MapPin size={16} />
                      <span>{profile?.city ? `${profile.city}, ${profile.province}` : 'Lokasi belum diatur'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-300 bg-green-900/30 px-3 py-1 rounded-full text-sm font-medium border border-green-400/30">
                      <CheckCircle size={16} />
                      <span>Profil Lengkap</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                    <FileText size={24} className="text-white" />
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-1">Total Lamaran</p>
                <p className="text-3xl font-bold text-bmi-navy">{myApps.length}</p>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600">
                    <Clock size={24} className="text-white" />
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-1">Menunggu Review</p>
                <p className="text-3xl font-bold text-bmi-navy">{myApps.filter(a => a.status === 'pending').length}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700">
                    <Calendar size={24} className="text-white" />
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-1">Tahap Interview</p>
                <p className="text-3xl font-bold text-bmi-navy">{myApps.filter(a => a.status === 'interview').length}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-1">Diterima</p>
                <p className="text-3xl font-bold text-bmi-navy">{myApps.filter(a => a.status === 'accepted').length}</p>
              </motion.div>
            </div>

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
                    <Briefcase size={24} />
                    Lowongan Terbaru
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

              {/* Upcoming Interviews */}
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
                  {upcomingInterviews.length > 0 ? (
                    upcomingInterviews.map((interview, idx) => (
                      <motion.div
                        key={interview.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="p-5 hover:bg-bmi-soft transition-colors"
                      >
                        <h4 className="font-semibold text-bmi-navy text-sm mb-2">{interview.jobTitle}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar size={14} />
                            {interview.date}
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Clock size={14} />
                            {interview.time}
                          </div>
                          <div className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-fit">
                            {interview.type}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-500">
                      <Calendar size={32} className="mx-auto mb-3 opacity-50" />
                      <p>Belum ada interview yang dijadwalkan</p>
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
                            {new Date(app.applied_at).toLocaleDateString('id-ID')}
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
