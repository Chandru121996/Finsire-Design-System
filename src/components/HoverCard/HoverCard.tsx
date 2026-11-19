import type { ReactNode } from 'react'
import { HoverCard as RadixHoverCard } from 'radix-ui'
import { cn } from '../../lib/utils'
import { Avatar } from '../Avatar/Avatar'
import { Icon } from '../Icon/Icon'

export interface HoverCardProps {
  /** Element that shows the card when pointed at, usually a name link. */
  trigger: ReactNode
  /** Figma Name, e.g. "Anita Rao". */
  name: ReactNode
  /** Figma Handle, e.g. "Beneficiary · HDFC •••• 4821". */
  handle?: ReactNode
  initials: string
  /** Figma Description. */
  children?: ReactNode
  /** Small line at the bottom, e.g. { icon: 'calendar_today', text: 'Joined March 2026' }. */
  meta?: { icon: string; text: ReactNode }
  open?: boolean
  defaultOpen?: boolean
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

/** Preview card shown when pointing at a person or account (Figma "Hover card"). */
export function HoverCard({ trigger, name, handle, initials, children, meta, open, defaultOpen, side = 'bottom', className }: HoverCardProps) {
  return (
    <RadixHoverCard.Root open={open} defaultOpen={defaultOpen} openDelay={300} closeDelay={150}>
      <RadixHoverCard.Trigger asChild>{trigger}</RadixHoverCard.Trigger>
      <RadixHoverCard.Portal>
        <RadixHoverCard.Content
          side={side}
          sideOffset={6}
          className={cn('z-50 flex w-[320px] flex-col gap-3 rounded-md border border-border-default bg-surface-overlay p-4 shadow-md', className)}
        >
          <div className="flex items-center gap-3">
            <Avatar initials={initials} size={40} />
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-label-large text-text-primary">{name}</p>
              {handle && <p className="truncate text-body-xsmall text-text-secondary">{handle}</p>}
            </div>
          </div>
          {children && <div className="text-body-small text-text-primary">{children}</div>}
          {meta && (
            <div className="flex items-center gap-2 text-body-xsmall text-text-tertiary">
              <Icon name={meta.icon} size={16} />
              {meta.text}
            </div>
          )}
        </RadixHoverCard.Content>
      </RadixHoverCard.Portal>
    </RadixHoverCard.Root>
  )
}
