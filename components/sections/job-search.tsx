'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Briefcase, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { locationsAPI, divisionsAPI, experienceLevelsAPI } from '@/lib/api'

interface JobFilters {
  search: string
  location: string
  division: string
  experienceLevel: string
}

interface Location {
  id: number
  name: string
}

interface Division {
  id: number
  name: string
}

interface ExperienceLevel {
  id: number
  name: string
}

export function JobSearchSection({ onSearch }: { onSearch?: (filters: JobFilters) => void }) {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    division: '',
    experienceLevel: '',
  })

  const [locations, setLocations] = useState<Location[]>([])
  const [divisions, setDivisions] = useState<Division[]>([])
  const [experienceLevels, setExperienceLevels] = useState<ExperienceLevel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setIsLoading(true)
        const [locRes, divRes, expRes] = await Promise.all([
          locationsAPI.getAll(),
          divisionsAPI.getAll(),
          experienceLevelsAPI.getAll(),
        ])

        setLocations(locRes.data.data || [])
        setDivisions(divRes.data.data || [])
        setExperienceLevels(expRes.data.data || [])
      } catch (error) {
        console.error('Error fetching filter options:', error)
        // Fallback data
        setLocations([
          { id: 1, name: 'Jakarta' },
          { id: 2, name: 'Surabaya' },
          { id: 3, name: 'Bandung' },
        ])
        setDivisions([
          { id: 1, name: 'Teknologi' },
          { id: 2, name: 'Operasional' },
          { id: 3, name: 'Keuangan' },
        ])
        setExperienceLevels([
          { id: 1, name: 'Fresh Graduate' },
          { id: 2, name: 'Berpengalaman' },
          { id: 3, name: 'Manager' },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFilterOptions()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(filters)
  }

  const handleFilterChange = (field: keyof JobFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="relative py-12 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg border border-border"
        >
          {/* Title */}
          <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
            <Filter className="h-6 w-6 text-secondary" />
            Cari Lowongan Pekerjaan
          </h2>

          {/* Search Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* Job Title Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-primary mb-2">
                Posisi / Keahlian
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari posisi yang diinginkan..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Lokasi
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="">Semua Lokasi</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Division Filter */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Divisi
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                <select
                  value={filters.division}
                  onChange={(e) => handleFilterChange('division', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="">Semua Divisi</option>
                  {divisions.map((div) => (
                    <option key={div.id} value={div.id}>
                      {div.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Experience Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Level
              </label>
              <select
                value={filters.experienceLevel}
                onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">Semua Level</option>
                {experienceLevels.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-secondary to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-secondary/40 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              Cari Lowongan
            </button>
            <button
              type="reset"
              onClick={() => setFilters({ search: '', location: '', division: '', experienceLevel: '' })}
              className="px-8 py-3 border-2 border-border text-primary font-semibold rounded-lg hover:bg-muted transition-colors"
            >
              Reset
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
