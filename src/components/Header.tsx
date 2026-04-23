import { ArrowLeft, Calendar } from 'lucide-react';
import { Link, useLocation, useRouter } from '@tanstack/react-router';
import { ProfileAvatar } from './ProfileAvatar';
import { Button } from '@/common/Button';

const headerItems = [
  {
    to: '/exams',
    label: 'Exámenes',
  },
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
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => router.history.back()}
      {...props}
    >
      <ArrowLeft size={16} />
    </Button>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const realPathname = pathname.lastIndexOf('/')
    ? pathname.slice(0, -1)
    : pathname;
  const title =
    headerItems.find((h) => realPathname.startsWith(h.to))?.label ?? 'Exámenes';
  const isSubRoute =
    realPathname === '/'
      ? false
      : headerItems.every((h) => realPathname !== h.to);

  return (
    <header className="relative z-40 flex items-center justify-between flex-none my-4 safe-area-top">
      <div className="flex items-center gap-1">
        {isSubRoute ? <BackButton className="-ml-2" /> : null}
        <h1 className="font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/calendar"
          aria-label="Calendario"
          className="[&.active]:text-primary-500"
        >
          <Calendar width={20} height={20} />
        </Link>
        <Link to="/account" aria-label="Perfil">
          <ProfileAvatar className="size-10" />
        </Link>
      </div>
    </header>
  );
}
