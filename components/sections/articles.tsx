'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { articlesAPI } from '@/lib/api'

interface Article {
  id: number
  title: string
  excerpt: string
  content?: string
  author: string
  date: string
  image?: string
  category?: string
}

export function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fallbackArticles: Article[] = [
    {
      id: 1,
      title: 'Food Safety Standards dalam Seafood Processing Global',
      excerpt: 'Pelajari standar internasional food safety seperti HACCP, ISO 22000, dan FSSC 22000 yang kami terapkan di semua fasilitas.',
      author: 'Quality Control Division',
      date: '20 November 2024',
      category: 'Food Safety',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Inovasi IoT dalam Cold Chain Management Seafood',
      excerpt: 'Teknologi IoT untuk cold storage dan cold chain management yang kami implementasikan meningkatkan efisiensi dan kualitas produk.',
      author: 'Technology Innovation Team',
      date: '15 November 2024',
      category: 'Teknologi',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Sustainability & Responsible Seafood Export Practices',
      excerpt: 'Komitmen BMI terhadap sustainable fishing practices dan bertanggung jawab dalam industri seafood global yang dinamis.',
      author: 'Supply Chain & Sustainability',
      date: '10 November 2024',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
    },
  ]

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true)
        const response = await articlesAPI.getAll({ limit: 3 })
        if (response.data.data && response.data.data.length > 0) {
          setArticles(response.data.data)
        } else {
          setArticles(fallbackArticles)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
        setArticles(fallbackArticles)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

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
    <section id="articles" className="py-20 bg-gradient-to-b from-blue-50/50 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary text-balance mb-4">
            Info & Artikel Industri Seafood
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Food safety, teknologi manufacturing, sustainability, dan innovation dalam industri seafood processing
          </p>
        </motion.div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 rounded-xl bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article) => (
              <motion.article
                key={article.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group rounded-xl overflow-hidden bg-white border border-border shadow-corporate hover:shadow-corporate-lg transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-muted-foreground">Tidak Ada Gambar</span>
                    </div>
                  )}

                  {article.category && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-secondary text-white text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 pb-4 border-b border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-4">
                    <button className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all group/link text-sm">
                      Baca Selengkapnya
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        {articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-white transition-all duration-300">
              Lihat Semua Artikel
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
