import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn.js';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-soft hover:shadow-lift',
  secondary: 'border border-brand-600/25 text-brand-700 hover:border-brand-600/50 hover:bg-brand-50',
  green: 'bg-green-600 text-white hover:bg-green-700 shadow-soft hover:shadow-lift',
  ghost: 'text-brand-700 hover:bg-brand-50',
  white: 'bg-white text-brand-700 shadow-soft hover:shadow-lift',
  dark: 'bg-ink text-white hover:bg-brand-900',
  // Prominent, professional "Call Us Now" red.
  danger: 'bg-cta-500 text-white hover:bg-cta-600 shadow-soft hover:shadow-lift',
};
const sizes = { sm: 'h-10 px-4 text-sm', md: 'h-12 px-6 text-[15px]', lg: 'h-[54px] px-7 text-base' };

export default function Button({ as, to, href, variant = 'primary', size = 'md', className, children, ...props }) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-display font-semibold tracking-tightish',
    'transition-all duration-200 will-change-transform active:translate-y-px',
    variants[variant], sizes[size], className
  );
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  const Tag = as || 'button';
  return <Tag className={cls} {...props}>{children}</Tag>;
}
