import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  ChevronDown,
  Plus,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';

const HRDDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showJobModal, setShowJobModal] = useState(false);
  const [searchCandidates, setSearchCandidates] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, message: '5 aplikasi baru dari posisi Quality Assurance', time: '5 menit lalu', unread: true },
    { id: 2, message: 'Interview dengan Ahmad Wijaya sudah dijadwalkan', time: '1 jam lalu', unread: true },
    { id: 3, message: 'Lamaran ditolak untuk posisi Manager Produksi', time: '2 jam lalu', unread: false },
  ]);

  const candidates = [
    { id: 1, name: 'Ahmad Wijaya', position: 'Quality Assurance', status: 'interview', date: '25 May 2024', email: 'ahmad@email.com' },
    { id: 2, name: 'Siti Nurhaliza', position: 'Export Specialist', status: 'reviewing', date: '-', email: 'siti@email.com' },
    { id: 3, name: 'Rinto Harahap', position: 'Production Staff', status: 'accepted', date: '20 May 2024', email: 'rinto@email.com' },
    { id: 4, name: 'Budi Santoso', position: 'Supply Chain', status: 'rejected', date: '-', email: 'budi@email.com' },
    { id: 5, name: 'Dewi Lestari', position: 'Quality Assurance', status: 'interview', date: '26 May 2024', email: 'dewi@email.com' },
  ];

  const jobPostings = [
    { id: 1, title: 'Quality Assurance', department: 'Quality', applicants: 24, status: 'active', deadline: '30 Jun 2024' },
    { id: 2, title: 'Export Specialist', department: 'Export', applicants: 18, status: 'active', deadline: '15 Jun 2024' },
    { id: 3, title: 'Production Manager', department: 'Production', applicants: 12, status: 'active', deadline: '20 Jun 2024' },
    { id: 4, title: 'HR Staff', department: 'Admin', applicants: 8, status: 'closed', deadline: '05 Jun 2024' },
  ];

  const stats = [
    { label: 'Total Pelamar', value: '247', icon: Users, trend: '+12', color: 'from-blue-600 to-blue-700' },
    { label: 'Lowongan Aktif', value: '12', icon: Briefcase, trend: '+2', color: 'from-green-600 to-green-700' },
    { label: 'Interview Terjadwal', value: '18', icon: Calendar, trend: '+5', color: 'from-purple-600 to-purple-700' },
    { label: 'Diterima', value: '34', icon: CheckCircle, trend: '+4', color: 'from-emerald-600 to-emerald-700' },
  ];

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchCandidates.toLowerCase()) ||
                         c.position.toLowerCase().includes(searchCandidates.toLowerCase());
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const colors = {
      interview: 'bg-blue-100 text-blue-800',
      reviewing: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Kelola Lowongan', icon: Briefcase },
    { id: 'candidates', label: 'Pelamar', icon: Users },
    { id: 'interviews', label: 'Jadwal Interview', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img src="/logo-bmi.png" alt="BMI" className="h-10 w-auto" />
            {sidebarOpen && <span className="font-bold text-white text-lg hidden lg:inline">BMI HRD</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400'
                    : 'text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </motion.button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <motion.button
            whileHover={{ x: 4 }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </motion.button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-24 bg-slate-800 p-1.5 rounded-full border border-slate-700 hover:bg-slate-700 transition"
        >
          {sidebarOpen ? <ChevronDown size={18} className="rotate-90" /> : <ChevronDown size={18} className="-rotate-90" />}
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-semibold text-white">
              {navigationItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Cari pelamar..."
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors w-48"
                value={searchCandidates}
                onChange={(e) => setSearchCandidates(e.target.value)}
              />
            </div>

            {/* Notifications */}
            <div className="relative group">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Notification Dropdown */}
              <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4 border-b border-slate-700">
                  <h3 className="font-semibold text-white">Notifikasi</h3>
                </div>
                <div className="divide-y divide-slate-700 max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-4 hover:bg-slate-700/50 transition ${notif.unread ? 'bg-slate-700/30' : ''}`}>
                      <p className="text-sm text-slate-200">{notif.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800 rounded-lg transition">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                  HJ
                </div>
                <span className="hidden sm:inline text-sm">HR Manager</span>
              </button>

              {/* Profile Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition">
                  Pengaturan
                </a>
                <hr className="border-slate-700" />
                <a href="/hrd/login" className="block px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeSection === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                            <Icon size={24} className="text-white" />
                          </div>
                          <span className="text-green-400 text-sm font-semibold">{stat.trend}</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                        <p className="text-4xl font-bold text-white">{stat.value}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Applicant Trend */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp size={20} />
                      Tren Pelamar
                    </h3>
                    <div className="h-64 bg-slate-800/50 rounded-lg flex items-end justify-around p-4">
                      {[35, 45, 38, 52, 48, 65, 72].map((height, idx) => (
                        <div
                          key={idx}
                          className="flex-1 mx-1 bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg opacity-70 hover:opacity-100 transition"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                        <span key={idx}>{day}</span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">Aksi Cepat</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowJobModal(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg text-white font-semibold transition-all transform hover:scale-105 active:scale-95"
                      >
                        <Plus size={20} />
                        Buat Lowongan Baru
                      </button>
                      <button className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-semibold transition">
                        Lihat Semua Pelamar
                      </button>
                      <button className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-semibold transition">
                        Jadwalkan Interview
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Candidates Table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden"
                >
                  <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Pelamar Terbaru</h3>
                    <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">Lihat Semua →</a>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-800/50 border-b border-slate-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-slate-400 font-semibold">Nama</th>
                          <th className="px-6 py-3 text-left text-slate-400 font-semibold">Posisi</th>
                          <th className="px-6 py-3 text-left text-slate-400 font-semibold">Status</th>
                          <th className="px-6 py-3 text-left text-slate-400 font-semibold">Tanggal</th>
                          <th className="px-6 py-3 text-center text-slate-400 font-semibold">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidates.slice(0, 3).map((candidate, idx) => (
                          <motion.tr
                            key={candidate.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 + idx * 0.05 }}
                            className="border-b border-slate-800 hover:bg-slate-800/30 transition"
                          >
                            <td className="px-6 py-4 text-white font-medium">{candidate.name}</td>
                            <td className="px-6 py-4 text-slate-300">{candidate.position}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(candidate.status)}`}>
                                {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-400">{candidate.date}</td>
                            <td className="px-6 py-4 text-center">
                              <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                                <MoreVertical size={16} />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeSection === 'candidates' && (
              <motion.div
                key="candidates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                  {/* Header with filters */}
                  <div className="p-6 border-b border-slate-800 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                        <input
                          type="text"
                          placeholder="Cari nama atau posisi..."
                          className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                          value={searchCandidates}
                          onChange={(e) => setSearchCandidates(e.target.value)}
                        />
                      </div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="all">Semua Status</option>
                        <option value="reviewing">Sedang Review</option>
                        <option value="interview">Interview</option>
                        <option value="accepted">Diterima</option>
                        <option value="rejected">Ditolak</option>
                      </select>
                    </div>
                    <p className="text-sm text-slate-400">
                      Menampilkan {filteredCandidates.length} dari {candidates.length} pelamar
                    </p>
                  </div>

                  {/* Candidates Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-800/50 border-b border-slate-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-slate-400 font-semibold">Nama</th>
                          <th className="px-6 py-3 text-left text-slate-400 font-semibold">Email</th>
                          <th className="px-6 py-3 text-left text-slate-400 font-semibold">Posisi</th>
                          <th className="px-6 py-3 text-left text-slate-400 font-semibold">Status</th>
                          <th className="px-6 py-3 text-left text-slate-400 font-semibold">Tanggal Interview</th>
                          <th className="px-6 py-3 text-center text-slate-400 font-semibold">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCandidates.map((candidate) => (
                          <motion.tr
                            key={candidate.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-b border-slate-800 hover:bg-slate-800/30 transition"
                          >
                            <td className="px-6 py-4 text-white font-medium">{candidate.name}</td>
                            <td className="px-6 py-4 text-slate-300 text-xs">{candidate.email}</td>
                            <td className="px-6 py-4 text-slate-300">{candidate.position}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(candidate.status)}`}>
                                {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-400">{candidate.date}</td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button className="p-2 hover:bg-slate-700 rounded-lg transition text-blue-400">
                                  <Eye size={16} />
                                </button>
                                <button className="p-2 hover:bg-slate-700 rounded-lg transition text-yellow-400">
                                  <Edit2 size={16} />
                                </button>
                                <button className="p-2 hover:bg-slate-700 rounded-lg transition text-red-400">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'jobs' && (
              <motion.div
                key="jobs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setShowJobModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg text-white font-semibold transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Plus size={20} />
                    Buat Lowongan Baru
                  </button>
                </div>

                <div className="grid gap-4">
                  {jobPostings.map((job, idx) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                          <p className="text-sm text-slate-400">{job.department}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {job.status === 'active' ? 'Aktif' : 'Ditutup'}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-slate-500">Pelamar</p>
                          <p className="text-lg font-semibold text-white">{job.applicants}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Deadline</p>
                          <p className="text-lg font-semibold text-white">{job.deadline}</p>
                        </div>
                        <div className="flex items-end gap-2">
                          <button className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition">
                            Edit
                          </button>
                          <button className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition">
                            Lihat
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Post Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-900 border border-slate-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900">
              <h2 className="text-xl font-semibold text-white">Buat Lowongan Baru</h2>
              <button
                onClick={() => setShowJobModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Judul Posisi</label>
                <input
                  type="text"
                  placeholder="Contoh: Quality Assurance Manager"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Departemen</label>
                  <input
                    type="text"
                    placeholder="Quality"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Lokasi</label>
                  <input
                    type="text"
                    placeholder="Jakarta"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tipe Pekerjaan</label>
                <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>

              <div className="flex gap-4 justify-end pt-4 border-t border-slate-700">
                <button
                  onClick={() => setShowJobModal(false)}
                  className="px-6 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-500 hover:to-blue-600 transition font-semibold">
                  Buat Lowongan
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HRDDashboard;
