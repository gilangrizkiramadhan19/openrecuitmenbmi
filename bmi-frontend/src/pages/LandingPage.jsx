import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Check, Briefcase, Fish, Globe, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import Button from '../components/Button';

export default function LandingPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const jobs = [
    {
      id: 1,
      title: 'Senior Process Engineer',
      department: 'Operations',
      location: 'Bekasi, Indonesia',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'Lead our seafood processing operations with advanced quality control standards. Must have 7+ years experience in food manufacturing.',
      applicants: 45,
    },
    {
      id: 2,
      title: 'Export Logistics Manager',
      department: 'Supply Chain',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      posted: '5 days ago',
      description: 'Manage international seafood export operations and customs compliance. Experience in logistics and international trade required.',
      applicants: 28,
    },
    {
      id: 3,
      title: 'Quality Assurance Specialist',
      department: 'Quality Control',
      location: 'Bekasi, Indonesia',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Ensure highest food safety and quality standards for export products. ISO certification and food science background required.',
      applicants: 32,
    },
    {
      id: 4,
      title: 'International Sales Executive',
      department: 'Sales',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Build relationships with international buyers and expand market presence. Bilingual skills and export experience required.',
      applicants: 38,
    },
    {
      id: 5,
      title: 'Production Planning Coordinator',
      department: 'Planning',
      location: 'Bekasi, Indonesia',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Optimize production schedules and inventory management. ERP system experience and analytical skills required.',
      applicants: 25,
    },
    {
      id: 6,
      title: 'Finance & Accounting Officer',
      department: 'Finance',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      posted: '4 days ago',
      description: 'Support financial operations for international export business. Knowledge of trade finance and FX management required.',
      applicants: 19,
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'Bagaimana cara melamar posisi di PT Bumi Menara Internusa?',
      answer: 'Klik tombol "Lamar Sekarang" pada lowongan pilihan, buat atau masuk akun Anda, dan lengkapi formulir aplikasi. Anda dapat melacak status aplikasi di dashboard pribadi Anda.',
    },
    {
      id: 2,
      question: 'Berapa lama proses rekrutmen biasanya?',
      answer: 'Proses rekrutmen kami biasanya memakan waktu 2-4 minggu dari aplikasi hingga penawaran. Ini termasuk penyaringan awal, wawancara, dan ronde penilaian akhir.',
    },
    {
      id: 3,
      question: 'Bisakah saya melamar beberapa posisi?',
      answer: 'Ya, Anda dapat melamar beberapa posisi. Kami mendorong Anda untuk melamar peran yang sesuai dengan keterampilan dan pengalaman Anda.',
    },
    {
      id: 4,
      question: 'Apakah ada program magang?',
      answer: 'Ya, kami menawarkan program magang sepanjang tahun. Silakan periksa halaman karir kami untuk peluang magang saat ini.',
    },
    {
      id: 5,
      question: 'Apa manfaat karyawan PT BMI?',
      answer: 'Kami menawarkan gaji kompetitif, asuransi kesehatan, pengembangan profesional, pengaturan kerja fleksibel, dan lingkungan kerja kolaboratif.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="bg-bmi-soft min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Maritime Atmosphere */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-64 h-64 bg-bmi-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-bmi-cyan/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-bmi-cyan/10 border border-bmi-cyan/30 text-bmi-navy rounded-full text-sm font-semibold">
                  Peluang Karir Premium
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-bmi-navy mb-6 leading-tight text-balance">
                Bangun Karir Anda Bersama{' '}
                <span className="bg-gradient-to-r from-bmi-navy to-bmi-blue bg-clip-text text-transparent">
                  PT Bumi Menara Internusa
                </span>
              </h1>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                Bergabunglah dengan perusahaan seafood processing dan ekspor terkemuka di Indonesia. Kami mencari talenta profesional untuk memperkuat tim kami di operasi modern dengan standar internasional.
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Lamar Sekarang
                      <ChevronDown size={20} className="rotate-90" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.button
                  variants={itemVariants}
                  className="border-2 border-bmi-navy text-bmi-navy px-8 py-3 rounded-lg font-semibold hover:bg-bmi-soft transition-all duration-300"
                >
                  Pelajari Lebih Lanjut
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="mt-16 grid grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="group">
                  <p className="text-4xl font-bold text-bmi-navy group-hover:text-bmi-blue transition">120+</p>
                  <p className="text-sm text-slate-600 mt-2 font-medium">Lowongan Aktif</p>
                </motion.div>
                <motion.div variants={itemVariants} className="group">
                  <p className="text-4xl font-bold text-bmi-navy group-hover:text-bmi-blue transition">5K+</p>
                  <p className="text-sm text-slate-600 mt-2 font-medium">Pelamar Aktif</p>
                </motion.div>
                <motion.div variants={itemVariants} className="group">
                  <p className="text-4xl font-bold text-bmi-navy group-hover:text-bmi-blue transition">100%</p>
                  <p className="text-sm text-slate-600 mt-2 font-medium">Transparan</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Visual - Maritime Theme */}
            <motion.div
              className="hidden md:flex justify-center items-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative w-full aspect-square flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-bmi-blue/20 to-bmi-navy/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/50 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20">
                  <motion.div
                    className="flex flex-col items-center justify-center gap-6"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      className="w-24 h-24 bg-gradient-to-br from-bmi-navy to-bmi-blue rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Fish size={56} className="text-white" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-bmi-navy font-bold text-2xl">Industri Perikanan</p>
                      <p className="text-slate-600 text-sm mt-2">Export Kelas Dunia</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bmi-navy mb-4">
              Lowongan Unggulan
            </h2>
            <p className="text-xl text-slate-700">
              Temukan peran yang sempurna untuk mengembangkan karir Anda bersama kami
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <button className="text-bmi-navy font-semibold hover:text-bmi-blue transition flex items-center gap-2 mx-auto group">
              Lihat Semua Lowongan
              <ChevronDown size={20} className="rotate-90 group-hover:translate-x-1 transition" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Recruitment Process Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bmi-navy mb-4">
              Proses Rekrutmen Kami
            </h2>
            <p className="text-xl text-slate-700">
              Langkah-langkah transparan untuk perjalanan karir Anda
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                number: '1',
                title: 'Lamar',
                description: 'Kirimkan aplikasi dan resume Anda',
                icon: Briefcase,
              },
              {
                number: '2',
                title: 'Penyaringan',
                description: 'Kami meninjau kualifikasi Anda',
                icon: Check,
              },
              {
                number: '3',
                title: 'Wawancara',
                description: 'Bertemu dengan tim kami',
                icon: Award,
              },
              {
                number: '4',
                title: 'Penawaran',
                description: 'Terima dan negosiasikan penawaran',
                icon: TrendingUp,
              },
            ].map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative group"
                >
                  <div className="bg-white border-2 border-bmi-navy rounded-2xl p-8 text-center h-full hover:shadow-lg hover:border-bmi-blue transition-all duration-300">
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-bmi-navy to-bmi-blue text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <IconComponent size={28} />
                    </motion.div>
                    <h3 className="font-bold text-bmi-navy mb-3 text-lg">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 right-0 w-8 h-1 bg-gradient-to-r from-bmi-blue to-bmi-cyan transform translate-x-full -translate-y-1/2" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bmi-soft">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bmi-navy mb-4">
              Budaya Perusahaan Kami
            </h2>
            <p className="text-xl text-slate-700">
              Nilai-nilai yang memandu setiap keputusan kami
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Globe,
                title: 'Standar Internasional',
                description: 'Kami berkomitmen pada kualitas kelas dunia dalam setiap aspek operasi kami.',
              },
              {
                icon: Fish,
                title: 'Keberlanjutan',
                description: 'Praktik perikanan berkelanjutan untuk masa depan yang lebih baik.',
              },
              {
                icon: Award,
                title: 'Keunggulan',
                description: 'Kami mengejar keunggulan dalam inovasi dan kepemimpinan industri.',
              },
            ].map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-bmi-navy to-bmi-blue rounded-full flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.2 }}
                  >
                    <IconComponent size={24} className="text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-bmi-navy mb-3">{value.title}</h3>
                  <p className="text-slate-700">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-bmi-navy mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-xl text-slate-700">
              Temukan jawaban atas pertanyaan umum tentang rekrutmen kami
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq) => (
              <motion.button
                key={faq.id}
                variants={itemVariants}
                onClick={() =>
                  setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                }
                className="w-full bg-bmi-soft border-2 border-transparent rounded-xl p-6 text-left hover:border-bmi-blue hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-bmi-navy text-lg">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      size={20}
                      className="text-bmi-blue"
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedFaq === faq.id ? 1 : 0,
                    height: expandedFaq === faq.id ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-slate-700 mt-4 text-base">{faq.answer}</p>
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-bmi-navy to-bmi-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-10 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Siap Memulai Karir Anda?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Bergabunglah dengan tim profesional PT Bumi Menara Internusa dan tumbuh bersama kami.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-bmi-navy hover:bg-bmi-soft"
              >
                Lamar Sekarang
                <ChevronDown size={20} className="rotate-90" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
