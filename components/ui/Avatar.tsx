import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, fallback, size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full bg-slate-100",
          {
            'h-8 w-8': size === 'sm',
            'h-10 w-10': size === 'md',
            'h-14 w-14': size === 'lg',
            'h-24 w-24': size === 'xl',
          },
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={fallback || "Avatar"}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-500 font-medium uppercase">
            {fallback?.slice(0, 2) || "NA"}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }
