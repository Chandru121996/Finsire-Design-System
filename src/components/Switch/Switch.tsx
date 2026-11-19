import { useId, type ComponentProps, type ReactNode } from 'react'
import { Switch as RadixSwitch } from 'radix-ui'
import { cn } from '../../lib/utils'

export interface SwitchProps extends Omit<ComponentProps<typeof RadixSwitch.Root>, 'children'> {
  /** Text next to the switch (Figma Show label). Without it, pass aria-label. */
  label?: ReactNode
}

/** On / off toggle that takes effect immediately, such as "Auto-debit". */
export function Switch({ label, id, className, ...props }: SwitchProps) {
  const autoId = useId()
  const switchId = id ?? autoId
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <RadixSwitch.Root
        id={switchId}
        className={cn(
          'group peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-secondary-pressed transition-colors',
          'hover:bg-text-tertiary data-[state=checked]:bg-primary-default data-[state=checked]:hover:bg-primary-hover',
          'outline-border-focus focus-visible:outline-2 focus-visible:outline-offset-0',
          'disabled:pointer-events-none disabled:bg-disabled-background data-[state=checked]:disabled:bg-disabled-background',
        )}
        {...props}
      >
        <RadixSwitch.Thumb
          className={cn(
            'block size-5 translate-x-[2px] rounded-full bg-surface-base transition-transform',
            'data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-primary-on-default',
            'group-disabled:data-[state=checked]:bg-disabled-foreground',
          )}
        />
      </RadixSwitch.Root>
      {label && (
        <label
          htmlFor={switchId}
          className="cursor-pointer text-body-base text-text-primary peer-disabled:cursor-default peer-disabled:text-disabled-foreground"
        >
          {label}
        </label>
      )}
    </div>
  )
}
