'use client'

import { cn } from '@/lib/utils'
import { forwardRef, useId } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leading, trailing, id: idProp, ...props }, ref) => {
    const generatedId = useId()
    const id = idProp ?? generatedId
    const errorId = `${id}-error`
    const hintId = `${id}-hint`

    const describedBy = [
      error ? errorId : null,
      hint ? hintId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leading && (
            <span className="absolute left-3 flex items-center text-text-muted pointer-events-none">
              {leading}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            aria-describedby={describedBy}
            aria-invalid={error ? 'true' : undefined}
            className={cn(
              'w-full border rounded-lg py-2 text-sm bg-surface-2 text-text-primary placeholder:text-text-muted',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              leading ? 'pl-9' : 'pl-3',
              trailing ? 'pr-9' : 'pr-3',
              error
                ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                : 'border-border-strong focus:border-spice-400 focus:ring-spice-400/20',
              props.disabled && 'bg-surface-1 text-text-muted cursor-not-allowed',
              className
            )}
            {...props}
          />
          {trailing && (
            <span className="absolute right-3 flex items-center text-text-muted">
              {trailing}
            </span>
          )}
        </div>
        {hint && !error && (
          <p id={hintId} className="text-xs text-text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
