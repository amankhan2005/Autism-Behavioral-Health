// Explicit registry — only the icons the content actually uses.
// Avoids barrel-importing all of lucide-react (~1MB) so the bundle tree-shakes.
import {
  Brain, Sprout, ClipboardList, HeartHandshake, School, Users, MessageSquareHeart,
  Heart, ShieldCheck, Award, FlaskConical, HandHeart, CheckCircle2, Lightbulb,
  UserRoundCheck, Puzzle, Stethoscope, BadgeCheck, BookOpen, FileText, Cookie,
  ScrollText, ShieldOff, Circle,
  Landmark, LifeBuoy, GraduationCap, Building2, Info,
} from 'lucide-react';

const registry = {
  Brain, Sprout, ClipboardList, HeartHandshake, School, Users, MessageSquareHeart,
  Heart, ShieldCheck, Award, FlaskConical, HandHeart, CheckCircle2, Lightbulb,
  UserRoundCheck, Puzzle, Stethoscope, BadgeCheck, BookOpen, FileText, Cookie,
  ScrollText, ShieldOff,
  Landmark, LifeBuoy, GraduationCap, Building2, Info,
};

export default function Icon({ name, className = 'h-6 w-6', ...props }) {
  const Cmp = registry[name] || Circle;
  return <Cmp className={className} aria-hidden="true" {...props} />;
}
