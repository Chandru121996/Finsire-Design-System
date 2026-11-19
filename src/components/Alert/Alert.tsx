import type { HTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

export type FeedbackVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

/** Filled status icon and its colour, shared by Alert and Toast. */
export const feedbackIcon: Record<FeedbackVariant, { name: string; className: string }> = {
  default: { name: 'info', className: 'text-text-secondary' },
  info: { name: 'info', className: 'text-info-default' },
  success: { name: 'check_circle', className: 'text-success-default' },
  warning: { name: 'warning', className: 'text-warning-default' },
  error: { name: 'error', className: 'text-error-default' },
}

export const alertVariants = cva('flex w-full items-start gap-3 rounded-lg border p-4 text-body-small', {
  variants: {
    variant: {
      default: 'border-border-default bg-surface-base text-text-secondary [&_[data-title]]:text-text-primary',
      info: 'border-info-border bg-info-container text-info-on-container',
      success: 'border-success-border bg-success-container text-success-on-container',
      warning: 'border-warning-border bg-warning-container text-warning-on-container',
      error: 'border-error-border bg-error-container text-error-on-container',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, VariantProps<typeof alertVariants> {
  title: ReactNode
  /** Optional description under the title (Figma Show description). */
  children?: ReactNode
  /** Replace the status icon. */
  icon?: string
  /** Shows a close button (Figma Show close) and is called when it is clicked. */
  onClose?: () => void
}

/** Message inside the page, e.g. "KYC pending". Use Toast for messages that pop up and disappear. */
export function Alert({ variant, title, children, icon, onClose, className, ...props }: AlertProps) {
  const status = feedbackIcon[variant ?? 'default']
  return (
    <div
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon name={icon ?? status.name} size={20} iconStyle="filled" className={status.className} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p data-title className="text-label-base">{title}</p>
        {children && <div>{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="-m-1 flex size-[28px] shrink-0 cursor-pointer items-center justify-center rounded-md hover:bg-interaction-hover outline-border-focus focus-visible:outline-2"
        >
          <Icon name="close" size={20} />
        </button>
      )}
    </div>
  )
}
