import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Check,
  Briefcase,
  Users,
  TrendingUp,
  ArrowRight,
  MapPin,
  Clock,
  Plus,
  ChevronUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import api from '../axios';

export default function LandingPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        const publishedJobs = (response.data.data || [])
          .filter((job) => job.status === 'Publish' || job.status === 'open')
          .slice(0, 6)
          .map((job) => {
            const date = new Date(job.created_at);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return {
              ...job,
              posted: diffDays === 1 ? 'Hari ini' : `${diffDays} hari lalu`,
              applicants: job.applications_count || 0,
            };
          });
        setJobs(publishedJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const faqs = [
    {
      id: 1,
      question: 'Bagaimana cara melamar posisi di PT Bumi Menara Internusa?',
      answer:
        'Klik tombol "Lamar Sekarang" pada lowongan pilihan, buat atau masuk akun Anda, dan lengkapi formulir aplikasi. Anda dapat melacak status aplikasi di dashboard pribadi Anda.',
    },
    {
      id: 2,
      question: 'Berapa lama proses rekrutmen biasanya?',
      answer:
        'Proses rekrutmen kami biasanya memakan waktu 2-4 minggu dari aplikasi hingga penawaran. Ini termasuk penyaringan awal, wawancara, dan ronde penilaian akhir.',
    },
    {
      id: 3,
      question: 'Bisakah saya melamar beberapa posisi?',
      answer:
        'Ya, Anda dapat melamar beberapa posisi. Kami mendorong Anda untuk melamar peran yang sesuai dengan keterampilan dan pengalaman Anda.',
    },
    {
      id: 4,
      question: 'Apakah ada program magang?',
      answer:
        'Ya, kami menawarkan program magang sepanjang tahun. Silakan periksa halaman karir kami untuk peluang magang saat ini.',
    },
    {
      id: 5,
      question: 'Apa manfaat karyawan PT BMI?',
      answer:
        'Kami menawarkan gaji kompetitif, asuransi kesehatan, pengembangan profesional, pengaturan kerja fleksibel, dan lingkungan kerja kolaboratif.',
    },
  ];

  const recruitmentSteps = [
    {
      id: 1,
      title: 'Aplikasi',
      description: 'Isi formulir aplikasi dengan detail lengkap',
      icon: Briefcase,
    },
    {
      id: 2,
      title: 'Penyaringan',
      description: 'Tim HR meninjau kualifikasi Anda',
      icon: Check,
    },
    {
      id: 3,
      title: 'Wawancara',
      description: 'Wawancara dengan tim manajemen',
      icon: Users,
    },
    {
      id: 4,
      title: 'Penawaran',
      description: 'Terima penawaran dan bergabunglah dengan tim',
      icon: TrendingUp,
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col">
      <Navbar />

      {/* ========================================
          HERO SECTION
          ======================================== */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Left Content */}
            <motion.div variants={fadeInUp} className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="primary" size="md">
                  Peluang Karir Premium
                </Badge>
              </motion.div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight text-balance">
                  Bangun Karir{' '}
                  <span className="bg-gradient-to-r from-primary via-blue-600 to-cyan bg-clip-text text-transparent">
                    Impian Anda
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-lg">
                  Bergabunglah dengan PT Bumi Menara Internusa, pemimpin industri seafood processing di Indonesia. Kami mencari talenta terbaik untuk memperkuat tim global kami.
                </p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeInUp} className="flex-1 sm:flex-none">
                  <Link to="/register" className="w-full">
                    <Button size="lg" fullWidth className="sm:w-auto">
                      Mulai Aplikasi
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex-1 sm:flex-none">
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    className="sm:w-auto"
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-3 gap-6 pt-12"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { label: 'Lowongan Aktif', value: '120+' },
                  { label: 'Pelamar Aktif', value: '5K+' },
                  { label: 'Tingkat Sukses', value: '98%' },
                ].map((stat) => (
                  <motion.div key={stat.label} variants={fadeInUp} className="group">
                    <p className="text-3xl md:text-4xl font-bold text-primary group-hover:text-primary-600 transition">
                      {stat.value}
                    </p>
                    <p className="text-sm text-neutral-600 mt-2 font-medium">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              variants={fadeInUp}
              className="hidden lg:flex justify-center items-center relative"
            >
              <motion.div
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full aspect-square max-w-md flex items-center justify-center"
              >
                {/* Gradient orb */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-cyan/10 to-transparent rounded-full blur-3xl" />

                {/* Card */}
                <motion.div
                  className="relative bg-white/60 glass rounded-3xl p-12 shadow-glass border border-white/40"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex flex-col items-center justify-center gap-6"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                      className="w-28 h-28 bg-gradient-to-br from-primary to-cyan rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Briefcase className="w-14 h-14 text-white" />
                    </motion.div>
                    <div className="text-center space-y-2">
                      <p className="text-primary font-bold text-2xl">Karir Global</p>
                      <p className="text-neutral-600 text-sm">
                        Standar Internasional
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          FEATURED JOBS SECTION
          ======================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="cyan" size="md" className="justify-center">
              Peluang Terbaru
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Lowongan Unggulan
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Temukan peran yang sempurna untuk mengembangkan karir Anda bersama tim profesional kami
            </p>
          </motion.div>

          {/* Jobs Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {loading ? (
              <div className="col-span-full flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <motion.div key={job.id} variants={fadeInUp}>
                  <JobCard job={job} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-neutral-500">
                <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Belum ada lowongan yang tersedia saat ini</p>
              </div>
            )}
          </motion.div>

          {/* View All Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/jobs">
              <Button variant="ghost" className="group">
                Lihat Semua Lowongan
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          RECRUITMENT PROCESS SECTION
          ======================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" size="md" className="justify-center">
              Proses Transparan
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Proses Rekrutmen Kami
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Langkah-langkah sederhana menuju peluang karir di perusahaan kami
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Desktop connector line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan to-transparent" />

            {recruitmentSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  variants={fadeInUp}
                  className="relative"
                >
                  {/* Step number circle */}
                  <div className="relative z-10 mb-6 flex justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/20 rounded-full" />
                      <div className="relative bg-white border-4 border-primary rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-neutral-900">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Step indicator */}
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <span className="text-sm font-semibold text-primary">
                      Langkah {index + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================================
          WHY BMI SECTION
          ======================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="success" size="md" className="justify-center">
              Keunggulan Kompetitif
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Mengapa Bergabung dengan BMI?
            </h2>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: 'Gaji Kompetitif',
                description:
                  'Paket kompensasi yang kompetitif dengan bonus kinerja dan tunjangan kesejahteraan',
              },
              {
                title: 'Asuransi Kesehatan',
                description:
                  'Perlindungan kesehatan komprehensif untuk karyawan dan keluarga',
              },
              {
                title: 'Pengembangan Karir',
                description:
                  'Program pelatihan dan mentoring untuk pertumbuhan profesional berkelanjutan',
              },
              {
                title: 'Fleksibilitas Kerja',
                description:
                  'Opsi kerja fleksibel dan keseimbangan kehidupan kerja yang optimal',
              },
              {
                title: 'Lingkungan Modern',
                description:
                  'Fasilitas kantor modern dengan standar internasional dan teknologi terkini',
              },
              {
                title: 'Tim Profesional',
                description:
                  'Bekerja dengan tim yang berdedikasi dan berbakat dari berbagai latar belakang',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card p-8 group hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center group-hover:bg-success/20 transition">
                    <Check className="w-6 h-6 text-success" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-neutral-900">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================
          FAQ SECTION
          ======================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="info" size="md" className="justify-center">
              Pertanyaan Umum
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              FAQ
            </h2>
            <p className="text-lg text-neutral-600">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang proses aplikasi kami
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={fadeInUp}
                className="card overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition group"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 text-left">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{
                      rotate: expandedFaq === faq.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronUp className="h-6 w-6 text-neutral-600" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedFaq === faq.id ? 'auto' : 0,
                    opacity: expandedFaq === faq.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-neutral-200"
                >
                  <p className="px-6 py-4 text-neutral-600">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA SECTION
          ======================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary-600">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Siap Memulai Perjalanan Karir Anda?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Jangan lewatkan kesempatan untuk bergabung dengan tim profesional kami. Lamar sekarang dan raih masa depan yang cerah.
          </p>
          <Link to="/register">
            <Button
              size="lg"
              variant="secondary"
              className="mx-auto"
              icon={ArrowRight}
              iconPosition="right"
            >
              Lamar Sekarang
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
