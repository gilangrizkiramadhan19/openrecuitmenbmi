'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Lightbulb, Shield } from 'lucide-react'

const cultureValues = [
  {
    icon: Users,
    title: 'Tim Multinasional',
    description: 'Bekerja dengan tim dari berbagai negara dalam operasional seafood processing global dengan standar internasional.',
  },
  {
    icon: Shield,
    title: 'Food Safety Culture',
    description: 'Budaya keamanan pangan yang ketat - setiap protokol food safety adalah prioritas utama kami setiap hari.',
  },
  {
    icon: Lightbulb,
    title: 'Inovasi Teknologi',
    description: 'Adopt teknologi terbaru dalam cold chain, IoT manufacturing, dan ERP systems untuk efisiensi produksi.',
  },
  {
    icon: Heart,
    title: 'Sustainability Commitment',
    description: 'Komitmen nyata terhadap sustainable seafood practices dan tanggung jawab lingkungan dalam operasional kami.',
  },
]

const galleryItems = [
  { id: 1, title: 'Production Facility Operations', color: 'from-blue-400 to-blue-600' },
  { id: 2, title: 'Cold Storage Management', color: 'from-cyan-400 to-cyan-600' },
  { id: 3, title: 'Quality Control Lab', color: 'from-green-400 to-green-600' },
  { id: 4, title: 'Team Collaboration', color: 'from-purple-400 to-purple-600' },
  { id: 5, title: 'Training & Development', color: 'from-orange-400 to-orange-600' },
  { id: 6, title: 'Export Operations', color: 'from-indigo-400 to-indigo-600' },
]

export function CompanyCultureSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-blue-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary text-balance mb-4">
            Kehidupan & Lingkungan Kerja di BMI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fasilitas modern, budaya food safety, dan lingkungan kerja yang mendukung pertumbuhan profesional dalam industri seafood global
          </p>
        </motion.div>

        {/* Culture Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {cultureValues.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl bg-white p-8 border border-border shadow-corporate hover:shadow-corporate-lg transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-primary mb-8">Galeri Aktivitas</h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="group relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`}></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <h4 className="text-xl font-bold text-white text-balance">
                      {item.title}
                    </h4>
                  </motion.div>
                </div>

                {/* Hover Effect Icon */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <span className="text-2xl">→</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
