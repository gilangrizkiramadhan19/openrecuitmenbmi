'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Target, Lightbulb, Shield, Leaf } from 'lucide-react'

export function AboutBMISection() {
  const values = [
    {
      icon: Shield,
      title: 'Food Safety',
      description: 'Komitmen pada keamanan pangan dengan standar internasional (HACCP, ISO 22000, FSSC 22000).',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Pengolahan seafood yang bertanggung jawab terhadap lingkungan dan sumber daya laut.',
    },
    {
      icon: Target,
      title: 'Efisiensi Produksi',
      description: 'Teknologi manufaktur modern dan cold chain management untuk kualitas internasional.',
    },
  ]

  return (
    <section id="culture" className="py-20 bg-gradient-to-b from-background via-blue-50/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-primary">
                Tentang PT Bumi Menara Internusa
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sejak didirikan, BMI telah berkembang menjadi pemimpin industri pengolahan dan ekspor seafood dengan operasional di Lampung, Surabaya, dan Makassar. Kami berkomitmen pada food safety, sustainability, efisiensi produksi, dan kualitas standar global yang unggul.
              </p>
            </div>

            <div className="space-y-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/30">
                        <Icon className="h-6 w-6 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-secondary">24+</div>
                <p className="text-sm text-muted-foreground">Tahun Operasional</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">2500+</div>
                <p className="text-sm text-muted-foreground">Talenta Profesional</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border h-96">
              <div className="w-full h-full bg-gradient-to-br from-secondary/20 via-accent/10 to-blue-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-secondary/20 mb-4">BMI</div>
                  <p className="text-lg text-foreground/60">
                    Membangun Masa Depan Bersama
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg border border-border max-w-xs"
            >
              <h4 className="font-semibold text-primary mb-2">Global Seafood Leader</h4>
              <p className="text-sm text-muted-foreground">
                Ekspor produk seafood berkualitas premium ke lebih dari 30 negara di seluruh dunia.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
