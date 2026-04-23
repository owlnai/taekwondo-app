import { Link } from '@tanstack/react-router';
import { BookText, GraduationCap } from 'lucide-react';
import TulesIcon from '@/assets/tules.svg?react';
import { cn } from '@/utils/cn';

type NavItem = {
  to: string;
  altPath?: string;
  icon: React.ReactNode;
  label: string;
};

const navItems: NavItem[] = [
  {
    to: '/tules',
    icon: <TulesIcon />,
    label: 'Formas',
  },
  {
    to: '/exams',
    icon: <GraduationCap strokeWidth={2} />,
    label: 'Exámenes',
  },
  {
    to: '/theory',
    icon: <BookText strokeWidth={2} />,
    label: 'Teoría',
  },
];

export const BottomNav = () => {
  return (
    <nav
      className="sticky bottom-0 inset-x-0 px-2 z-40 safe-area-bottom-2 landscape:hidden [view-transition-name:bottom-nav]"
      aria-label="Navegación principal"
    >
      <ul className="flex items-center h-16 max-w-2xl mx-auto gap-1 px-1 bg-primary-500 rounded-full font-medium text-sm leading-none">
        {navItems.map((item) => (
          <li key={item.to} className="flex-1">
            <Link
              to={item.to}
              viewTransition={false}
              activeOptions={{
                includeHash: false,
              }}
              className={cn(
                'flex flex-col items-center justify-center h-14 gap-1 rounded-full transition-colors duration-200 focus:outline-none text-white/65 [.active]:text-white [.active]:bg-white/10'
              )}
              aria-label={item.label}
            >
              <span className="flex items-center justify-center size-5">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
