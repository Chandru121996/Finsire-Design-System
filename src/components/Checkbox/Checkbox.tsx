import { useId, type ComponentProps, type ReactNode } from 'react'
import { Checkbox as RadixCheckbox } from 'radix-ui'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

export interface CheckboxProps extends Omit<ComponentProps<typeof RadixCheckbox.Root>, 'children'> {
  /** Text next to the box. */
  label?: ReactNode
  /** Figma State=Error. Red border, or red fill when checked. */
  invalid?: boolean
}

/** Checked can be true, false or "indeterminate" (Figma Checked property). */
export function Checkbox({ label, invalid, disabled, id, className, ...props }: CheckboxProps) {
  const autoId = useId()
  const boxId = id ?? autoId
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <RadixCheckbox.Root
        id={boxId}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          'group peer flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border-strong bg-surface-base text-primary-on-default transition-colors',
          'hover:bg-interaction-hover',
          'data-[state=checked]:border-transparent data-[state=checked]:bg-primary-default data-[state=checked]:hover:bg-primary-hover',
          'data-[state=indeterminate]:border-transparent data-[state=indeterminate]:bg-primary-default data-[state=indeterminate]:hover:bg-primary-hover',
          'aria-invalid:border-error-default aria-invalid:hover:bg-surface-base aria-invalid:data-[state=checked]:bg-error-default aria-invalid:data-[state=indeterminate]:bg-error-default aria-invalid:text-error-on-default',
          'outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2',
          'disabled:pointer-events-none disabled:border-border-default disabled:bg-disabled-background disabled:text-disabled-foreground',
          'disabled:data-[state=checked]:border-border-default disabled:data-[state=checked]:bg-disabled-background',
          'disabled:data-[state=indeterminate]:border-border-default disabled:data-[state=indeterminate]:bg-disabled-background',
        )}
        {...props}
      >
        <RadixCheckbox.Indicator className="flex">
          <Icon name="check" size={16} iconStyle="filled" className="hidden group-data-[state=checked]:block" />
          <Icon name="remove" size={16} iconStyle="filled" className="hidden group-data-[state=indeterminate]:block" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label
          htmlFor={boxId}
          className="cursor-pointer text-body-base text-text-primary peer-disabled:cursor-default peer-disabled:text-disabled-foreground"
        >
          {label}
        </label>
      )}
    </div>
  )
}
