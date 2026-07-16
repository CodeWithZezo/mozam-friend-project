'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spice-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-spice-400 text-surface-0 hover:bg-spice-300 active:bg-spice-200 shadow-sm',
        secondary:
          'bg-surface-2 text-text-primary border border-border-strong hover:bg-surface-3 active:bg-surface-3/80 shadow-sm',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm',
        ghost:
          'text-text-secondary hover:bg-surface-2 hover:text-text-primary active:bg-surface-3',
        link:
          'text-spice-400 hover:text-spice-300 underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-7 px-3 text-xs rounded-md',
        md: 'h-9 px-4 text-sm rounded-lg',
        lg: 'h-10 px-5 text-sm rounded-lg',
        xl: 'h-11 px-6 text-base rounded-xl',
      },
      icon: {
        true: 'p-0',
      },
    },
    compoundVariants: [
      { icon: true, size: 'sm', class: 'w-7 h-7' },
      { icon: true, size: 'md', class: 'w-9 h-9' },
      { icon: true, size: 'lg', class: 'w-10 h-10' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, icon }), className)}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
