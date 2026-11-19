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
}

/** Page title (Heading H3) with optional description and actions on the right. */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-heading-h3 text-text-primary">{title}</h1>
        {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
      </div>
      {description && <p className="text-body-base text-text-secondary">{description}</p>}
    </div>
  )
}
