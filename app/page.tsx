'use client'

import { useState } from 'react'
import { TopBanner } from '@/components/layout/top-banner'
import { Navbar } from '@/components/layout/navbar'
import { HeroSection } from '@/components/sections/hero'
import { JobSearchSection } from '@/components/sections/job-search'
import { JobListingsSection } from '@/components/sections/job-listings'
import { AboutBMISection } from '@/components/sections/about-bmi'
import { CareerPathsSection } from '@/components/sections/career-paths'
import { CompanyCultureSection } from '@/components/sections/company-culture'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { ArticlesSection } from '@/components/sections/articles'
import { FinalCTASection } from '@/components/sections/cta-final'
import { Footer } from '@/components/layout/footer'

interface JobFilters {
  search: string
  location: string
  division: string
  experienceLevel: string
}

export default function Home() {
  const [jobFilters, setJobFilters] = useState<JobFilters>({
    search: '',
    location: '',
    division: '',
    experienceLevel: '',
  })

  const handleJobSearch = (filters: JobFilters) => {
    setJobFilters(filters)
    // Scroll to job listings
    const element = document.getElementById('jobs')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="w-full bg-background">
      {/* Layout Components */}
      <TopBanner />
      <Navbar />

      {/* Sections */}
      <HeroSection />
      <JobSearchSection onSearch={handleJobSearch} />
      <JobListingsSection filters={jobFilters} />
      <AboutBMISection />
      <CareerPathsSection />
      <CompanyCultureSection />
      <TestimonialsSection />
      <ArticlesSection />
      <FinalCTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
