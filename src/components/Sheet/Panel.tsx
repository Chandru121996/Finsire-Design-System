import type { ReactNode } from 'react'
import { Dialog } from 'radix-ui'
import { cn } from '../../lib/utils'
import { IconButton } from '../IconButton/IconButton'

export type PanelSide = 'right' | 'left' | 'bottom'

export interface PanelProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  /** Element that opens the panel, usually a Button. */
  trigger?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

interface PanelLayout {
  side: PanelSide
  /** Tailwind width class for left / right panels. */
  width: string
  /** Gap between header, body and footer. */
  gap: 'gap-4' | 'gap-6'
  footerClass: string
}

const position: Record<PanelSide, string> = {
  right: 'inset-y-0 right-0 h-full border-l motion-safe:animate-[slide-in-right_200ms_ease-out]',
  left: 'inset-y-0 left-0 h-full border-r motion-safe:animate-[slide-in-left_200ms_ease-out]',
  bottom:
    'inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-[390px] rounded-t-xl border-x border-t pt-3 motion-safe:animate-[slide-in-bottom_200ms_ease-out]',
}

/** Shared shell of Sheet and Drawer: a panel that slides over the page with a dimmed backdrop. */
export function Panel({ title, description, children, footer, trigger, className, side, width, gap, footerClass, ...rootProps }: PanelProps & PanelLayout) {
  return (
    <Dialog.Root {...rootProps}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-surface-scrim motion-safe:animate-[fade-in_200ms_ease-out]" />
        <Dialog.Content
          className={cn(
            'fixed z-50 flex max-w-[calc(100vw-16px)] flex-col border-border-default bg-surface-overlay p-6 shadow-xl outline-none',
            gap,
            position[side],
            side !== 'bottom' && width,
            className,
          )}
        >
          {side === 'bottom' && <div aria-hidden className="mx-auto h-1 w-10 shrink-0 rounded-full bg-border-strong" />}
          <div className="flex shrink-0 items-start gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Dialog.Title className="text-heading-h4 text-text-primary">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className="text-body-small text-text-secondary">{description}</Dialog.Description>
              ) : (
                <Dialog.Description className="sr-only">{title}</Dialog.Description>
              )}
            </div>
            {side !== 'bottom' && (
              <Dialog.Close asChild>
                <IconButton icon="close" label="Close" size={32} iconSize={20} />
              </Dialog.Close>
            )}
          </div>
          {children && <div className={cn('min-h-0 overflow-y-auto', side !== 'bottom' && 'flex-1')}>{children}</div>}
          {footer && <div className={cn('flex shrink-0 gap-2', footerClass)}>{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/** Wrap a footer Button with this to close the panel when it is clicked. */
export const PanelClose = Dialog.Close
