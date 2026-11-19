// Shared look of Figma "Dropdown menu" and "Menu item", used by DropdownMenu and Menubar.
export const menuContentClass =
  'z-50 min-w-[240px] rounded-md border border-border-default bg-surface-overlay p-1 shadow-md outline-none'

export const menuItemClass = [
  'flex cursor-pointer items-center gap-2 rounded-sm p-2 text-body-small text-text-primary outline-none select-none',
  'hover:bg-interaction-hover data-[highlighted]:bg-interaction-hover',
  'data-[variant=destructive]:text-error-default data-[variant=destructive]:hover:bg-error-container data-[variant=destructive]:data-[highlighted]:bg-error-container',
  'data-[disabled]:pointer-events-none data-[disabled]:text-disabled-foreground',
].join(' ')

export const menuShortcutClass = 'ml-auto pl-4 text-body-xsmall text-text-tertiary group-data-[disabled]:text-disabled-foreground'
export const menuLabelClass = 'p-2 text-label-small text-text-secondary'
export const menuSeparatorClass = 'my-1 h-px bg-border-default'
