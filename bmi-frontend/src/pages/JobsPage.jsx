import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, Filter, ArrowRight, Clock, ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SkeletonJobCard } from '../animations/Skeleton';
import { fadeInUp, staggerContainer } from '../animations/variants';


export default function JobsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read auth from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userRole = user?.role || null;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/jobs');
        const data = await res.json();
        if (data.success) {
          const published = data.data.filter(j => j.status === 'Publish' || j.status === 'open');
          setJobs(published);
        }
      } catch (err) {
        console.error("Error fetching jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Build categories dynamically from real job data
  const uniqueDepartments = [...new Set(jobs.map(j => j.department).filter(Boolean))];
  const categories = [
    { value: 'all', label: 'Semua Departemen' },
    ...uniqueDepartments.map(dep => ({ value: dep, label: dep }))
  ];

  // Extract unique locations from real data
  const uniqueLocations = [...new Set(jobs.map(j => j.location).filter(Boolean))];
  const locations = [
    { value: 'all', label: 'Semua Lokasi' },
    ...uniqueLocations.map(loc => ({ value: loc, label: loc }))
  ];

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       job.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || job.department === selectedCategory;
    const matchLocation = selectedLocation === 'all' || job.location === selectedLocation;
    return matchSearch && matchCategory && matchLocation;
  });


  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-bmi-soft">
      <Navbar userRole={userRole} showAuth={!userRole} />

      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-br from-bmi-navy via-bmi-blue to-bmi-navy py-12 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <motion.button
            onClick={() => userRole ? navigate('/dashboard/applicant') : navigate('/')}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm"
            whileHover={{ x: -3 }}
          >
            <ChevronLeft size={18} />
            {userRole ? 'Kembali ke Dashboard' : 'Kembali ke Beranda'}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Jelajahi Lowongan Karir</h1>
            <p className="text-white/80 text-lg">Temukan posisi impian Anda di PT Bumi Menara Internusa</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={24} />
              <input
                type="text"
                placeholder="Cari lowongan, skill, atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-bmi-cyan text-slate-900 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className="text-bmi-navy" />
                <h3 className="font-bold text-bmi-navy text-lg">Filter</h3>
              </div>

              {/* Category Filter */}
              <motion.div variants={itemVariants} className="mb-8">
                <h4 className="font-semibold text-bmi-navy mb-4">Kategori</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === cat.value
                          ? 'bg-bmi-blue text-white font-semibold'
                          : 'bg-bmi-soft text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Location Filter */}
              <motion.div variants={itemVariants}>
                <h4 className="font-semibold text-bmi-navy mb-4">Lokasi</h4>
                <div className="space-y-2">
                  {locations.map(loc => (
                    <button
                      key={loc.value}
                      onClick={() => setSelectedLocation(loc.value)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedLocation === loc.value
                          ? 'bg-bmi-blue text-white font-semibold'
                          : 'bg-bmi-soft text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Job Listings */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-bmi-navy">
                {filteredJobs.length} Lowongan Tersedia
              </h2>
            </div>

            {loading ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <SkeletonJobCard />
                  </motion.div>
                ))}
              </motion.div>
            ) : filteredJobs.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    variants={fadeInUp}
                    whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(0,56,150,0.10)' }}
                    className="will-animate"
                  >
                    <Link to={`/jobs/${job.id}`} className="block">
                      <div className="bg-white rounded-2xl p-6 border border-slate-200 border-l-4 border-l-bmi-blue group transition-all duration-200">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-bmi-navy mb-2 group-hover:text-bmi-blue transition-colors duration-200">{job.title}</h3>
                            <p className="text-slate-500 mb-4 text-sm">PT Bumi Menara Internusa</p>

                            <div className="flex flex-wrap gap-4 mb-4">
                              <div className="flex items-center gap-2 text-slate-600">
                                <MapPin size={16} className="text-bmi-cyan" />
                                <span className="text-sm">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-600">
                                <Briefcase size={16} className="text-bmi-cyan" />
                                <span className="text-sm font-medium">{job.type}</span>
                              </div>
                              {job.deadline && (
                                <div className="flex items-center gap-2 text-slate-500">
                                  <Clock size={15} />
                                  <span className="text-sm">Deadline: {new Date(job.deadline).toLocaleDateString('id-ID')}</span>
                                </div>
                              )}
                            </div>

                            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                            <div className="flex flex-wrap gap-2">
                              {job.min_education && (
                                <span className="px-3 py-1 bg-bmi-soft text-bmi-navy text-xs font-semibold rounded-full border border-slate-200">
                                  {job.min_education}
                                </span>
                              )}
                              {job.department && (
                                <span className="px-3 py-1 bg-blue-50 text-bmi-blue text-xs font-semibold rounded-full border border-blue-100">
                                  {job.department}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex-shrink-0 mt-4 md:mt-0">
                            <div className="flex items-center gap-2 text-bmi-blue text-sm font-semibold px-4 py-2 rounded-lg bg-blue-50 group-hover:bg-bmi-blue group-hover:text-white transition-all duration-200">
                              Lihat Detail <ArrowRight size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-slate-200 p-16 text-center"
              >
                <div className="animate-float inline-block mb-6">
                  <Briefcase size={56} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">Tidak ada lowongan ditemukan</h3>
                <p className="text-slate-500">Coba ubah filter atau cari dengan kata kunci lain</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
