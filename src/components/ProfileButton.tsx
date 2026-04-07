import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';
import { User } from 'lucide-react';

export function ProfileButton({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  const { profileData } = useAuth();

  return (
    <button
      type="button"
      className={cn(
        'relative flex items-center justify-center overflow-hidden transition-colors bg-gray-200 border-4 border-gray-200 rounded-full active:border-primary-500',
        className
      )}
      {...props}
    >
      {profileData.avatar ? (
        <img
          src={profileData.avatar}
          alt="Foto de perfil"
          className="object-cover w-full h-full"
        />
      ) : (
        <User className="size-1/2 text-gray-400" />
      )}
    </button>
  );
}
