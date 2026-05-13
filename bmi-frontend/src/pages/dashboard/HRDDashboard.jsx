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
} from "lucide-react";

const HRDDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showJobModal, setShowJobModal] = useState(false);

  const [candidates, setCandidates] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getStatusColor = (status) => {
    const colors = {
      Publish: "bg-emerald-500/20 text-emerald-400",
      Draft: "bg-slate-500/20 text-slate-400",
      Ditutup: "bg-red-500/20 text-red-400",
    };
    return colors[status] || "bg-slate-500/20 text-slate-400";
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
      value: 0,
      icon: ClipboardList,
      color: "from-purple-600 to-purple-700",
    },
    {
      label: "Diterima",
      value: 0,
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
                      className="bg-slate-900 border border-slate-800 p-6 rounded-[32px] shadow-sm"
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
                      >
                        <stat.icon className="text-white" size={24} />
                      </div>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                        {stat.label}
                      </p>
                      <h3 className="text-3xl font-black mt-1 text-white">
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
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-2.5 bg-red-500/5 hover:bg-red-500/20 rounded-xl text-red-500 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
    </div>
  );
};

export default HRDDashboard;
