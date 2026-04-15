import { Calendar } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ProfileAvatar } from './ProfileAvatar';

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

export function Header() {
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
        <Link to="/account">
          <ProfileAvatar className="size-10" />
        </Link>
      </div>
    </header>
  );
}
