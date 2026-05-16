import { motion } from 'framer-motion';
import { fadeInUp } from './variants';

/**
 * ScrollReveal - Animates children when they enter the viewport.
 * Usage: <ScrollReveal><YourContent /></ScrollReveal>
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variants = fadeInUp,
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
