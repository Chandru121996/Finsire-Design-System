import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

export interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma Type. "all-filters" shows the tune icon and "All Filters" with no chevron. */
  variant?: 'filter' | 'all-filters'
  /** Icon before the label. Default "person" for filters, "tune" for all filters. */
  icon?: string
  /** Figma State=Applied: a value is chosen for this filter. */
  applied?: boolean
  /** Figma State=Open: its menu is showing. Set automatically when used as a menu trigger. */
  open?: boolean
}

/** Button that opens a filter menu, e.g. "Users", "Status", "All Filters". */
export function FilterChip({
  variant = 'filter',
  icon = variant === 'all-filters' ? 'tune' : 'person',
  applied = false,
  open,
  className,
  children = variant === 'all-filters' ? 'All Filters' : undefined,
  type = 'button',
  ...props
}: FilterChipProps) {
  return (
    <button
      type={type}
      aria-expanded={open}
      data-applied={applied || undefined}
      className={cn(
        'group inline-flex h-[36px] shrink-0 cursor-pointer items-center gap-2 rounded-md border border-border-default bg-surface-base px-3 text-label-base whitespace-nowrap text-text-primary transition-colors',
        'hover:border-border-strong hover:bg-interaction-hover aria-expanded:border-border-focus aria-expanded:bg-surface-base',
        'data-applied:border-primary-default data-applied:bg-primary-container data-applied:text-primary-on-container',
        'outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2',
        'disabled:pointer-events-none disabled:border-border-default disabled:bg-disabled-background disabled:text-disabled-foreground',
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={16} className="text-text-secondary group-data-applied:text-primary-on-container group-disabled:text-disabled-foreground" />
      {children}
      {variant === 'filter' && (
        <Icon
          name="expand_more"
          size={16}
          className="text-text-secondary transition-transform group-aria-expanded:rotate-180 group-disabled:text-disabled-foreground"
        />
      )}
    </button>
  )
}
