import type { ReactNode } from 'react'
import { toast as sonner, Toaster as SonnerToaster, type ToasterProps } from 'sonner'
import { cn } from '../../lib/utils'
import { feedbackIcon, type FeedbackVariant } from '../Alert/Alert'
import { Icon } from '../Icon/Icon'

export interface ToastProps {
  title: ReactNode
  description?: ReactNode
  variant?: FeedbackVariant
  /** Text button such as "Undo" (Figma Show action). */
  action?: { label: string; onClick: () => void }
  /** Shows a close button (Figma Show close). */
  onClose?: () => void
  className?: string
}

/** The card itself. Normally you call toast() instead of rendering this directly. */
export function Toast({ title, description, variant = 'default', action, onClose, className }: ToastProps) {
  const status = variant === 'default' ? { name: 'notifications', className: 'text-text-secondary' } : feedbackIcon[variant]
  return (
    <div
      className={cn(
        'flex w-[360px] max-w-full items-start gap-3 rounded-lg border border-border-default bg-surface-overlay p-4 text-body-small shadow-lg',
        className,
      )}
    >
      <Icon name={status.name} size={20} iconStyle="filled" className={status.className} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-label-base text-text-primary">{title}</p>
        {description && <div className="text-text-secondary">{description}</div>}
      </div>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="shrink-0 cursor-pointer rounded-sm text-label-base text-text-link hover:underline outline-border-focus focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {action.label}
        </button>
      )}
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="-m-1 flex size-[28px] shrink-0 cursor-pointer items-center justify-center rounded-md text-text-secondary hover:bg-interaction-hover outline-border-focus focus-visible:outline-2"
        >
          <Icon name="close" size={20} />
        </button>
      )}
    </div>
  )
}

export interface ShowToastOptions extends Omit<ToastProps, 'onClose' | 'className'> {
  /** Milliseconds before it disappears. Default 5000. */
  duration?: number
  /** Show a close button. Default true. */
  dismissible?: boolean
}

/** Pop up a toast from anywhere: toast({ variant: 'success', title: 'Transfer sent' }). Needs <Toaster /> once in the app. */
export function toast({ duration = 5000, dismissible = true, action, ...props }: ShowToastOptions) {
  return sonner.custom(
    id => (
      <Toast
        {...props}
        action={action && { label: action.label, onClick: () => { action.onClick(); sonner.dismiss(id) } }}
        onClose={dismissible ? () => sonner.dismiss(id) : undefined}
      />
    ),
    { duration },
  )
}

/** Place once near the root of the app. Toasts appear bottom-right by default. */
export function Toaster(props: ToasterProps) {
  return <SonnerToaster position="bottom-right" gap={12} {...props} />
}
