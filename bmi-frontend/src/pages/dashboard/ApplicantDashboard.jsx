import { useState } from 'react';
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
} from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function ApplicantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
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

  const applications = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      department: 'Technology',
      company: 'PT BMI',
      appliedDate: '2024-05-01',
      status: 'interview',
      stage: 'Interview',
      progress: 75,
      location: 'Jakarta',
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      department: 'Product',
      company: 'PT BMI',
      appliedDate: '2024-04-28',
      status: 'reviewing',
      stage: 'Screening',
      progress: 50,
      location: 'Jakarta',
    },
    {
      id: 3,
      jobTitle: 'Data Scientist',
      department: 'Technology',
      company: 'PT BMI',
      appliedDate: '2024-04-25',
      status: 'accepted',
      stage: 'Offer',
      progress: 100,
      location: 'Bekasi',
    },
    {
      id: 4,
      jobTitle: 'Business Analyst',
      department: 'Operations',
      company: 'PT BMI',
      appliedDate: '2024-04-20',
      status: 'rejected',
      stage: 'Rejected',
      progress: 0,
      location: 'Jakarta',
    },
    {
      id: 5,
      jobTitle: 'Quality Assurance',
      department: 'Quality',
      company: 'PT BMI',
      appliedDate: '2024-05-05',
      status: 'reviewing',
      stage: 'Screening',
      progress: 30,
      location: 'Bekasi',
    },
  ];

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
              { icon: TrendingUp, label: 'Dashboard', href: '#' },
              { icon: FileText, label: 'Lamaran Saya', href: '#' },
              { icon: Calendar, label: 'Jadwal Interview', href: '#' },
              { icon: Bell, label: 'Notifikasi', href: '#' },
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
              className="bg-gradient-to-r from-bmi-navy to-bmi-blue rounded-2xl p-8 text-white shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-2">Selamat Datang Kembali!</h2>
              <p className="text-white/80">Kelola aplikasi karir Anda dan pantau interview yang akan datang</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-bmi-navy">{stat.value}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Applications Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-bmi-navy flex items-center gap-2">
                    <Briefcase size={24} />
                    Lamaran Saya
                  </h3>
                  <a href="/jobs" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
                    Lihat Semua <ChevronRight size={16} />
                  </a>
                </div>

                <div className="divide-y divide-slate-200">
                  {applications.slice(0, 4).map((app, idx) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      onClick={() => setSelectedApplication(app)}
                      className="p-6 hover:bg-bmi-soft transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-bmi-navy group-hover:text-bmi-blue transition">{app.jobTitle}</h4>
                          <p className="text-sm text-slate-600">{app.department} • {app.location}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                          {getStatusLabel(app.status)}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock size={16} />
                          Dilamar {app.appliedDate}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${app.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full rounded-full ${
                              app.progress === 100
                                ? 'bg-green-500'
                                : app.progress >= 75
                                ? 'bg-blue-500'
                                : app.progress >= 50
                                ? 'bg-yellow-500'
                                : 'bg-slate-400'
                            }`}
                          />
                        </div>
                        <p className="text-xs text-slate-500">{app.stage} • {app.progress}%</p>
                      </div>
                    </motion.div>
                  ))}
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
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-bmi-navy">Semua Lamaran</h3>
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
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-bmi-soft transition-colors">
                        <td className="px-6 py-4 font-medium text-bmi-navy">{app.jobTitle}</td>
                        <td className="px-6 py-4 text-slate-600">{app.department}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                            {getStatusLabel(app.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{app.appliedDate}</td>
                        <td className="px-6 py-4 text-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setSelectedApplication(app)}
                            className="p-2 hover:bg-slate-200 rounded-lg transition"
                          >
                            <Eye size={16} className="text-bmi-blue" />
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedApplication(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-bmi-navy">{selectedApplication.jobTitle}</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Departemen</p>
                  <p className="font-semibold text-bmi-navy">{selectedApplication.department}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Lokasi</p>
                  <p className="font-semibold text-bmi-navy">{selectedApplication.location}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border inline-block ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusLabel(selectedApplication.status)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Tanggal Lamar</p>
                  <p className="font-semibold text-bmi-navy">{selectedApplication.appliedDate}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-2">Progress</p>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-full rounded-full ${
                      selectedApplication.progress === 100
                        ? 'bg-green-500'
                        : selectedApplication.progress >= 75
                        ? 'bg-blue-500'
                        : selectedApplication.progress >= 50
                        ? 'bg-yellow-500'
                        : 'bg-slate-400'
                    }`}
                    style={{ width: `${selectedApplication.progress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 mt-2">{selectedApplication.stage} • {selectedApplication.progress}%</p>
              </div>

              <div className="bg-bmi-soft p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  Terima kasih telah melamar. Tim kami akan segera menghubungi Anda jika Anda lolos ke tahap selanjutnya.
                </p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 border border-slate-300 text-bmi-navy rounded-lg font-semibold hover:bg-bmi-soft transition-colors flex items-center justify-center gap-2">
                  <Download size={16} />
                  Unduh Lowongan
                </button>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="flex-1 px-4 py-3 bg-bmi-navy text-white rounded-lg font-semibold hover:bg-bmi-blue transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
