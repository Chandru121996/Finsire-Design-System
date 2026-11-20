import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Avatar } from '../Avatar/Avatar'
import { Breadcrumbs, type BreadcrumbItem } from '../Breadcrumbs/Breadcrumbs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../DropdownMenu/DropdownMenu'
import { IconButton } from '../IconButton/IconButton'
import { NotificationBell } from '../NotificationBell/NotificationBell'
import { SearchInput } from '../SearchInput/SearchInput'

export interface TopNavBarProps {
  breadcrumbs: BreadcrumbItem[]
  /** Icon before the breadcrumbs, e.g. the current page's icon. */
  breadcrumbIcon?: string
  /** Figma Type. Desktop shows the search field; Compact shows a search icon button. */
  variant?: 'desktop' | 'compact'
  onBack?: () => void
  onForward?: () => void
  canGoBack?: boolean
  canGoForward?: boolean
  /** Called as the user types in the search field. */
  onSearch?: (value: string) => void
  /** Compact only: called when the search icon is clicked. */
  onSearchClick?: () => void
  searchPlaceholder?: string
  onHelp?: () => void
  notificationCount?: number
  onNotifications?: () => void
  user: { initials: string; name?: string }
  /** DropdownMenuItem elements shown when the avatar is clicked. */
  profileMenu?: ReactNode
  className?: string
}

/** Figma "Top nav bar", 64px high, above the page content and next to the Sidebar. */
export function TopNavBar({
  breadcrumbs,
  breadcrumbIcon,
  variant = 'desktop',
  onBack,
  onForward,
  canGoBack = true,
  canGoForward = false,
  onSearch,
  onSearchClick,
  searchPlaceholder = 'Search…',
  onHelp,
  notificationCount,
  onNotifications,
  user,
  profileMenu,
  className,
}: TopNavBarProps) {
  const avatar = (
    <button
      type="button"
      aria-label={user.name ? `Account: ${user.name}` : 'Account'}
      className="cursor-pointer rounded-full outline-border-focus focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Avatar initials={user.initials} size={32} />
    </button>
  )
  return (
    <header className={cn('flex h-16 w-full shrink-0 items-center gap-4 border-b border-border-default bg-surface-base pr-6', variant === 'desktop' ? 'pl-3' : 'pl-6', className)}>
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <IconButton icon="arrow_back" label="Back" disabled={!canGoBack} onClick={onBack} />
        <IconButton icon="arrow_forward" label="Forward" disabled={!canGoForward} onClick={onForward} />
        <span className="w-2 shrink-0" />
        <Breadcrumbs items={breadcrumbs} icon={breadcrumbIcon} className="min-w-0 overflow-hidden" />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {variant === 'desktop' ? (
          <SearchInput variant="muted" placeholder={searchPlaceholder} onValueChange={onSearch} className="w-[320px]" />
        ) : (
          <IconButton icon="search" label="Search" onClick={onSearchClick} />
        )}
        <IconButton icon="help" label="Help" iconSize={24} onClick={onHelp} />
        <NotificationBell count={notificationCount} onClick={onNotifications} />
        {profileMenu ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>{avatar}</DropdownMenuTrigger>
            <DropdownMenuContent align="end">{profileMenu}</DropdownMenuContent>
          </DropdownMenu>
        ) : (
          avatar
        )}
      </div>
    </header>
  )
}
