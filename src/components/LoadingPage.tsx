import { cn } from '@/utils/cn';
import { Spinner } from '@/common/Spinner';

export function LoadingPage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col h-full items-center justify-center',
        className
      )}
      {...props}
    >
      <Spinner className="size-8" />
    </div>
  );
}
