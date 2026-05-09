'use client'

import { useState, useEffect } from 'react'
import { MapPin, Briefcase, Clock, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { jobsAPI } from '@/lib/api'
import Link from 'next/link'

interface Job {
  id: number
  title: string
  location: string
  division: string
  job_type: string
  experience_level: string
  salary_range?: string
  description?: string
}

interface JobFilters {
  search: string
  location: string
  division: string
  experienceLevel: string
}

export function JobListingsSection({ filters }: { filters?: JobFilters }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const params: any = {}
        if (filters?.location) params.location = filters.location
        if (filters?.division) params.division = filters.division
        if (filters?.experienceLevel) params.experience_level = filters.experienceLevel
        if (filters?.search) params.search = filters.search

        const response = await jobsAPI.getAll(params)
        setJobs(response.data.data || [])
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setError('Gagal memuat lowongan pekerjaan. Silakan coba lagi.')
        // Fallback dummy data - Seafood Industry Positions
        setJobs([
          {
            id: 1,
            title: 'Quality Control Staff',
            location: 'Lampung',
            division: 'Quality Control & Food Safety',
            job_type: 'Full-time',
            experience_level: 'Fresh Graduate',
            salary_range: 'Rp 4-5.5 Juta',
            description: 'Memastikan standar kualitas produk seafood sesuai dengan regulasi internasional dan food safety compliance.',
          },
          {
            id: 2,
            title: 'Cold Chain Supervisor',
            location: 'Surabaya',
            division: 'Production & Manufacturing',
            job_type: 'Full-time',
            experience_level: 'Berpengalaman',
            salary_range: 'Rp 6-8 Juta',
            description: 'Supervisi operasi cold storage dan cold chain management untuk menjaga integritas produk frozen seafood.',
          },
          {
            id: 3,
            title: 'Production Planning Analyst',
            location: 'Makassar',
            division: 'Production & Manufacturing',
            job_type: 'Full-time',
            experience_level: 'Berpengalaman',
            salary_range: 'Rp 6-8 Juta',
            description: 'Analisis dan optimalisasi produksi seafood processing untuk efisiensi dan kualitas produk.',
          },
          {
            id: 4,
            title: 'Supply Chain Officer',
            location: 'Lampung',
            division: 'Supply Chain & Logistics',
            job_type: 'Full-time',
            experience_level: 'Berpengalaman',
            salary_range: 'Rp 5-7 Juta',
            description: 'Kelola logistik, procurement, dan supply chain untuk operasional seafood processing yang efektif.',
          },
          {
            id: 5,
            title: 'Food Safety Compliance Officer',
            location: 'Lampung',
            division: 'Quality Control & Food Safety',
            job_type: 'Full-time',
            experience_level: 'Berpengalaman',
            salary_range: 'Rp 7-9 Juta',
            description: 'Memastikan compliance dengan standar food safety internasional (HACCP, ISO 22000, FSSC 22000).',
          },
          {
            id: 6,
            title: 'ERP Manufacturing Specialist',
            location: 'Surabaya',
            division: 'Teknologi & Innovation',
            job_type: 'Full-time',
            experience_level: 'Berpengalaman',
            salary_range: 'Rp 7-10 Juta',
            description: 'Implementasi dan maintenance ERP systems untuk manufacturing dan production management.',
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [filters])

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
      transition: { duration: 0.4 },
    },
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-blue-100 text-secondary'
      case 'contract':
        return 'bg-yellow-100 text-yellow-700'
      case 'internship':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-muted-foreground'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'fresh graduate':
        return 'text-green-600'
      case 'berpengalaman':
        return 'text-blue-600'
      case 'manager':
        return 'text-red-600'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <section id="jobs" className="py-16 bg-gradient-to-b from-blue-50/50 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-primary text-balance">
            Lowongan Karir Kami
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Jelajahi peluang karir dalam industri seafood processing dan export yang dinamis
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-primary mb-2">Tidak Ada Lowongan</h3>
            <p className="text-muted-foreground">
              Coba ubah filter pencarian Anda atau periksa kembali nanti
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="group rounded-xl bg-white p-6 border border-border shadow-corporate transition-all duration-300 hover:shadow-corporate-lg cursor-pointer"
              >
                {/* Top Section with Type Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                      {job.title}
                    </h3>
                  </div>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getTypeColor(job.job_type)}`}>
                    {job.job_type}
                  </span>
                </div>

                {/* Job Details */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                    <span>{job.location}</span>
                  </div>

                  {/* Division */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span>{job.division}</span>
                  </div>

                  {/* Experience Level */}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span className={`font-medium ${getLevelColor(job.experience_level)}`}>
                      {job.experience_level}
                    </span>
                  </div>

                  {/* Salary if available */}
                  {job.salary_range && (
                    <div className="text-sm font-semibold text-secondary pt-2">
                      {job.salary_range}
                    </div>
                  )}
                </div>

                {/* Description */}
                {job.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
                    {job.description}
                  </p>
                )}

                {/* View Detail Link */}
                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all group/link"
                >
                  Lihat Detail
                  <ChevronRight className="h-5 w-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Button */}
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Link
              href="#all-jobs"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
            >
              Lihat Semua Lowongan
              <ChevronRight className="h-5 w-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
