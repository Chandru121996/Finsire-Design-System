import type { ComponentProps, ReactNode } from 'react'
import { Menubar as RadixMenubar } from 'radix-ui'
import { cn } from '../../lib/utils'
import { MenuItemContent, type MenuItemContentProps } from '../DropdownMenu/DropdownMenu'
import { menuContentClass, menuItemClass, menuLabelClass, menuSeparatorClass } from '../DropdownMenu/menuStyles'

/** Figma "Menu bar": a row of menus such as File, Transfers, Reports. */
export function Menubar({ className, ...props }: ComponentProps<typeof RadixMenubar.Root>) {
  return (
    <RadixMenubar.Root
      className={cn('flex min-h-10 w-fit items-center gap-1 rounded-md border border-border-default bg-surface-base p-1', className)}
      {...props}
    />
  )
}

export interface MenubarMenuProps {
  /** Text of the Figma "Menu bar trigger". */
  label: ReactNode
  value?: string
  children: ReactNode
}

/** One menu in the bar: its trigger (Default, Hover, Open) and its dropdown. */
export function MenubarMenu({ label, value, children }: MenubarMenuProps) {
  return (
    <RadixMenubar.Menu value={value}>
      <RadixMenubar.Trigger
        className={cn(
          'flex cursor-pointer items-center rounded-sm px-3 py-1 text-label-base text-text-primary outline-none select-none',
          'hover:bg-interaction-hover data-[highlighted]:bg-interaction-hover data-[state=open]:bg-interaction-selected',
          'focus-visible:outline-2 focus-visible:-outline-offset-2 outline-border-focus',
        )}
      >
        {label}
      </RadixMenubar.Trigger>
      <RadixMenubar.Portal>
        <RadixMenubar.Content align="start" sideOffset={6} className={menuContentClass}>
          {children}
        </RadixMenubar.Content>
      </RadixMenubar.Portal>
    </RadixMenubar.Menu>
  )
}

export interface MenubarItemProps extends Omit<ComponentProps<typeof RadixMenubar.Item>, 'children'>, MenuItemContentProps {
  destructive?: boolean
}

export function MenubarItem({ icon, shortcut, destructive, className, children, ...props }: MenubarItemProps) {
  return (
    <RadixMenubar.Item data-variant={destructive ? 'destructive' : undefined} className={cn('group', menuItemClass, className)} {...props}>
      <MenuItemContent icon={icon} shortcut={shortcut}>{children}</MenuItemContent>
    </RadixMenubar.Item>
  )
}

export function MenubarLabel({ className, ...props }: ComponentProps<typeof RadixMenubar.Label>) {
  return <RadixMenubar.Label className={cn(menuLabelClass, className)} {...props} />
}

export function MenubarSeparator({ className, ...props }: ComponentProps<typeof RadixMenubar.Separator>) {
  return <RadixMenubar.Separator className={cn(menuSeparatorClass, className)} {...props} />
}
