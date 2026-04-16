import { ArrowLeft, Calendar } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ProfileAvatar } from './ProfileAvatar';
import { Button } from '@/common/Button';

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

function BackButton(props: React.ComponentProps<typeof Button>) {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => navigate(-1)}
      {...props}
    >
      <ArrowLeft size={16} />
    </Button>
  );
}

export function Header() {
  const location = useLocation();
  const title =
    headerItems.find((h) => location.pathname.startsWith(h.to))?.label ??
    'Exámenes';
  const isSubRoute =
    location.pathname === '/'
      ? false
      : headerItems.every((h) => location.pathname !== h.to);

  return (
    <header className="relative z-40 flex items-center justify-between flex-none my-4 safe-area-top">
      <div className="flex items-center gap-1">
        {isSubRoute ? <BackButton className="-ml-2" /> : null}
        <h1 className="font-semibold">{title}</h1>
      </div>

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
