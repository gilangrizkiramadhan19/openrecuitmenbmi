'use client'

import Link from 'next/link'
import { ArrowRight, Briefcase, Users, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const stats = [
    { number: '24+', label: 'Tahun Pengalaman' },
    { number: '3', label: 'Lokasi Operasional' },
    { number: '2500+', label: 'Talenta Profesional' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section id="home" className="relative min-h-screen w-full bg-gradient-to-br from-background via-background to-blue-50 overflow-hidden pt-12 pb-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30"
              >
                <span className="flex h-2 w-2 rounded-full bg-secondary"></span>
                <span className="text-sm font-medium text-secondary">Kami Sedang Merekrut</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-tight text-balance">
                Bangun Karir Global dalam Industri{' '}
                <span className="bg-gradient-to-r from-secondary to-blue-600 bg-clip-text text-transparent">
                  Seafood
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Bergabunglah dengan PT Bumi Menara Internusa, perusahaan pengolahan dan ekspor seafood terkemuka. Kami menawarkan peluang karir yang menantang dalam industri food processing dengan standar internasional, inovasi teknologi, dan komitmen pada food safety serta sustainability.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="#jobs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-secondary text-white font-semibold hover:shadow-xl hover:shadow-secondary/40 transition-all duration-300 hover:scale-105"
              >
                Lihat Lowongan
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-secondary text-secondary font-semibold hover:bg-secondary/5 transition-colors duration-300"
              >
                Daftar Sekarang
                <CheckCircle className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-secondary">{stat.number}</div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual - Illustration Placeholder */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative h-96 w-full"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 border border-secondary/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10 rounded-2xl"></div>
                
                {/* Hero Illustration */}
                <div className="relative z-10 flex items-center justify-center gap-8">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="h-32 w-32 rounded-full bg-gradient-to-br from-secondary to-blue-600 flex items-center justify-center"
                  >
                    <Briefcase className="h-16 w-16 text-white" />
                  </motion.div>

                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="h-24 w-24 rounded-full bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center"
                  >
                    <Users className="h-12 w-12 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg border border-border max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">Proses Transparan</p>
                  <p className="text-xs text-muted-foreground">Tidak ada biaya pendaftaran</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
