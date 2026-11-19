import type { ComponentProps } from 'react'
import { Tabs as RadixTabs } from 'radix-ui'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

/** Wraps a TabsList and its TabsContent panels. Set defaultValue (or value) to the active tab. */
export function Tabs({ className, ...props }: ComponentProps<typeof RadixTabs.Root>) {
  return <RadixTabs.Root className={cn('flex flex-col gap-4', className)} {...props} />
}

export interface TabsListProps extends ComponentProps<typeof RadixTabs.List> {
  /** Figma Style. Line for page sections, Pill for switching views inside a card. */
  variant?: 'line' | 'pill'
}

export function TabsList({ variant = 'line', className, ...props }: TabsListProps) {
  return (
    <RadixTabs.List
      data-variant={variant}
      className={cn(
        'group/tabs flex',
        variant === 'line' ? 'items-end border-b border-border-default' : 'w-fit items-center gap-1 rounded-lg bg-surface-muted p-1',
        className,
      )}
      {...props}
    />
  )
}

export interface TabsTriggerProps extends ComponentProps<typeof RadixTabs.Trigger> {
  /** Icon before the label (Figma Show icon). */
  icon?: string
}

/** Figma "Tab item": Default, Hover, Active, Disabled. */
export function TabsTrigger({ icon, className, children, ...props }: TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      className={cn(
        'flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap text-label-base text-text-secondary transition-colors',
        'hover:text-text-primary data-[state=active]:text-text-primary',
        'outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2',
        'disabled:pointer-events-none disabled:text-disabled-foreground',
        // Line
        'group-data-[variant=line]/tabs:-mb-px group-data-[variant=line]/tabs:border-b-2 group-data-[variant=line]/tabs:border-transparent group-data-[variant=line]/tabs:px-4 group-data-[variant=line]/tabs:py-3',
        'group-data-[variant=line]/tabs:hover:border-border-strong group-data-[variant=line]/tabs:data-[state=active]:border-primary-default',
        // Pill
        'group-data-[variant=pill]/tabs:rounded-md group-data-[variant=pill]/tabs:px-3 group-data-[variant=pill]/tabs:py-1',
        'group-data-[variant=pill]/tabs:data-[state=active]:bg-surface-base group-data-[variant=pill]/tabs:data-[state=active]:shadow-xs',
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </RadixTabs.Trigger>
  )
}

export function TabsContent({ className, ...props }: ComponentProps<typeof RadixTabs.Content>) {
  return <RadixTabs.Content className={cn('outline-none', className)} {...props} />
}
