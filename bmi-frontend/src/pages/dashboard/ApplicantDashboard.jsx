import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  Briefcase,
  GraduationCap,
  MapPin,
  User,
  Edit3,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import api from '../../axios';

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [myApps, setMyApps] = useState([]);
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const profileRes = await api.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(profileRes.data.data);

        const appsRes = await api.get('/my-applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyApps(appsRes.data.data || []);

        const jobsRes = await api.get('/jobs?limit=3');
        setLatestJobs(jobsRes.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const completeness = profile
    ? Math.round((Object.values(profile).filter(v => v).length / Object.keys(profile).length) * 100)
    : 0;

  const stats = [
    { label: 'Applications', value: myApps.length, icon: FileText },
    { label: 'Interviews', value: myApps.filter(a => a.status === 'interview').length, icon: Calendar },
    { label: 'Profile Complete', value: `${completeness}%`, icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar userRole="applicant" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {profile?.full_name || 'User'}</p>
            </div>
            {profile && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/dashboard/profile')}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                <Edit3 size={18} />
                Edit Profile
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Profile Card */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
                {profile?.photo ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${profile.photo}`}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="text-white" size={32} />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">{profile.full_name}</h2>
                <p className="text-gray-600">{profile.last_education}</p>
                <p className="text-gray-500 text-sm">{profile.city}, {profile.province}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
                <span className="text-lg font-bold text-black">{completeness}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completeness}%` }}
                  transition={{ duration: 1.5 }}
                  className="bg-black h-3 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-black transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-black">{stat.value}</p>
                </div>
                <stat.icon className="text-black opacity-40" size={32} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* My Applications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-black flex items-center gap-2">
              <Briefcase size={28} />
              My Applications
            </h2>
            <button
              onClick={() => navigate('/dashboard/applications')}
              className="text-black font-semibold hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight size={18} />
            </button>
          </div>

          {myApps.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
              <Briefcase className="mx-auto mb-3 text-gray-400" size={32} />
              <p className="text-gray-600 font-semibold">No applications yet</p>
              <p className="text-gray-500 text-sm mb-4">Start applying to jobs to track your progress</p>
              <button
                onClick={() => navigate('/jobs')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Browse Jobs
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {myApps.slice(0, 5).map((app, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-black transition flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-black">{app.job?.title}</h3>
                    <p className="text-sm text-gray-600">{app.job?.department}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Applied on {new Date(app.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      app.status === 'interview' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recommended Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-black flex items-center gap-2">
              <Sparkles size={28} />
              Recommended Jobs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestJobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-black transition cursor-pointer"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <h3 className="font-semibold text-black mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{job.department}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <MapPin size={14} />
                  {job.location}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/jobs/${job.id}`);
                  }}
                  className="w-full py-2 bg-black text-white rounded font-semibold hover:bg-gray-800 transition text-sm"
                >
                  View Job
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
