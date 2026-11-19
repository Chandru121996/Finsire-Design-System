import type { ReactNode } from 'react'
import { Tooltip as RadixTooltip } from 'radix-ui'
import { cn } from '../../lib/utils'
import arrowUrl from '../../assets/tooltip/arrow-top.svg'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  /** Tooltip text, e.g. "Copy account number". */
  label: ReactNode
  /** Where the tooltip sits relative to its target (Figma Placement). Default "top". */
  placement?: TooltipPlacement
  /** The element that shows the tooltip on hover or keyboard focus. */
  children: ReactNode
  /** Control visibility yourself (mostly for docs and tests). */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  delayDuration?: number
  className?: string
}

export function Tooltip({ label, placement = 'top', children, open, defaultOpen, onOpenChange, delayDuration = 300, className }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={placement}
            sideOffset={4}
            collisionPadding={8}
            className={cn('z-50 rounded-md bg-surface-inverse px-3 py-2 text-body-xsmall text-text-inverse', className)}
          >
            {label}
            {/* Arrow shape from Figma, filled with surface/inverse. Radix rotates it to face the target. */}
            <RadixTooltip.Arrow asChild width={12} height={6}>
              <span>
                <span
                  className="block h-[6px] w-[12px] bg-surface-inverse"
                  style={{ maskImage: `url("${arrowUrl}")`, WebkitMaskImage: `url("${arrowUrl}")` }}
                />
              </span>
            </RadixTooltip.Arrow>
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
