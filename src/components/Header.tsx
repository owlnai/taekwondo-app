import { Calendar, Menu } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const location = useLocation();
  return (
    <header className="relative z-40 flex items-center justify-between flex-none my-4 safe-area-top">
      <a href="/">
        <img src="/imgs/logo.webp" width={64} alt="Logo de la escuela RAM" />
      </a>

      <div className="flex items-center gap-6">
        <NavLink
          to="/calendar"
          aria-label="Calendario"
          aria-current={location.pathname === '/calendar' ? 'page' : undefined}
          className="[.active]:text-primary-500"
        >
          <Calendar width={20} height={20} />
        </NavLink>
        <button
          type="button"
          onClick={onMenuToggle}
          className="transition-colors rounded-lg duration-2F00 active:bg-gray-100"
          aria-label="Abrir menú"
        >
          <Menu width={20} height={20} />
        </button>
      </div>
    </header>
  );
};
