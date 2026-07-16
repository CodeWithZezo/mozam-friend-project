import { cn } from '@/lib/utils'

type BadgeVariant =
  | 'pending'
  | 'completed'
  | 'cancelled'
  | 'returned'
  | 'active'
  | 'inactive'
  | 'low'
  | 'ok'
  | 'neutral'
  | 'blue'
  | 'purple'

const variantStyles: Record<BadgeVariant, string> = {
  pending:   'bg-yellow-400/15 text-yellow-400',
  completed: 'bg-green-400/15 text-green-400',
  cancelled: 'bg-red-400/15 text-red-400',
  returned:  'bg-purple-400/15 text-purple-300',
  active:    'bg-green-400/15 text-green-400',
  inactive:  'bg-surface-3 text-text-muted',
  low:       'bg-red-400/15 text-red-400',
  ok:        'bg-green-400/15 text-green-400',
  neutral:   'bg-blue-400/15 text-blue-300',
  blue:      'bg-blue-400/15 text-blue-300',
  purple:    'bg-purple-400/15 text-purple-300',
}

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export type { BadgeVariant }
