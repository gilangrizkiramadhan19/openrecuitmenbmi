import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../axios";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  Calendar,
  LogOut,
  Plus,
  Trash2,
  MapPin,
  CheckCircle,
  Search,
  Filter,
  Edit,
  Eye,
  FileText,
  User,
  GraduationCap,
} from "lucide-react";

const HRDDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showJobModal, setShowJobModal] = useState(false);

  const [candidates, setCandidates] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [newJob, setNewJob] = useState({
    title: "",
    department: "Produksi",
    type: "Full Time",
    location: "Lampung",
    description: "",
    qualifications: "",
    benefits: "",
    min_education: "SMA/SMK",
    deadline: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

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
      console.error("Error fetching data:", err);
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/hrd/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/hrd/login");
  };

  const handlePostJob = async () => {
    try {
      const token = localStorage.getItem("hrd_token");
      await api.post("/jobs", newJob, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowJobModal(false);
      setNewJob({
        title: "",
        department: "Produksi",
        type: "Full Time",
        location: "Lampung",
        description: "",
        qualifications: "",
        benefits: "",
        min_education: "SMA/SMK",
        deadline: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("hrd_token");
      await api.delete(`/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const filteredCandidates = candidates.filter((c) =>
    c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Jobs", value: jobPostings.length, icon: Briefcase },
    { label: "Total Candidates", value: candidates.length, icon: Users },
    { label: "Interviews", value: candidates.filter(c => c.status === 'interview').length, icon: Calendar },
    { label: "Hired", value: candidates.filter(c => c.status === 'accepted').length, icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">HRD Dashboard</h1>
            <p className="text-gray-300 text-sm">Recruitment Management System</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {[
            { id: "overview", label: "Overview" },
            { id: "candidates", label: "Candidates" },
            { id: "jobs", label: "Job Postings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 font-semibold transition ${
                activeTab === tab.id
                  ? "border-b-2 border-black text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-black transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-semibold mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-black">{stat.value}</p>
                    </div>
                    <stat.icon className="text-black opacity-30" size={32} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Job Postings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="border border-gray-200 rounded-lg p-6"
              >
                <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <Briefcase size={24} />
                  Recent Job Postings
                </h2>
                <div className="space-y-3">
                  {jobPostings.slice(0, 5).map((job) => (
                    <div
                      key={job.id}
                      className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-black transition"
                    >
                      <h3 className="font-semibold text-black">{job.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                        <MapPin size={14} />
                        {job.location}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {job.applicants || 0} applicants
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Candidates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="border border-gray-200 rounded-lg p-6"
              >
                <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <Users size={24} />
                  Recent Candidates
                </h2>
                <div className="space-y-3">
                  {candidates.slice(0, 5).map((candidate) => (
                    <div
                      key={candidate.id}
                      className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-black transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-black">{candidate.full_name}</h3>
                          <p className="text-xs text-gray-600">{candidate.email}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          candidate.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          candidate.status === 'interview' ? 'bg-blue-100 text-blue-700' :
                          candidate.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Candidates Tab */}
        {activeTab === "candidates" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Search Bar */}
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center gap-2">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidates by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-white px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-black"
                />
              </div>

              {/* Candidates Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-black">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-black">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-black">Applied For</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-black">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.map((candidate) => (
                      <tr key={candidate.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-sm text-black font-semibold">{candidate.full_name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{candidate.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{candidate.job?.title || '-'}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            candidate.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            candidate.status === 'interview' ? 'bg-blue-100 text-blue-700' :
                            candidate.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button className="text-black hover:opacity-60 transition">
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Job Postings Tab */}
        {activeTab === "jobs" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-4">
              <button
                onClick={() => setShowJobModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                <Plus size={20} />
                New Job Posting
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {jobPostings.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-black transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-black">{job.title}</h3>
                      <p className="text-gray-600 text-sm">{job.department}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded transition">
                        <Edit size={18} className="text-black" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 hover:bg-red-100 rounded transition"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      {job.applicants || 0} applicants
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(job.deadline).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* New Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-black mb-4">Create New Job Posting</h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
                <textarea
                  placeholder="Description"
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black h-24"
                />
                <input
                  type="date"
                  value={newJob.deadline}
                  onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowJobModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostJob}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Post Job
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
