import { motion } from 'framer-motion';

// Fade-up on scroll. Respects reduced motion via framer-motion defaults.
export default function Reveal({ children, delay = 0, y = 20, className, as = 'div', ...rest }) {
  const M = motion[as] || motion.div;
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  );
}
