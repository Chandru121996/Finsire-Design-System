import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  /** Icon in the circle. Default "receipt_long". */
  icon?: string
  /** Usually a Button, e.g. "Add money" (Figma Show action). */
  action?: ReactNode
  /** Figma Style=Bordered: dashed outline, for use inside a page section. */
  bordered?: boolean
}

/** Shown when a list or table has nothing to display yet. */
export function EmptyState({ title, description, icon = 'receipt_long', action, bordered = false, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-4 p-8 text-center',
        bordered && 'rounded-lg border border-dashed border-border-strong bg-surface-base',
        className,
      )}
      {...props}
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-surface-muted text-text-secondary">
        <Icon name={icon} size={32} />
      </div>
      <div className="flex max-w-[376px] flex-col gap-1">
        <p className="text-heading-h5 text-text-primary">{title}</p>
        {description && <p className="text-body-small text-text-secondary">{description}</p>}
      </div>
      {action}
    </div>
  )
}
