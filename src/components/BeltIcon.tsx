import type { Belt } from '@/consts/belts';
import { cn } from '@/utils/cn';
import { useId } from 'react';

export function BeltIcon({
  belt,
  className,
  ...props
}: React.ComponentProps<'svg'> & { belt: Belt }) {
  const id = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="51"
      height="37"
      fill="none"
      viewBox="0 0 51 37"
      preserveAspectRatio="xMidYMid"
      aria-label={belt.alt}
      className={cn('drop-shadow-[0_2px_0_#000]', className)}
      {...props}
    >
      <g clip-path={`url(#belt_clip_${id})`}>
        <path
          fill={belt.color}
          d="M7.464 4.065a4 4 0 0 1 5.444-1.536l33.955 19.005a4 4 0 0 1 1.537 5.444l-2.424 4.33a4 4 0 0 1-5.444 1.537L6.577 13.84A4 4 0 0 1 5.04 8.396z"
        />
        {belt.buckle && (
          <path
            fill={belt.buckle}
            d="m39.5 13.332 12.593 7.048-8.07 14.42-12.593-7.05z"
          />
        )}
      </g>
      <path
        stroke="var(--color-primary-500)"
        d="M7.464 4.065a4 4 0 0 1 5.444-1.536l33.955 19.005a4 4 0 0 1 1.537 5.444l-2.424 4.33a4 4 0 0 1-5.444 1.537L6.577 13.84A4 4 0 0 1 5.04 8.396z"
      />
      <path
        fill={belt.color}
        stroke="var(--color-primary-500)"
        d="M43.456 12.809 9.644 32.067a3.5 3.5 0 0 1-4.774-1.309l-2.456-4.312a3.5 3.5 0 0 1 1.309-4.774L37.535 2.414a3.5 3.5 0 0 1 4.774 1.309l2.456 4.312a3.5 3.5 0 0 1-1.31 4.774Z"
      />
      <defs>
        <clipPath id={`belt_clip_${id}`}>
          <path
            fill="#fff"
            d="M7.464 4.065a4 4 0 0 1 5.444-1.536l33.955 19.005a4 4 0 0 1 1.537 5.444l-2.424 4.33a4 4 0 0 1-5.444 1.537L6.577 13.84A4 4 0 0 1 5.04 8.396z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
