import type { ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export type FieldStatus = 'default' | 'error' | 'success'

// The bordered box shared by Input, Textarea, Select and Date picker (Figma "Field" layer).
// Focus is a 2px border-focus edge: the 1px border plus a 1px inset ring.
export const fieldBoxVariants = cva(
  [
    'flex w-full items-center gap-2 rounded-md border bg-surface-base px-3 text-body-base text-text-primary transition-colors',
    'focus-within:border-border-focus focus-within:inset-ring-1 focus-within:inset-ring-border-focus',
  ],
  {
    variants: {
      status: {
        default: 'border-border-strong hover:border-text-tertiary',
        error: 'border-error-default',
        success: 'border-success-default',
      },
      disabled: {
        true: 'pointer-events-none border-border-default bg-disabled-background text-disabled-foreground',
        false: '',
      },
    },
    defaultVariants: { status: 'default', disabled: false },
  },
)

export interface FieldProps {
  /** Id of the control, so the label and helper text are linked to it. */
  id: string
  label?: ReactNode
  helperText?: ReactNode
  status?: FieldStatus
  disabled?: boolean
  className?: string
  children: ReactNode
}

export const helperId = (id: string) => `${id}-helper`

/** Label above, control in the middle, helper text below. */
export function Field({ id, label, helperText, status = 'default', disabled, className, children }: FieldProps) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {label && (
        <label htmlFor={id} className={cn('text-label-base', disabled ? 'text-disabled-foreground' : 'text-text-primary')}>
          {label}
        </label>
      )}
      {children}
      {helperText && (
        <p
          id={helperId(id)}
          className={cn(
            'text-body-small',
            disabled
              ? 'text-disabled-foreground'
              : { default: 'text-text-secondary', error: 'text-error-default', success: 'text-success-default' }[status],
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}
