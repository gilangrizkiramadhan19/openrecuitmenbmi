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
  X,
  TrendingUp,
} from "lucide-react";
import Navbar from "../../components/Navbar";

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
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const candRes = await api.get("/candidates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates(candRes.data.data || []);

      const jobRes = await api.get("/job-postings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobPostings(jobRes.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post("/job-postings", newJob, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowJobModal(false);
      fetchData();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/job-postings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const stats = [
    { label: "Total Candidates", value: candidates.length, icon: Users, color: "bg-blue-100", textColor: "text-blue-700" },
    { label: "Open Positions", value: jobPostings.length, icon: Briefcase, color: "bg-green-100", textColor: "text-green-700" },
    { label: "This Month", value: candidates.filter(c => new Date(c.created_at).getMonth() === new Date().getMonth()).length, icon: Calendar, color: "bg-purple-100", textColor: "text-purple-700" },
    { label: "In Review", value: candidates.filter(c => c.status === "reviewing").length, icon: TrendingUp, color: "bg-orange-100", textColor: "text-orange-700" },
  ];

  const filteredCandidates = candidates.filter(c =>
    c.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="hrd" />

      {/* Header */}
      <div className="bg-black text-white py-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">HR Dashboard</h1>
          <p className="text-gray-300 mt-1">Manage candidates and job postings</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["overview", "candidates", "jobs"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-200 hover:border-black"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-black transition"
                >
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className={stat.textColor} size={24} />
                  </div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-black">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Recent Candidates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <Users size={24} />
                  Recent Candidates
                </h2>
                <div className="space-y-3">
                  {candidates.slice(0, 5).map((candidate, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold">
                          {candidate.full_name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-black text-sm">{candidate.full_name}</p>
                          <p className="text-xs text-gray-600">{candidate.last_education}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${
                        candidate.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        candidate.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        candidate.status === 'interview' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Open Jobs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <Briefcase size={24} />
                  Open Positions
                </h2>
                <div className="space-y-3">
                  {jobPostings.slice(0, 5).map((job, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-black text-sm">{job.title}</h3>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {job.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin size={14} />
                        {job.location}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-black transition">
                <Filter size={18} />
                Filter
              </button>
            </div>

            {/* Candidates Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-black">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Education</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold">
                            {candidate.full_name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-black">{candidate.full_name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{candidate.last_education}</td>
                      <td className="py-4 px-4 text-gray-600">{candidate.city}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-3 py-1 rounded font-semibold ${
                          candidate.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          candidate.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          candidate.status === 'interview' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => navigate(`/dashboard/candidate/${candidate.id}`)}
                          className="text-black hover:underline font-semibold text-sm"
                        >
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Job Postings</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowJobModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                <Plus size={18} />
                New Job
              </motion.button>
            </div>

            {/* Job Postings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobPostings.map((job, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-black transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-black">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.department}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
                      {job.type}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap size={14} />
                      {job.min_education}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 text-black border border-black rounded font-semibold hover:bg-black hover:text-white transition"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="px-3 py-2 text-red-600 border border-red-200 rounded hover:bg-red-50 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full p-6 max-h-96 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">Add New Job</h2>
              <button
                onClick={() => setShowJobModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddJob} className="space-y-3">
              <input
                type="text"
                placeholder="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm"
              />

              <select
                value={newJob.department}
                onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm"
              >
                <option>Produksi</option>
                <option>Marketing</option>
                <option>IT</option>
                <option>HR</option>
              </select>

              <input
                type="date"
                value={newJob.deadline}
                onChange={(e) => setNewJob({...newJob, deadline: e.target.value})}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm"
              />

              <button
                type="submit"
                className="w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Add Job
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HRDDashboard;
