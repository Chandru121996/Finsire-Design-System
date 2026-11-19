import { Fragment, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

export interface BreadcrumbItem {
  label: ReactNode
  href?: string
  onClick?: () => void
}

export interface BreadcrumbsProps {
  /** From the top level down. The last item is the current page. */
  items: BreadcrumbItem[]
  /** Optional icon before the first item (Figma Show icon), e.g. "history". */
  icon?: string
  className?: string
}

const linkClass =
  'cursor-pointer rounded-sm text-body-small text-text-secondary hover:text-text-primary outline-border-focus focus-visible:outline-2 focus-visible:outline-offset-2'

/** Shows where the page sits, e.g. Home › Accounts › Statements. */
export function Breadcrumbs({ items, icon, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 whitespace-nowrap">
        {icon && (
          <li className="flex">
            <Icon name={icon} size={16} className="text-text-secondary" />
          </li>
        )}
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          return (
            <Fragment key={index}>
              {index > 0 && (
                <li aria-hidden className="flex">
                  <Icon name="chevron_right" size={16} className="text-text-tertiary" />
                </li>
              )}
              <li className="flex">
                {isCurrent ? (
                  <span aria-current="page" className="text-label-base text-text-primary">{item.label}</span>
                ) : item.href ? (
                  <a href={item.href} onClick={item.onClick} className={linkClass}>{item.label}</a>
                ) : (
                  <button type="button" onClick={item.onClick} className={cn(linkClass, 'bg-transparent')}>{item.label}</button>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
