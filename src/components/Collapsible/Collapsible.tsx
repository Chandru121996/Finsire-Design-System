import type { ReactNode } from 'react'
import { Collapsible as RadixCollapsible } from 'radix-ui'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

export interface CollapsibleProps {
  title: ReactNode
  /** Rows to show. The first is always visible; the rest show when open. */
  items: ReactNode[]
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

/** Figma "Collapsible": Closed shows the first item, Open shows all. */
export function Collapsible({ title, items, className, ...rootProps }: CollapsibleProps) {
  const [first, ...rest] = items
  const row = 'rounded-md border border-border-default bg-surface-base px-4 py-3 text-body-small text-text-primary'
  return (
    <RadixCollapsible.Root className={cn('flex w-full flex-col gap-2', className)} {...rootProps}>
      <div className="flex items-center justify-between gap-4 px-1">
        <p className="text-label-large text-text-primary">{title}</p>
        {rest.length > 0 && (
          <RadixCollapsible.Trigger
            aria-label="Show all"
            className="flex size-8 cursor-pointer items-center justify-center rounded-md text-text-secondary hover:bg-interaction-hover outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2"
          >
            <Icon name="unfold_more" size={20} />
          </RadixCollapsible.Trigger>
        )}
      </div>
      {first !== undefined && <div className={row}>{first}</div>}
      <RadixCollapsible.Content className="flex flex-col gap-2">
        {rest.map((item, index) => <div key={index} className={row}>{item}</div>)}
      </RadixCollapsible.Content>
    </RadixCollapsible.Root>
  )
}
