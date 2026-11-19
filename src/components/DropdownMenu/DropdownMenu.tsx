import type { ComponentProps, ReactNode } from 'react'
import { DropdownMenu as RadixMenu } from 'radix-ui'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'
import { menuContentClass, menuItemClass, menuLabelClass, menuSeparatorClass, menuShortcutClass } from './menuStyles'

/** Figma "Dropdown": a trigger (usually a Button) that opens a Dropdown menu. */
export const DropdownMenu = RadixMenu.Root

export function DropdownMenuTrigger(props: ComponentProps<typeof RadixMenu.Trigger>) {
  return <RadixMenu.Trigger asChild {...props} />
}

/** Figma "Dropdown menu" panel. */
export function DropdownMenuContent({ className, sideOffset = 4, align = 'start', ...props }: ComponentProps<typeof RadixMenu.Content>) {
  return (
    <RadixMenu.Portal>
      <RadixMenu.Content sideOffset={sideOffset} align={align} className={cn(menuContentClass, className)} {...props} />
    </RadixMenu.Portal>
  )
}

export interface MenuItemContentProps {
  /** Icon before the label (Figma Show icon). */
  icon?: string
  /** Keyboard hint on the right, e.g. "⌘P" (Figma Show shortcut). */
  shortcut?: string
  children: ReactNode
}

export function MenuItemContent({ icon, shortcut, children }: MenuItemContentProps) {
  return (
    <>
      {icon && <Icon name={icon} size={16} />}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {shortcut && <span className={menuShortcutClass}>{shortcut}</span>}
    </>
  )
}

export interface DropdownMenuItemProps extends Omit<ComponentProps<typeof RadixMenu.Item>, 'children'>, MenuItemContentProps {
  /** Figma Type=Destructive, e.g. "Log out" or "Delete". */
  destructive?: boolean
}

/** Figma "Menu item": Default, Hover, Disabled; Default or Destructive. */
export function DropdownMenuItem({ icon, shortcut, destructive, className, children, ...props }: DropdownMenuItemProps) {
  return (
    <RadixMenu.Item data-variant={destructive ? 'destructive' : undefined} className={cn('group', menuItemClass, className)} {...props}>
      <MenuItemContent icon={icon} shortcut={shortcut}>{children}</MenuItemContent>
    </RadixMenu.Item>
  )
}

export function DropdownMenuLabel({ className, ...props }: ComponentProps<typeof RadixMenu.Label>) {
  return <RadixMenu.Label className={cn(menuLabelClass, className)} {...props} />
}

export function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof RadixMenu.Separator>) {
  return <RadixMenu.Separator className={cn(menuSeparatorClass, className)} {...props} />
}

export const DropdownMenuGroup = RadixMenu.Group

/** Menu item with a tick, for on/off choices such as which table columns to show. */
export function DropdownMenuCheckboxItem({ className, children, ...props }: ComponentProps<typeof RadixMenu.CheckboxItem>) {
  return (
    <RadixMenu.CheckboxItem className={cn('group', menuItemClass, className)} {...props}>
      <span className="flex size-4 items-center justify-center">
        <RadixMenu.ItemIndicator className="flex">
          <Icon name="check" size={16} />
        </RadixMenu.ItemIndicator>
      </span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </RadixMenu.CheckboxItem>
  )
}
