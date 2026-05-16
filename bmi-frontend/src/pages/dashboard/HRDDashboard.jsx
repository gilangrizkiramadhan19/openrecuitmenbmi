import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../axios";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  LogOut,
  X,
  Plus,
  Trash2,
  MapPin,
  Clock,
  CheckCircle,
  ClipboardList,
  Search,
  Filter,
  Edit,
  Eye,
  FileText,
  Download,
  User,
  GraduationCap,
  AlertCircle
} from "lucide-react";

const HRDDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showJobModal, setShowJobModal] = useState(false);

  const [candidates, setCandidates] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States for Candidates
  const [searchCandidate, setSearchCandidate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterJob, setFilterJob] = useState("All");

  // Job Edit States
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);

  // Candidate Profile Modal States
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Interview Modal States
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedInterviewCandidate, setSelectedInterviewCandidate] = useState(null);
  const [interviewForm, setInterviewForm] = useState({
    interview_date: "",
    interview_time: "",
    interview_type: "Online",
    interview_location: "",
    interview_notes: ""
  });

  // State Form Lowongan (Lengkap)
  const [newJob, setNewJob] = useState({
    title: "",
    department: "Produksi",
    type: "Full Time",
    location: "Lampung",
    work_system: "WFO",
    description: "",
    qualifications: "",
    benefits: "",
    min_education: "SMA/SMK",
    min_age: "",
    major: "Semua Jurusan",
    deadline: "",
    headcount: 1,
    status: "Publish",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resApps, resJobs] = await Promise.all([
        api.get("/hrd/applicants").catch(() => ({ data: { data: [] } })),
        api.get("/jobs"),
      ]);
      setCandidates(resApps.data.data || []);
      setJobPostings(resJobs.data.data || []);
    } catch (err) {
      console.error("Gagal ambil data:", err);
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/hrd/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // === FUNGSI BUAT LOWONGAN ===
  const handleCreateJob = async (e) => {
    e.preventDefault();

    // Validasi Frontend
    if (
      !newJob.title ||
      !newJob.description ||
      !newJob.qualifications ||
      !newJob.min_education ||
      !newJob.deadline ||
      !newJob.headcount
    ) {
      alert("Mohon isi semua field yang wajib (*)");
      return;
    }

    try {
      const res = await api.post("/jobs", newJob);

      alert(`✅ Lowongan "${res.data.data.title}" berhasil diterbitkan!`);
      setShowJobModal(false);

      // Reset Form
      setNewJob({
        title: "",
        department: "Produksi",
        type: "Full Time",
        location: "Lampung",
        work_system: "WFO",
        description: "",
        qualifications: "",
        benefits: "",
        min_education: "SMA/SMK",
        min_age: "",
        major: "Semua Jurusan",
        deadline: "",
        headcount: 1,
        status: "Publish",
      });

      fetchData();
    } catch (err) {
      console.error("DETAIL ERROR:", err.response?.data);

      if (err.response?.status === 422) {
        const errors = Object.values(err.response.data.errors || {})
          .flat()
          .join("\n");
        alert("❌ Validasi Gagal:\n" + errors);
      } else {
        alert(
          "Gagal: " +
            (err.response?.data?.message || "Terjadi kesalahan server"),
        );
      }
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Yakin ingin menghapus lowongan ini?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      fetchData();
    } catch (err) {
      alert("Gagal menghapus lowongan.");
    }
  };

  const handleEditClick = (job) => {
    setEditingJobId(job.id);
    setNewJob({
      title: job.title || "",
      department: job.department || "Produksi",
      type: job.type || "Full Time",
      location: job.location || "Lampung",
      work_system: job.work_system || "WFO",
      description: job.description || "",
      qualifications: job.qualifications || "",
      benefits: job.benefits || "",
      min_education: job.min_education || "SMA/SMK",
      min_age: job.min_age || "",
      major: job.major || "Semua Jurusan",
      deadline: job.deadline || "",
      headcount: job.headcount || 1,
      status: job.status || "Publish",
    });
    setShowEditJobModal(true);
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/jobs/${editingJobId}`, newJob);
      alert(`✅ Lowongan berhasil diperbarui!`);
      setShowEditJobModal(false);
      setEditingJobId(null);
      fetchData();
    } catch (err) {
      alert("Gagal memperbarui lowongan.");
    }
  };

  const handleUpdateCandidateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}/status`, { status });
      fetchData();
    } catch (err) {
      alert("Gagal memperbarui status pelamar");
    }
  };

  const handleScheduleInterview = async (e) => {
    e.preventDefault();

    if (!interviewForm.interview_date) {
      alert("Tanggal interview wajib diisi!");
      return;
    }

    // Validate date >= today
    const selectedDate = new Date(interviewForm.interview_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert("Tanggal interview tidak boleh di masa lalu!");
      return;
    }

    if (interviewForm.interview_type === 'Online' && !interviewForm.interview_location) {
      alert("Link meeting wajib diisi untuk interview Online!");
      return;
    }

    if (interviewForm.interview_type === 'Offline' && !interviewForm.interview_location) {
      alert("Lokasi wajib diisi untuk interview Offline!");
      return;
    }

    try {
      await api.put(`/applications/${selectedInterviewCandidate.id}/status`, { 
        status: 'interview',
        ...interviewForm
      });
      alert(`✅ Jadwal Interview berhasil disimpan!`);
      setShowInterviewModal(false);
      setSelectedInterviewCandidate(null);
      fetchData();
    } catch (err) {
      alert("Gagal menyimpan jadwal interview");
    }
  };

  const handleEditInterviewClick = (candidate) => {
    setSelectedInterviewCandidate(candidate);
    setInterviewForm({
      interview_date: candidate.interview_date || "",
      interview_time: candidate.interview_time ? candidate.interview_time.substring(0, 5) : "",
      interview_type: candidate.interview_type || "Online",
      interview_location: candidate.interview_location || "",
      interview_notes: candidate.interview_notes || ""
    });
    setShowInterviewModal(true);
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchSearch = c.user?.profile?.full_name?.toLowerCase().includes(searchCandidate.toLowerCase()) || false;
    const matchStatus = filterStatus === "All" || c.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchJob = filterJob === "All" || c.job?.title === filterJob;
    return matchSearch && matchStatus && matchJob;
  });

  const getStatusColor = (status) => {
    const colors = {
      Publish: "bg-emerald-500/20 text-emerald-400",
      Draft: "bg-slate-500/20 text-slate-400",
      Ditutup: "bg-red-500/20 text-red-400",
      applied: "bg-blue-500/20 text-blue-400",
      pending: "bg-blue-500/20 text-blue-400",
      screening: "bg-purple-500/20 text-purple-400",
      interview: "bg-amber-500/20 text-amber-400",
      accepted: "bg-emerald-500/20 text-emerald-400",
      rejected: "bg-red-500/20 text-red-400",
    };
    return colors[status?.toLowerCase()] || colors[status] || "bg-slate-500/20 text-slate-400";
  };

  const stats = [
    {
      label: "Total Pelamar",
      value: candidates.length,
      icon: Users,
      color: "from-blue-600 to-blue-700",
    },
    {
      label: "Lowongan Aktif",
      value: jobPostings.filter((j) => j.status === "Publish").length,
      icon: Briefcase,
      color: "from-green-600 to-green-700",
    },
    {
      label: "Proses Seleksi",
      value: candidates.filter((c) => ["screening", "interview"].includes(c.status?.toLowerCase())).length,
      icon: ClipboardList,
      color: "from-purple-600 to-purple-700",
    },
    {
      label: "Diterima",
      value: candidates.filter((c) => c.status?.toLowerCase() === "accepted").length,
      icon: CheckCircle,
      color: "from-emerald-600 to-emerald-700",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold tracking-tighter animate-pulse text-xl">
        SINKRONISASI DATA BMI HRD...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className="bg-slate-900 border-r border-slate-800 flex flex-col relative z-20"
      >
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white shadow-xl shadow-blue-600/20">
            B
          </div>
          {sidebarOpen && (
            <span className="font-black text-white tracking-widest text-xs">
              BMI INTERNAL
            </span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "jobs", label: "Kelola Lowongan", icon: Briefcase },
            { id: "candidates", label: "Daftar Pelamar", icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-blue-600 text-white shadow-2xl shadow-blue-600/20"
                  : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && (
                <span className="text-sm font-bold">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/hrd/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-bold">Log Out</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-8 py-5 flex justify-between items-center">
          <h2 className="text-2xl font-black text-white tracking-tight">
            {activeSection === "dashboard"
              ? "RINGKASAN REKRUTMEN"
              : activeSection.toUpperCase()}
          </h2>
          <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-blue-400">
            HR
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeSection === "dashboard" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="card p-6"
                    >
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-base`}
                      >
                        <stat.icon className="text-white" size={24} />
                      </div>
                      <p className="text-neutral-600 text-xs font-semibold uppercase tracking-widest">
                        {stat.label}
                      </p>
                      <h3 className="text-3xl font-bold mt-1 text-neutral-900">
                        {stat.value}
                      </h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "jobs" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center bg-slate-900 p-6 rounded-[32px] border border-slate-800">
                  <h3 className="text-xl font-black text-white">
                    Manajemen Lowongan
                  </h3>
                  <button
                    onClick={() => setShowJobModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-500 shadow-xl shadow-blue-600/30 text-sm transition-all"
                  >
                    <Plus size={18} /> TERBITKAN LOWONGAN
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {jobPostings.map((job) => (
                    <div
                      key={job.id}
                      className="bg-slate-900 border border-slate-800 p-6 rounded-[32px] hover:border-blue-500/50 transition-all group shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-5">
                        <div className="space-y-1">
                          <h4 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">
                            {job.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] flex items-center gap-1 text-slate-400 font-bold bg-slate-800 px-2 py-1 rounded-lg">
                              <MapPin size={10} className="text-blue-500" />{" "}
                              {job.location}
                            </span>
                            <span className="text-[10px] flex items-center gap-1 text-slate-400 font-bold bg-slate-800 px-2 py-1 rounded-lg">
                              <Clock size={10} className="text-blue-500" />{" "}
                              {job.work_system}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 text-[10px] font-black rounded-full uppercase ${getStatusColor(job.status)}`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-5 border-t border-slate-800/50 text-[10px] text-slate-500 font-black uppercase">
                        {job.type} • {job.department}
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
                            title="Lihat Detail Lowongan"
                            className="p-2.5 bg-blue-500/5 hover:bg-blue-500/20 rounded-xl text-blue-500 transition-all"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEditClick(job)}
                            title="Edit Lowongan"
                            className="p-2.5 bg-amber-500/5 hover:bg-amber-500/20 rounded-xl text-amber-500 transition-all"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            title="Hapus Lowongan"
                            className="p-2.5 bg-red-500/5 hover:bg-red-500/20 rounded-xl text-red-500 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "candidates" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 p-6 rounded-[32px] border border-slate-800 gap-4">
                  <h3 className="text-xl font-black text-white whitespace-nowrap">Daftar Pelamar</h3>
                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Cari nama pelamar..." 
                        value={searchCandidate}
                        onChange={(e) => setSearchCandidate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-white font-bold focus:border-blue-600"
                      />
                    </div>
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-300 font-bold focus:border-blue-600"
                    >
                      <option value="All">Semua Status</option>
                      <option value="applied">Applied</option>
                      <option value="screening">Screening</option>
                      <option value="interview">Tahap Interview</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <select 
                      value={filterJob}
                      onChange={(e) => setFilterJob(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-300 font-bold focus:border-blue-600 max-w-[200px]"
                    >
                      <option value="All">Semua Lowongan</option>
                      {jobPostings.map(job => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {filteredCandidates.length === 0 ? (
                  <div className="flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-[32px] py-20 px-6 text-center shadow-sm">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                      <Users size={32} className="text-slate-500" />
                    </div>
                    <h4 className="text-xl font-black text-white mb-2">Belum Ada Pelamar</h4>
                    <p className="text-slate-500 max-w-md">Tidak ada data pelamar yang sesuai dengan filter pencarian Anda saat ini.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {filteredCandidates.map(candidate => {
                      const profile = candidate.user?.profile;
                      const edu = candidate.user?.education_histories?.[0]; // Get latest education
                      return (
                        <div key={candidate.id} className="bg-slate-900 border border-slate-800 p-6 rounded-[32px] hover:border-blue-500/30 transition-all group shadow-sm flex flex-col justify-between">
                          <div className="flex gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-700 overflow-hidden shrink-0">
                              {profile?.photo ? (
                                <img src={`http://127.0.0.1:8000/storage/${profile.photo}`} alt={profile?.full_name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-xl">
                                  {profile?.full_name?.charAt(0) || '?'}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-black text-white truncate group-hover:text-blue-400 transition-colors">
                                {profile?.full_name || 'Nama Tidak Tersedia'}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 mb-2">
                                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-lg font-bold truncate max-w-[150px]">
                                  {candidate.job?.title || 'Unknown Job'}
                                </span>
                                <span className={`px-2 py-1 text-[10px] font-black rounded-lg uppercase ${getStatusColor(candidate.status)}`}>
                                  {candidate.status}
                                </span>
                              </div>
                              <div className="flex flex-col gap-1 mt-3 text-xs font-medium text-slate-400">
                                {edu && (
                                  <span className="flex items-center gap-2">
                                    <FileText size={12} className="text-slate-500" />
                                    <span className="truncate">{edu.degree} - {edu.major} ({edu.school_name})</span>
                                  </span>
                                )}
                                {profile?.city && (
                                  <span className="flex items-center gap-2">
                                    <MapPin size={12} className="text-slate-500" />
                                    <span>{profile.city}, {profile.province}</span>
                                  </span>
                                )}
                                <span className="flex items-center gap-2">
                                  <Clock size={12} className="text-slate-500" />
                                  <span>Melamar: {new Date(candidate.applied_at || candidate.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {candidate.status === 'interview' && (
                            <div className="mt-4 p-3.5 bg-slate-800/40 rounded-2xl border border-slate-700/50 text-xs shadow-inner">
                              <div className="font-black text-amber-500 mb-2.5 flex justify-between items-center tracking-widest text-[10px] uppercase">
                                JADWAL INTERVIEW
                                <button onClick={() => handleEditInterviewClick(candidate)} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-700 transition-colors" title="Edit Jadwal">
                                  <Edit size={14} />
                                </button>
                              </div>
                              {candidate.interview_date ? (
                                <div className="space-y-2 text-slate-300">
                                  <div className="flex items-center gap-2.5 font-bold"><Calendar size={14} className="text-amber-500/70" /> {new Date(candidate.interview_date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})} • {candidate.interview_time ? candidate.interview_time.substring(0, 5) : '-'} WIB</div>
                                  <div className="flex items-center gap-2.5 font-bold"><MapPin size={14} className="text-blue-500/70" /> {candidate.interview_type} {candidate.interview_type === 'Online' ? 'Meeting' : ''}</div>
                                  {candidate.interview_type === 'Online' && candidate.interview_location ? (
                                    <div className="pl-6 pt-0.5 text-blue-400 font-medium break-all underline cursor-pointer" onClick={() => window.open(candidate.interview_location, '_blank')}>{candidate.interview_location}</div>
                                  ) : (
                                    <div className="pl-6 pt-0.5 text-slate-400 font-medium break-words">{candidate.interview_location || '-'}</div>
                                  )}
                                  {candidate.interview_notes && <div className="mt-3 pt-3 border-t border-slate-700/50 text-slate-400 italic">"{candidate.interview_notes}"</div>}
                                </div>
                              ) : (
                                <div className="text-slate-400 italic py-2 flex items-center justify-center gap-2">
                                  <AlertCircle size={14} /> Belum dijadwalkan
                                </div>
                              )}
                            </div>
                          )}

                          <div className="mt-5 pt-5 border-t border-slate-800/50 flex flex-wrap gap-2 justify-between items-center">
                            <select
                              value={candidate.status}
                              onChange={(e) => {
                                const newStatus = e.target.value;
                                if (newStatus === 'interview') {
                                  handleEditInterviewClick(candidate);
                                } else {
                                  handleUpdateCandidateStatus(candidate.id, newStatus);
                                }
                              }}
                              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 focus:border-blue-500"
                            >
                              <option value="applied">Applied</option>
                              <option value="screening">Screening</option>
                              <option value="interview">Tahap Interview</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>

                            <div className="flex gap-2">
                              <button
                                onClick={() => alert("Fitur Preview CV belum tersedia di backend.")}
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                              >
                                <Download size={14} /> CV
                              </button>
                              <button
                                onClick={() => { setSelectedCandidate(candidate); setShowProfileModal(true); }}
                                className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                              >
                                <Eye size={14} /> Profil
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* MODAL FORM LOWONGAN - SUDAH LENGKAP */}
      {showJobModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-black text-white">
                TERBITKAN LOWONGAN BARU
              </h3>
              <button
                onClick={() => setShowJobModal(false)}
                className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleCreateJob}
              className="p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar"
            >
              {/* 1. Informasi Dasar */}
              <div className="space-y-4">
                <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                  1. Informasi Dasar
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Nama Posisi *
                    </label>
                    <input
                      type="text"
                      value={newJob.title}
                      onChange={(e) =>
                        setNewJob({ ...newJob, title: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold focus:border-blue-600"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Departemen *
                    </label>
                    <input
                      type="text"
                      value={newJob.department}
                      onChange={(e) =>
                        setNewJob({ ...newJob, department: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold focus:border-blue-600"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Tipe Kerja *
                    </label>
                    <select
                      value={newJob.type}
                      onChange={(e) =>
                        setNewJob({ ...newJob, type: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold"
                    >
                      <option>Full Time</option>
                      <option>Part Time</option>
                      <option>Internship/PKL</option>
                      <option>Kontrak</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Sistem Kerja *
                    </label>
                    <select
                      value={newJob.work_system}
                      onChange={(e) =>
                        setNewJob({ ...newJob, work_system: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold"
                    >
                      <option>WFO</option>
                      <option>Hybrid</option>
                      <option>Remote</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Lokasi *
                    </label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) =>
                        setNewJob({ ...newJob, location: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Jumlah Dibutuhkan *
                    </label>
                    <input
                      type="number"
                      value={newJob.headcount}
                      onChange={(e) =>
                        setNewJob({
                          ...newJob,
                          headcount: parseInt(e.target.value) || 1,
                        })
                      }
                      min="1"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 2. Detail & Kualifikasi */}
              <div className="space-y-4 pt-4 border-t border-slate-800/50">
                <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                  2. Detail & Kualifikasi
                </h4>
                <textarea
                  placeholder="Deskripsi Tugas & Tanggung Jawab..."
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({ ...newJob, description: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white h-32 focus:border-blue-600"
                  required
                />
                <textarea
                  placeholder="Kualifikasi (Pendidikan, Skill, Pengalaman)..."
                  value={newJob.qualifications}
                  onChange={(e) =>
                    setNewJob({ ...newJob, qualifications: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white h-32 focus:border-blue-600"
                  required
                />
                <textarea
                  placeholder="Benefit & Fasilitas..."
                  value={newJob.benefits}
                  onChange={(e) =>
                    setNewJob({ ...newJob, benefits: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white h-24 focus:border-blue-600"
                />
              </div>

              {/* 3. Pengaturan Rekrutmen */}
              <div className="space-y-4 pt-4 border-t border-slate-800/50">
                <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                  3. Pengaturan Rekrutmen
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Minimal Pendidikan *
                    </label>
                    <select
                      value={newJob.min_education}
                      onChange={(e) =>
                        setNewJob({ ...newJob, min_education: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold"
                      required
                    >
                      <option value="SMA/SMK">SMA/SMK</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Jurusan
                    </label>
                    <input
                      type="text"
                      value={newJob.major}
                      onChange={(e) =>
                        setNewJob({ ...newJob, major: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Minimal Usia
                    </label>
                    <input
                      type="number"
                      value={newJob.min_age}
                      onChange={(e) =>
                        setNewJob({ ...newJob, min_age: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold"
                      placeholder="Contoh: 18"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Deadline Lamaran *
                    </label>
                    <input
                      type="date"
                      value={newJob.deadline}
                      onChange={(e) =>
                        setNewJob({ ...newJob, deadline: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">
                      Status
                    </label>
                    <select
                      value={newJob.status}
                      onChange={(e) =>
                        setNewJob({ ...newJob, status: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold"
                    >
                      <option value="Publish">PUBLISH (LIVE)</option>
                      <option value="Draft">SIMPAN DRAFT</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-3xl hover:from-blue-500 transition-all uppercase tracking-widest text-sm shadow-2xl shadow-blue-600/30"
              >
                TERBITKAN LOWONGAN SEKARANG
              </button>
            </form>
          </motion.div>
        </div>
      )}
      {/* MODAL FORM EDIT LOWONGAN */}
      {showEditJobModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-black text-white">EDIT LOWONGAN</h3>
              <button
                onClick={() => { setShowEditJobModal(false); setEditingJobId(null); }}
                className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateJob} className="p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {/* 1. Informasi Dasar */}
              <div className="space-y-4">
                <h4 className="text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">1. Informasi Dasar</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Nama Posisi *</label>
                    <input type="text" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold focus:border-amber-600" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Departemen *</label>
                    <input type="text" value={newJob.department} onChange={(e) => setNewJob({ ...newJob, department: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold focus:border-amber-600" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Tipe Kerja *</label>
                    <select value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold">
                      <option>Full Time</option><option>Part Time</option><option>Internship/PKL</option><option>Kontrak</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Sistem Kerja *</label>
                    <select value={newJob.work_system} onChange={(e) => setNewJob({ ...newJob, work_system: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold">
                      <option>WFO</option><option>Hybrid</option><option>Remote</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Lokasi *</label>
                    <input type="text" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Jumlah Dibutuhkan *</label>
                    <input type="number" value={newJob.headcount} onChange={(e) => setNewJob({ ...newJob, headcount: parseInt(e.target.value) || 1 })} min="1" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold" required />
                  </div>
                </div>
              </div>

              {/* 2. Detail & Kualifikasi */}
              <div className="space-y-4 pt-4 border-t border-slate-800/50">
                <h4 className="text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">2. Detail & Kualifikasi</h4>
                <textarea placeholder="Deskripsi Tugas & Tanggung Jawab..." value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white h-32 focus:border-amber-600" required />
                <textarea placeholder="Kualifikasi (Pendidikan, Skill, Pengalaman)..." value={newJob.qualifications} onChange={(e) => setNewJob({ ...newJob, qualifications: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white h-32 focus:border-amber-600" required />
                <textarea placeholder="Benefit & Fasilitas..." value={newJob.benefits} onChange={(e) => setNewJob({ ...newJob, benefits: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white h-24 focus:border-amber-600" />
              </div>

              {/* 3. Pengaturan Rekrutmen */}
              <div className="space-y-4 pt-4 border-t border-slate-800/50">
                <h4 className="text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">3. Pengaturan Rekrutmen</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Minimal Pendidikan *</label>
                    <select value={newJob.min_education} onChange={(e) => setNewJob({ ...newJob, min_education: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold" required>
                      <option value="SMA/SMK">SMA/SMK</option><option value="D3">D3</option><option value="S1">S1</option><option value="S2">S2</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Jurusan</label>
                    <input type="text" value={newJob.major} onChange={(e) => setNewJob({ ...newJob, major: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Minimal Usia</label>
                    <input type="number" value={newJob.min_age} onChange={(e) => setNewJob({ ...newJob, min_age: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold" placeholder="Contoh: 18" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Deadline Lamaran *</label>
                    <input type="date" value={newJob.deadline} onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase">Status</label>
                    <select value={newJob.status} onChange={(e) => setNewJob({ ...newJob, status: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold">
                      <option value="Publish">PUBLISH (LIVE)</option><option value="Draft">SIMPAN DRAFT</option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black rounded-3xl hover:from-amber-400 transition-all uppercase tracking-widest text-sm shadow-2xl shadow-amber-500/30">
                SIMPAN PERUBAHAN LOWONGAN
              </button>
            </form>
          </motion.div>
        </div>
      )}
      {/* MODAL PROFIL PELAMAR */}
      {showProfileModal && selectedCandidate && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-[32px] shadow-2xl my-8 flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 sticky top-0 z-10 rounded-t-[32px] backdrop-blur-sm">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <User size={24} className="text-blue-500" /> Profil Lengkap Pelamar
              </h3>
              <button
                onClick={() => { setShowProfileModal(false); setSelectedCandidate(null); }}
                className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
              {(() => {
                const profile = selectedCandidate.user?.profile;
                const educations = selectedCandidate.user?.education_histories || [];
                const workExperiences = selectedCandidate.user?.work_experiences || [];
                
                if (!profile) return <div className="text-center text-slate-500 p-10">Data profil belum diisi oleh pelamar.</div>;

                return (
                  <div className="space-y-8">
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-32 h-32 rounded-[24px] bg-slate-800 border-4 border-slate-700 overflow-hidden shrink-0 shadow-xl">
                        {profile.photo ? (
                          <img src={`http://127.0.0.1:8000/storage/${profile.photo}`} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-4xl">
                            {profile.full_name?.charAt(0) || '?'}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h2 className="text-3xl font-black text-white">{profile.full_name}</h2>
                          <div className="flex items-center gap-3 mt-2 text-slate-400">
                            <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-lg text-xs font-bold"><Briefcase size={14} /> Melamar: {selectedCandidate.job?.title}</span>
                            <span className={`px-3 py-1 text-xs font-black rounded-lg uppercase ${getStatusColor(selectedCandidate.status)}`}>{selectedCandidate.status}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-slate-300">
                          <div className="flex items-center gap-2"><MapPin size={16} className="text-slate-500" /> {profile.city}, {profile.province}</div>
                          <div className="flex items-center gap-2"><FileText size={16} className="text-slate-500" /> NIK: {profile.ktp_number || '-'}</div>
                          <div className="flex items-center gap-2">📱 {profile.phone || '-'}</div>
                          <div className="flex items-center gap-2">📧 {selectedCandidate.user?.email || '-'}</div>
                          <div className="flex items-center gap-2">🎂 {profile.birth_place || '-'}, {profile.birth_date ? new Date(profile.birth_date).toLocaleDateString('id-ID') : '-'}</div>
                          <div className="flex items-center gap-2">⚧ {profile.gender === 'Laki-Laki' ? 'Laki-Laki' : profile.gender === 'Perempuan' ? 'Perempuan' : '-'} • {profile.marital_status || '-'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Alamat Lengkap & Tentang Saya */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800/50">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><MapPin size={14} /> Alamat Lengkap</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {profile.address_ktp || '-'}<br/>
                          RT/RW: {profile.rt_rw || '-'}, Kel/Desa: {profile.sub_district || '-'}<br/>
                          Kecamatan: {profile.district || '-'}, {profile.city || '-'}, {profile.province || '-'} {profile.postal_code || ''}
                        </p>
                      </div>
                      <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800/50">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><User size={14} /> Tentang Saya</h4>
                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                          {profile.about_me || 'Tidak ada informasi tambahan.'}
                        </p>
                      </div>
                    </div>

                    {/* Riwayat Pendidikan */}
                    <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800/50">
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><GraduationCap size={14} /> Riwayat Pendidikan</h4>
                      {educations.length > 0 ? (
                        <div className="space-y-4">
                          {educations.map((edu, idx) => (
                            <div key={idx} className="flex gap-4 items-start relative pb-4 last:pb-0">
                              {idx !== educations.length - 1 && <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-800"></div>}
                              <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center shrink-0 relative z-10 mt-1">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              </div>
                              <div>
                                <h5 className="font-bold text-white">{edu.school_name}</h5>
                                <p className="text-sm text-slate-400 font-medium">{edu.degree} - {edu.major}</p>
                                <p className="text-xs text-slate-500">{edu.start_year} - {edu.end_year || 'Sekarang'}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500">Belum ada riwayat pendidikan.</p>
                      )}
                    </div>

                    {/* Pengalaman Kerja */}
                    <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800/50">
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Briefcase size={14} /> Pengalaman Kerja</h4>
                      {workExperiences.length > 0 ? (
                        <div className="space-y-6">
                          {workExperiences.map((work, idx) => (
                            <div key={idx} className="flex gap-4 items-start relative pb-6 last:pb-0">
                              {idx !== workExperiences.length - 1 && <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-800"></div>}
                              <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center shrink-0 relative z-10 mt-1">
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                              </div>
                              <div>
                                <h5 className="font-bold text-white">{work.position}</h5>
                                <p className="text-sm text-slate-400 font-medium">{work.company_name} • {work.industry || 'Industri tidak spesifik'}</p>
                                <p className="text-xs text-slate-500 mb-2">
                                  {work.start_date ? new Date(work.start_date).toLocaleDateString('id-ID', {month:'short', year:'numeric'}) : '-'} 
                                  {' - '} 
                                  {work.is_current ? 'Sekarang' : (work.end_date ? new Date(work.end_date).toLocaleDateString('id-ID', {month:'short', year:'numeric'}) : '-')}
                                </p>
                                {work.description && <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{work.description}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500">Belum ada pengalaman kerja.</p>
                      )}
                    </div>

                    {/* Keahlian & Sosial Media */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800/50">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Keahlian (Skills)</h4>
                        {profile.skills ? (
                          <div className="flex flex-wrap gap-2">
                            {profile.skills.split(',').map((skill, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500">Belum ada keahlian yang ditambahkan.</p>
                        )}
                      </div>
                      
                      <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800/50">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Tautan</h4>
                        <div className="space-y-3">
                          {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">🔗 LinkedIn Profile</a> : <span className="flex items-center gap-2 text-sm text-slate-600">🔗 LinkedIn (Tidak ada)</span>}
                          {profile.instagram ? <a href={profile.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition-colors">📸 Instagram</a> : null}
                          {profile.facebook ? <a href={profile.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400 transition-colors">📘 Facebook</a> : null}
                          {profile.x_twitter ? <a href={profile.x_twitter} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">🐦 X / Twitter</a> : null}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })()}
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL JADWAL INTERVIEW */}
      {showInterviewModal && selectedInterviewCandidate && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Calendar size={20} className="text-amber-500" /> ATUR JADWAL INTERVIEW
              </h3>
              <button
                onClick={() => { setShowInterviewModal(false); setSelectedInterviewCandidate(null); }}
                className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleScheduleInterview} className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30 mb-2">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center font-black text-white overflow-hidden">
                  {selectedInterviewCandidate.user?.profile?.photo ? (
                    <img src={`http://127.0.0.1:8000/storage/${selectedInterviewCandidate.user.profile.photo}`} className="w-full h-full object-cover" />
                  ) : (
                    selectedInterviewCandidate.user?.profile?.full_name?.charAt(0) || '?'
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{selectedInterviewCandidate.user?.profile?.full_name}</h4>
                  <p className="text-xs text-slate-400">{selectedInterviewCandidate.job?.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-black uppercase">Tanggal *</label>
                  <input type="date" value={interviewForm.interview_date} onChange={(e) => setInterviewForm({ ...interviewForm, interview_date: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white font-bold focus:border-amber-600 transition-colors" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-black uppercase">Jam *</label>
                  <input type="time" value={interviewForm.interview_time} onChange={(e) => setInterviewForm({ ...interviewForm, interview_time: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white font-bold focus:border-amber-600 transition-colors" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-black uppercase">Tipe Interview *</label>
                <select value={interviewForm.interview_type} onChange={(e) => setInterviewForm({ ...interviewForm, interview_type: e.target.value, interview_location: "" })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white font-bold focus:border-amber-600 transition-colors">
                  <option value="Online">Online Meeting</option>
                  <option value="Offline">Offline (Tatap Muka)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-black uppercase">
                  {interviewForm.interview_type === 'Online' ? 'Link Meeting *' : 'Lokasi / Alamat *'}
                </label>
                <input type={interviewForm.interview_type === 'Online' ? 'url' : 'text'} placeholder={interviewForm.interview_type === 'Online' ? 'https://meet.google.com/...' : 'Gedung BMI Lt 3...'} value={interviewForm.interview_location} onChange={(e) => setInterviewForm({ ...interviewForm, interview_location: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white font-bold focus:border-amber-600 transition-colors" required />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-black uppercase">Catatan HRD (Opsional)</label>
                <textarea placeholder="Persiapan yang harus dibawa..." value={interviewForm.interview_notes} onChange={(e) => setInterviewForm({ ...interviewForm, interview_notes: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-amber-600 transition-colors h-20 resize-none" />
              </div>

              <button type="submit" className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black rounded-2xl hover:from-amber-400 transition-all uppercase tracking-widest text-xs shadow-xl shadow-amber-500/20">
                SIMPAN JADWAL INTERVIEW
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default HRDDashboard;
