import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  description?: ReactNode
  /** Buttons at the bottom (Figma Show footer). */
  footer?: ReactNode
  /** Figma Style=Elevated: adds a shadow. */
  elevated?: boolean
}

/** General container: title, description, any content, optional footer. */
export function Card({ title, description, footer, elevated = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn('flex flex-col gap-6 rounded-lg border border-border-default bg-surface-base p-6', elevated && 'shadow-md', className)}
      {...props}
    >
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && <h3 className="text-heading-h5 text-text-primary">{title}</h3>}
          {description && <p className="text-body-small text-text-secondary">{description}</p>}
        </div>
      )}
      {children && <div className="text-body-small text-text-primary">{children}</div>}
      {footer && <div className="flex flex-wrap gap-2">{footer}</div>}
    </div>
  )
}
