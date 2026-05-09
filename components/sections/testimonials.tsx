'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonialsAPI } from '@/lib/api'

interface Testimonial {
  id: number
  name: string
  position: string
  company?: string
  message: string
  image?: string
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Fallback testimonials - Seafood Industry
  const fallbackTestimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Budi Santoso',
      position: 'Quality Control Supervisor',
      company: 'Lampung Facility',
      message: 'Bekerja di BMI memberikan pengalaman luar biasa dalam industri seafood. Standar food safety yang ketat membuat saya berkembang menjadi profesional yang lebih baik. Rekan kerja sangat supportive dalam setiap project.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      position: 'Supply Chain Manager',
      company: 'Surabaya Facility',
      message: 'Kesempatan untuk bekerja dengan supply chain global di industri seafood adalah dream come true. BMI memberikan tools dan mentoring untuk berkembang dan lead tim yang lebih besar. Sangat appreciate supportnya.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
    },
    {
      id: 3,
      name: 'Ahmad Wijaya',
      position: 'IoT Cold Storage Specialist',
      company: 'Makassar Facility',
      message: 'Inovasi teknologi di BMI sangat advanced. Saya berkesempatan bekerja dengan IoT systems untuk cold chain management - pengalaman yang jarang di industri. Career growth kami jelas dan terstruktur.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
    },
    {
      id: 4,
      name: 'Dina Handayani',
      position: 'Production Planning Analyst',
      company: 'Lampung Facility',
      message: 'BMI peduli bukan hanya pada profit tapi juga sustainability dan food safety. Program pelatihan mereka sangat comprehensive dan relevan dengan export standards internasional yang kami penuhi.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dina',
    },
  ]

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true)
        const response = await testimonialsAPI.getAll()
        if (response.data.data && response.data.data.length > 0) {
          setTestimonials(response.data.data)
        } else {
          setTestimonials(fallbackTestimonials)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        setTestimonials(fallbackTestimonials)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials
  const nextIndex = (currentIndex + 1) % displayTestimonials.length
  const prevIndex = (currentIndex - 1 + displayTestimonials.length) % displayTestimonials.length

  const goToNext = () => setCurrentIndex(nextIndex)
  const goToPrev = () => setCurrentIndex(prevIndex)

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-96 bg-muted rounded-xl animate-pulse"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/50 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary text-balance mb-4">
            Cerita Dari Karyawan Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dengarkan pengalaman langsung dari rekan kerja kami tentang perjalanan karir mereka
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white p-8 sm:p-12 border border-border shadow-lg"
            >
              {/* Quote Icon */}
              <Quote className="h-12 w-12 text-secondary/30 mb-6" />

              {/* Testimonial Message */}
              <p className="text-xl sm:text-2xl text-foreground leading-relaxed italic mb-8 text-balance">
                {`"${displayTestimonials[currentIndex].message}"`}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-8 border-t border-border">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-secondary flex-shrink-0 bg-muted">
                  {displayTestimonials[currentIndex].image && (
                    <img
                      src={displayTestimonials[currentIndex].image}
                      alt={displayTestimonials[currentIndex].name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-primary text-lg">
                    {displayTestimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {displayTestimonials[currentIndex].position}
                    {displayTestimonials[currentIndex].company && (
                      <span className="text-secondary font-medium"> • {displayTestimonials[currentIndex].company}</span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2 flex-1 justify-center">
              {displayTestimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-secondary w-8'
                      : 'bg-border w-2.5 hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-2 ml-4">
              <button
                onClick={goToPrev}
                className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
