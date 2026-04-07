import { Calendar } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { ProfileButton } from './ProfileButton';

const headerItems = [
  {
    to: '/tules',
    label: 'Formas',
  },
  {
    to: '/theory',
    label: 'Teoría',
  },
  {
    to: '/account',
    label: 'Perfil',
  },
  {
    to: '/calendar',
    label: 'Calendario',
  },
];

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const location = useLocation();
  const title = headerItems.find((h) =>
    location.pathname.startsWith(h.to)
  )?.label;
  return (
    <header className="relative z-40 flex items-center justify-between flex-none my-4 safe-area-top">
      <h1 className="font-semibold">{title ?? 'Exámenes'}</h1>

      <div className="flex items-center gap-6">
        <NavLink
          to="/calendar"
          aria-label="Calendario"
          aria-current={location.pathname === '/calendar' ? 'page' : undefined}
          className="[.active]:text-primary-500"
        >
          <Calendar width={20} height={20} />
        </NavLink>
        <ProfileButton className="size-10 border-0" onClick={onMenuToggle} />
      </div>
    </header>
  );
};
