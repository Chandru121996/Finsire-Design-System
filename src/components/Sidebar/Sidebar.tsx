import { useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Avatar } from '../Avatar/Avatar'
import { Icon } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'
import { FinsireLogo, FinsireMark } from '../Logo/Logo'
import { NavItem, SidebarItem } from './NavItem'

export interface SidebarLink {
  id: string
  label: string
  icon?: string
  href?: string
  /** Child links (makes this a Parent). */
  children?: SidebarLink[]
  /** Small number shown on a child, e.g. "100+". */
  count?: ReactNode
}

export interface SidebarGroup {
  label: string
  /** Shorter label for the 72px rail, e.g. "Loan" for "Loan Management". */
  shortLabel?: string
  items: SidebarLink[]
}

/**
 * Figma Sidebar State.
 * - collapsed: 72px rail with the F mark. Hovering it (or tabbing into it) shows the full sidebar
 *   on top of the page (Figma "Hover expanded").
 * - pinned: 260px and stays open. The pin button switches between the two.
 */
export type SidebarState = 'collapsed' | 'pinned'

export interface SidebarProps {
  groups: SidebarGroup[]
  /** Id of the current page's link. */
  activeId?: string
  onNavigate?: (link: SidebarLink) => void
  /** Logos for the open and collapsed sidebar. Default: the Finsire logo and F mark. */
  logo?: { full: ReactNode; mark: ReactNode }
  workspace?: { name: string; detail?: string; initials: string; onClick?: () => void }
  state?: SidebarState
  defaultState?: SidebarState
  onStateChange?: (state: SidebarState) => void
  /** Parent ids that start open. Parents containing the active page always start open. */
  defaultOpenIds?: string[]
  className?: string
}

const containsActive = (link: SidebarLink, activeId?: string): boolean =>
  link.id === activeId || !!link.children?.some(child => containsActive(child, activeId))

export function Sidebar({
  groups,
  activeId,
  onNavigate,
  logo = { full: <FinsireLogo />, mark: <FinsireMark /> },
  workspace,
  state,
  defaultState = 'pinned',
  onStateChange,
  defaultOpenIds = [],
  className,
}: SidebarProps) {
  const [innerState, setInnerState] = useState<SidebarState>(defaultState)
  const current = state ?? innerState
  const setState = (next: SidebarState) => {
    setInnerState(next)
    onStateChange?.(next)
  }
  const [hovering, setHovering] = useState(false)
  // Parents that contain the active page start open.
  const [openIds, setOpenIds] = useState<Set<string>>(
    () =>
      new Set([
        ...defaultOpenIds,
        ...groups.flatMap(g => g.items).filter(i => i.children && containsActive(i, activeId)).map(i => i.id),
      ]),
  )
  const toggleOpen = (id: string) =>
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const collapsed = current === 'collapsed'
  const pinned = current === 'pinned'
  const showFull = pinned || hovering
  const navigate = (link: SidebarLink) => {
    onNavigate?.(link)
    setHovering(false)
  }

  const panel = (
    <nav
      aria-label="Main"
      className={cn(
        'flex h-full flex-col gap-1 overflow-y-auto border-r border-border-default bg-surface-base pt-3 pb-4',
        showFull ? 'w-[260px] px-3' : 'w-[72px] items-center px-2',
        collapsed && hovering && 'absolute inset-y-0 left-0 z-40 shadow-xl',
      )}
    >
      {showFull ? (
        <div className="flex shrink-0 items-center gap-2 px-1 pt-1">
          {logo.full}
          <span className="flex-1" />
          {/* Outline pin = not pinned; filled pin = pinned. Clicking switches. */}
          <IconButton
            icon="push_pin"
            iconStyle={pinned ? 'filled' : 'outlined'}
            label={pinned ? 'Unpin sidebar' : 'Pin sidebar open'}
            size={32}
            active={pinned}
            onClick={() => setState(pinned ? 'collapsed' : 'pinned')}
          />
        </div>
      ) : (
        <div className="flex shrink-0 flex-col items-center pt-2">{logo.mark}</div>
      )}

      {workspace &&
        (showFull ? (
          <button
            type="button"
            onClick={workspace.onClick}
            className="flex w-full shrink-0 cursor-pointer items-center gap-2 rounded-md border border-border-default bg-surface-muted p-2 text-left hover:border-border-strong outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2"
          >
            <Avatar initials={workspace.initials} size={32} />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-label-base text-text-primary">{workspace.name}</span>
              {workspace.detail && <span className="truncate text-body-xsmall text-text-secondary">{workspace.detail}</span>}
            </span>
            <Icon name="unfold_more" size={20} className="text-text-secondary" />
          </button>
        ) : (
          <button
            type="button"
            onClick={workspace.onClick}
            aria-label={workspace.name}
            className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border-default bg-surface-muted outline-border-focus focus-visible:outline-2"
          >
            <Avatar initials={workspace.initials.slice(0, 1)} size={32} />
          </button>
        ))}

      {groups.map(group => (
        <div key={group.label} role="group" aria-label={group.label} className={cn('flex flex-col gap-1', !showFull && 'items-center')}>
          <p
            className={cn(
              'truncate py-2 text-label-small text-text-tertiary',
              showFull ? 'px-3' : 'w-full text-center',
            )}
          >
            {showFull ? group.label : (group.shortLabel ?? group.label)}
          </p>
          {group.items.map(item =>
            showFull ? (
              <div key={item.id} className="flex flex-col gap-1">
                <NavItem
                  label={item.label}
                  icon={item.icon}
                  href={item.href}
                  type={item.children ? 'parent' : 'item'}
                  open={openIds.has(item.id)}
                  active={item.children ? false : item.id === activeId}
                  onClick={() => (item.children ? toggleOpen(item.id) : navigate(item))}
                />
                {item.children &&
                  openIds.has(item.id) &&
                  item.children.map(child => (
                    <NavItem
                      key={child.id}
                      type="child"
                      label={child.label}
                      href={child.href}
                      count={child.count}
                      active={child.id === activeId}
                      onClick={() => navigate(child)}
                    />
                  ))}
              </div>
            ) : (
              <SidebarItem
                key={item.id}
                label={item.label}
                icon={item.icon ?? 'circle'}
                href={item.children ? undefined : item.href}
                active={containsActive(item, activeId)}
                onClick={() => (item.children ? setHovering(true) : navigate(item))}
              />
            ),
          )}
        </div>
      ))}
    </nav>
  )

  return (
    <div
      className={cn('relative h-full shrink-0', className)}
      style={{ width: collapsed ? 72 : 260 }}
      onMouseEnter={() => collapsed && setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      // Keyboard users open the collapsed sidebar by tabbing into it.
      onFocus={() => collapsed && setHovering(true)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovering(false)
      }}
    >
      {panel}
    </div>
  )
}
