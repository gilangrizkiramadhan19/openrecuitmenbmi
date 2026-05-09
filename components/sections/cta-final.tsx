'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function FinalCTASection() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-primary via-primary to-secondary text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-5xl sm:text-6xl font-bold leading-tight text-balance">
            Bangun Karir Global dalam Seafood Industry
          </h2>

          <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan PT Bumi Menara Internusa dan menjadi bagian dari pemimpin industri seafood processing dan export global
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Link
              href="#jobs"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-white text-primary font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Jelajahi Lowongan
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10 transition-all duration-300"
            >
              Daftar Sekarang
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          {/* Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm text-white/70 pt-4"
          >
            Tidak ada biaya pendaftaran. Proses rekrutmen kami transparan dan profesional.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
