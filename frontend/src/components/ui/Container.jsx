import { cn } from '@/lib/cn.js';
export default function Container({ className, children }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-5 md:px-8', className)}>{children}</div>;
}
