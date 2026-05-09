'use client'

import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, Briefcase, BookOpen, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const careerPaths = [
  {
    icon: GraduationCap,
    title: 'Fresh Graduate Program',
    description: 'Program pengembangan bagi lulusan baru dalam industri seafood processing, production, dan quality control.',
    features: ['Mentoring terstruktur', 'Pelatihan food safety', 'Career path yang jelas'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Briefcase,
    title: 'Profesional Berpengalaman',
    description: 'Kesempatan untuk profesional berpengalaman dalam manufacturing, supply chain, dan technology advancement.',
    features: ['Posisi specialist', 'Project leadership', 'International exposure'],
    color: 'from-secondary to-blue-600',
  },
  {
    icon: BookOpen,
    title: 'Program Magang & PKL',
    description: 'Program praktik industri untuk mahasiswa di bidang production planning, QC, dan logistics management.',
    features: ['Real-world experience', 'Industrial training', 'Potential hiring'],
    color: 'from-accent to-cyan-500',
  },
  {
    icon: TrendingUp,
    title: 'Management Development Program',
    description: 'Program pengembangan pemimpin untuk advanced professionals yang akan memimpin tim operations dan strategic initiatives.',
    features: ['Executive training', 'Strategic planning', 'Kepemimpinan global'],
    color: 'from-purple-500 to-pink-500',
  },
]

export function CareerPathsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="careers" className="py-20 bg-gradient-to-b from-background to-blue-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary text-balance mb-4">
            Jalur Karir di Industri Seafood
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilih jalur karir yang sesuai dengan skill dan aspirasimu dalam industri pengolahan seafood yang dinamis dan global
          </p>
        </motion.div>

        {/* Career Path Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {careerPaths.map((path, index) => {
            const Icon = path.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
                className="group rounded-xl bg-white border border-border p-6 shadow-corporate hover:shadow-corporate-lg transition-all duration-300 cursor-pointer overflow-hidden relative"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${path.color} transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${path.color} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {path.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {path.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 pb-6 border-b border-border">
                    {path.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all group/link text-sm">
                    Pelajari Lebih Lanjut
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
