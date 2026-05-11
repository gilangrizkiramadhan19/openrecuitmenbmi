import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Briefcase, Filter, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Quality Assurance Manager',
      company: 'PT Bumi Menara Internusa',
      location: 'Bekasi, Jawa Barat',
      salary: '8-12 Juta',
      category: 'management',
      description: 'Mengelola tim QA dan memastikan standar kualitas produk seafood.',
      requirements: ['5+ tahun pengalaman', 'Sertifikasi HACCP', 'Leadership skills']
    },
    {
      id: 2,
      title: 'Production Supervisor',
      company: 'PT Bumi Menara Internusa',
      location: 'Bekasi, Jawa Barat',
      salary: '5-7 Juta',
      category: 'production',
      description: 'Supervisi proses produksi dan optimasi efisiensi pabrik.',
      requirements: ['3+ tahun pengalaman', 'Sertifikasi ISO 22000', 'Technical skills']
    },
    {
      id: 3,
      title: 'Export Specialist',
      company: 'PT Bumi Menara Internusa',
      location: 'Jakarta, DKI Jakarta',
      salary: '6-9 Juta',
      category: 'sales',
      description: 'Menangani operasi ekspor dan membangun hubungan dengan buyer internasional.',
      requirements: ['2+ tahun pengalaman ekspor', 'Bahasa Inggris lancar', 'Networking skills']
    },
    {
      id: 4,
      title: 'Supply Chain Analyst',
      company: 'PT Bumi Menara Internusa',
      location: 'Bekasi, Jawa Barat',
      salary: '5-8 Juta',
      category: 'operations',
      description: 'Menganalisis dan optimasi supply chain untuk efisiensi maksimal.',
      requirements: ['3+ tahun pengalaman', 'Excel advanced', 'Problem solving']
    },
    {
      id: 5,
      title: 'Food Safety Officer',
      company: 'PT Bumi Menara Internusa',
      location: 'Bekasi, Jawa Barat',
      salary: '4-6 Juta',
      category: 'production',
      description: 'Memastikan keamanan pangan dan compliance dengan regulasi internasional.',
      requirements: ['2+ tahun pengalaman', 'HACCP certified', 'Attention to detail']
    },
    {
      id: 6,
      title: 'Marketing Manager',
      company: 'PT Bumi Menara Internusa',
      location: 'Jakarta, DKI Jakarta',
      salary: '7-10 Juta',
      category: 'sales',
      description: 'Mengembangkan strategi marketing dan brand positioning di pasar internasional.',
      requirements: ['4+ tahun pengalaman', 'Digital marketing knowledge', 'Creative thinking']
    },
    {
      id: 7,
      title: 'Laboratory Technician',
      company: 'PT Bumi Menara Internusa',
      location: 'Bekasi, Jawa Barat',
      salary: '3-5 Juta',
      category: 'technical',
      description: 'Melakukan pengujian kualitas dan analisis produk seafood.',
      requirements: ['1+ tahun pengalaman', 'D3/S1 Teknologi Pangan', 'Analytical skills']
    },
    {
      id: 8,
      title: 'Human Resources Officer',
      company: 'PT Bumi Menara Internusa',
      location: 'Bekasi, Jawa Barat',
      salary: '4-6 Juta',
      category: 'management',
      description: 'Mengelola recruitment, training, dan employee relations.',
      requirements: ['2+ tahun pengalaman HR', 'Strong communication', 'HRIS knowledge']
    },
  ];

  const categories = [
    { value: 'all', label: 'Semua Posisi' },
    { value: 'management', label: 'Manajemen' },
    { value: 'production', label: 'Produksi' },
    { value: 'sales', label: 'Penjualan' },
    { value: 'operations', label: 'Operasional' },
    { value: 'technical', label: 'Teknis' }
  ];

  const locations = [
    { value: 'all', label: 'Semua Lokasi' },
    { value: 'bekasi', label: 'Bekasi' },
    { value: 'jakarta', label: 'Jakarta' }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchLocation = selectedLocation === 'all' || 
                         job.location.toLowerCase().includes(
                           locations.find(l => l.value === selectedLocation)?.label.toLowerCase() || ''
                         );
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
      <Navbar showAuth={true} />

      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-br from-bmi-navy via-bmi-blue to-bmi-navy py-12 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="mb-8">
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

            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    custom={idx}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: idx * 0.05, duration: 0.6 },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link to={`/login`}>
                      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6 cursor-pointer border-l-4 border-bmi-blue">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-bmi-navy mb-2">{job.title}</h3>
                            <p className="text-slate-600 mb-4">{job.company}</p>

                            <div className="flex flex-wrap gap-4 mb-4">
                              <div className="flex items-center gap-2 text-slate-700">
                                <MapPin size={18} className="text-bmi-cyan" />
                                <span className="text-sm">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-700">
                                <DollarSign size={18} className="text-bmi-cyan" />
                                <span className="text-sm font-semibold">{job.salary}</span>
                              </div>
                            </div>

                            <p className="text-slate-600 text-sm mb-4">{job.description}</p>

                            <div className="flex flex-wrap gap-2">
                              {job.requirements.slice(0, 2).map((req, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-bmi-soft text-bmi-navy text-xs font-semibold rounded-full"
                                >
                                  {req}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex-shrink-0">
                            <div className="text-bmi-blue hover:text-bmi-navy transition flex items-center gap-2 font-semibold">
                              Lamar <ArrowRight size={20} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm p-12 text-center"
              >
                <Briefcase size={48} className="mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">Tidak ada lowongan yang ditemukan</h3>
                <p className="text-slate-600">Coba ubah filter atau cari dengan kata kunci lain</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
