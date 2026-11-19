import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const badgeVariants = cva(
  'inline-flex h-5 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2 text-label-small',
  {
    variants: {
      variant: {
        default: 'bg-primary-container text-primary-on-container',
        secondary: 'bg-secondary-default text-secondary-on-default',
        success: 'bg-success-container text-success-on-container',
        warning: 'bg-warning-container text-warning-on-container',
        error: 'bg-error-container text-error-on-container',
        info: 'bg-info-container text-info-on-container',
        outline: 'border border-border-strong text-text-primary',
        accent: 'bg-accent-container text-accent-on-container',
        'info-outline': 'border border-info-default text-info-default',
        'accent-outline': 'border border-accent-default text-accent-default',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/** Short status label. Use status colours only for meaning (success, warning = Caution, error = Critical). */
export function Badge({ variant, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
