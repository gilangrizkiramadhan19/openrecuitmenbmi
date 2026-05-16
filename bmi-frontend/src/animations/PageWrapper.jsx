import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from './variants';

/**
 * PageWrapper - Wraps each page with a smooth fade+slide transition.
 * Usage: <PageWrapper><YourPage /></PageWrapper>
 */
export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
