import { NavLink, useLocation } from 'react-router-dom';
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
    to: '/',
    altPath: '/exam',
    icon: <GraduationCap strokeWidth={2} />,
    label: 'Exámenes',
  },
  {
    to: '/theory',
    icon: <BookText strokeWidth={2} />,
    label: 'Teoría',
  },
  // {
  //   to: '/account',
  //   icon: <UserRound strokeWidth={2} />,
  //   label: 'Perfil',
  // },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav
      className="sticky bottom-0 inset-x-0 px-2 z-40 safe-area-bottom-2 landscape:hidden"
      aria-label="Navegación principal"
    >
      <ul className="flex items-center h-16 max-w-2xl mx-auto gap-1 px-1 bg-primary-500 rounded-full font-medium text-sm leading-none">
        {navItems.map((item) => {
          const isActive =
            item.to === '/'
              ? location.pathname === item.to ||
                (item.altPath && location.pathname.startsWith(item.altPath))
              : location.pathname.startsWith(item.to);

          return (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                className={cn(
                  'flex flex-col items-center justify-center h-14 gap-1 rounded-full transition-colors duration-200 focus:outline-none',
                  isActive ? 'text-white bg-white/10' : 'text-white/65'
                )}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="flex items-center justify-center size-5">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
