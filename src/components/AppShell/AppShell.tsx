import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Sidebar, type SidebarProps } from '../Sidebar/Sidebar'
import { TopNavBar, type TopNavBarProps } from '../TopNavBar/TopNavBar'

export interface AppShellProps {
  sidebar: SidebarProps
  topNav: TopNavBarProps
  children: ReactNode
  /** Class for the scrolling main area. */
  className?: string
}

/** Page layout from the Documentation: Sidebar + Top nav bar + Main (24px padding), filling the window. */
export function AppShell({ sidebar, topNav, children, className }: AppShellProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-page">
      <Sidebar {...sidebar} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavBar {...topNav} />
        <main className={cn('min-h-0 flex-1 overflow-auto p-6', className)}>{children}</main>
      </div>
    </div>
  )
}

export interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  /** Buttons or controls on the right. */
  actions?: ReactNode
  /** Compact: smaller title (H4) and description, for dense data screens. Use small buttons in actions. */
  compact?: boolean
}

/** Page title (Heading H3, or H4 when compact) with optional description and actions on the right. */
export function PageHeader({ title, description, actions, compact = false }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className={cn('truncate text-text-primary', compact ? 'text-heading-h4' : 'text-heading-h3')}>{title}</h1>
        {description && <p className={cn('text-text-secondary', compact ? 'text-body-small' : 'text-body-base')}>{description}</p>}
      </div>
      {actions && <div className={cn('flex shrink-0 items-center', compact ? 'gap-2' : 'gap-3')}>{actions}</div>}
    </div>
  )
}
