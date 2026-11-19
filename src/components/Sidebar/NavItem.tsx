import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

export interface NavItemProps {
  label: ReactNode
  /** Figma Type. Item has an icon; Parent has an icon and chevron; Child is indented under a Parent. */
  type?: 'item' | 'parent' | 'child'
  icon?: string
  active?: boolean
  /** Parent only: its children are showing. */
  open?: boolean
  /** Child only: small number on the right, e.g. "100+" (Figma Show count). */
  count?: ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

/** One row of the expanded Sidebar (Figma "Nav item"). Renders a link when href is set. */
export function NavItem({ label, type = 'item', icon, active, open, count, href, onClick, className }: NavItemProps) {
  const classes = cn(
    'flex w-full cursor-pointer items-center gap-3 rounded-md text-left text-text-secondary transition-colors',
    'hover:bg-interaction-hover hover:text-text-primary',
    'outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2',
    type === 'child' ? 'h-[36px] pr-3 pl-[44px] text-body-small' : 'h-10 px-3 text-label-base',
    open && 'text-text-primary',
    active && 'bg-primary-container text-primary-on-container hover:bg-primary-container hover:text-primary-on-container',
    className,
  )
  const content = (
    <>
      {type !== 'child' && icon && <Icon name={icon} size={20} />}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {type === 'parent' && (
        <Icon name="expand_more" size={16} className={cn('text-text-secondary transition-transform', open && 'rotate-180')} />
      )}
      {type === 'child' && count != null && <span className="text-body-xsmall text-text-tertiary tabular-nums">{count}</span>}
    </>
  )
  const shared = { className: classes, 'aria-current': active && type !== 'parent' ? ('page' as const) : undefined }
  return href && type !== 'parent' ? (
    <a href={href} onClick={onClick} {...shared}>{content}</a>
  ) : (
    <button type="button" onClick={onClick} aria-expanded={type === 'parent' ? !!open : undefined} {...shared}>
      {content}
    </button>
  )
}

export interface SidebarItemProps {
  /** Read by screen readers; also shown as the tooltip-style title. */
  label: string
  icon: string
  active?: boolean
  href?: string
  onClick?: () => void
  className?: string
}

/** Icon-only item of the collapsed 72px rail (Figma "Sidebar item", Collapsed=True). */
export function SidebarItem({ label, icon, active, href, onClick, className }: SidebarItemProps) {
  const classes = cn(
    'flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-text-secondary transition-colors',
    'hover:bg-interaction-hover hover:text-text-primary outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2',
    active && 'bg-primary-container text-primary-on-container hover:bg-primary-container hover:text-primary-on-container',
    className,
  )
  const content = <Icon name={icon} size={20} />
  return href ? (
    <a href={href} onClick={onClick} aria-label={label} title={label} aria-current={active ? 'page' : undefined} className={classes}>{content}</a>
  ) : (
    <button type="button" onClick={onClick} aria-label={label} title={label} aria-current={active ? 'page' : undefined} className={classes}>{content}</button>
  )
}
