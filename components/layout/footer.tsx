'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

const footerLinks = [
  {
    title: 'Karir',
    links: [
      { label: 'Cari Lowongan', href: '#jobs' },
      { label: 'Fresh Graduate Program', href: '#careers' },
      { label: 'Magang & PKL', href: '#internship' },
      { label: 'Management Development', href: '#careers' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang Kami', href: '#culture' },
      { label: 'Budaya Kerja', href: '#culture' },
      { label: 'Berita', href: '#articles' },
      { label: 'Hubungi Kami', href: '#contact' },
    ],
  },
  {
    title: 'Info',
    links: [
      { label: 'Kebijakan Privasi', href: '/privacy' },
      { label: 'Syarat & Ketentuan', href: '/terms' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
]

export function Footer() {
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
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold">BMI</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              PT Bumi Menara Internusa - Pemimpin industri seafood processing dan export dengan standar food safety internasional.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg bg-white/10 hover:bg-secondary transition-colors flex items-center justify-center"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="font-semibold mb-4 text-white">Hubungi Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <a href="tel:+62721XXX" className="text-sm text-white/70 hover:text-white transition-colors">
                  +62 721-XXX-XXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <a href="mailto:recruitment@bmi.id" className="text-sm text-white/70 hover:text-white transition-colors">
                  recruitment@bmi.id
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <address className="text-sm text-white/70 not-italic">
                  Lampung, Surabaya, Makassar
                </address>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} PT Bumi Menara Internusa. Semua hak dilindungi.
          </p>
          <div className="flex gap-4 text-sm text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
