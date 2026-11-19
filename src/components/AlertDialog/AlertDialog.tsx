import type { ReactNode } from 'react'
import { AlertDialog as RadixAlertDialog } from 'radix-ui'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../Button/Button'

export interface AlertDialogProps {
  title: ReactNode
  description?: ReactNode
  /** Figma Type=Destructive: red confirm button for deleting or other actions that cannot be undone. */
  destructive?: boolean
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  /** Element that opens the dialog, usually a Button. */
  trigger?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/** Asks the user to confirm an important action. It blocks the page until they choose. */
export function AlertDialog({
  title,
  description,
  destructive = false,
  confirmLabel = destructive ? 'Delete' : 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  trigger,
  ...rootProps
}: AlertDialogProps) {
  return (
    <RadixAlertDialog.Root {...rootProps}>
      {trigger && <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>}
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed inset-0 z-50 bg-surface-scrim" />
        <RadixAlertDialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 z-50 flex w-[440px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4',
            'rounded-xl border border-border-default bg-surface-overlay p-6 shadow-xl',
          )}
        >
          <div className="flex flex-col gap-2">
            <RadixAlertDialog.Title className="text-heading-h4 text-text-primary">{title}</RadixAlertDialog.Title>
            {description && (
              <RadixAlertDialog.Description className="text-body-base text-text-secondary">{description}</RadixAlertDialog.Description>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <RadixAlertDialog.Cancel className={buttonVariants({ variant: 'outline' })} onClick={onCancel}>
              {cancelLabel}
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action
              className={buttonVariants({ variant: destructive ? 'destructive' : 'primary' })}
              onClick={onConfirm}
            >
              {confirmLabel}
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  )
}
