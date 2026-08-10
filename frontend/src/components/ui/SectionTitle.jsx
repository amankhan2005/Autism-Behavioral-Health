import { motion } from 'framer-motion';
import { cn } from '../../lib/cn.js';

export function Eyebrow({ children, className }) {
  return <span className={cn('eyebrow', className)}>{children}</span>;
}

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', className }) {
  const centered = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5 }}
      className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tighter2 md:text-[2.5rem]">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>}
    </motion.div>
  );
}
