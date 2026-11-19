import { useId, type ComponentProps, type ReactNode } from 'react'
import { RadioGroup as RadixRadio } from 'radix-ui'
import { cn } from '../../lib/utils'

export interface RadioGroupProps extends ComponentProps<typeof RadixRadio.Root> {
  /** Group label shown above the options, e.g. "Payment method". */
  label?: ReactNode
  /** Figma State=Error for every option. */
  invalid?: boolean
}

/** Figma "Radio group": a label and a list of Radio options. Only one can be selected. */
export function RadioGroup({ label, invalid, className, children, ...props }: RadioGroupProps) {
  const labelId = useId()
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {label && <span id={labelId} className="text-label-base text-text-primary">{label}</span>}
      <RadixRadio.Root
        aria-labelledby={label ? labelId : undefined}
        aria-invalid={invalid || undefined}
        className="group/radios flex flex-col gap-3 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:gap-6"
        {...props}
      >
        {children}
      </RadixRadio.Root>
    </div>
  )
}

export interface RadioProps extends Omit<ComponentProps<typeof RadixRadio.Item>, 'children'> {
  label?: ReactNode
}

/** One option inside a RadioGroup. */
export function Radio({ label, id, disabled, className, ...props }: RadioProps) {
  const autoId = useId()
  const radioId = id ?? autoId
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <RadixRadio.Item
        id={radioId}
        disabled={disabled}
        className={cn(
          'peer flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-surface-base transition-colors',
          'hover:bg-interaction-hover data-[state=checked]:border-2 data-[state=checked]:border-primary-default',
          'group-aria-invalid/radios:border-error-default group-aria-invalid/radios:hover:bg-surface-base group-aria-invalid/radios:data-[state=checked]:border-error-default',
          'outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2',
          'disabled:pointer-events-none disabled:border-border-default disabled:bg-disabled-background disabled:data-[state=checked]:border-border-default',
        )}
        {...props}
      >
        <RadixRadio.Indicator
          className={cn(
            'size-[10px] rounded-full bg-primary-default',
            'group-aria-invalid/radios:bg-error-default group-data-[disabled]/radios:bg-disabled-foreground',
            disabled && 'bg-disabled-foreground',
          )}
        />
      </RadixRadio.Item>
      {label && (
        <label
          htmlFor={radioId}
          className="cursor-pointer text-body-base text-text-primary peer-disabled:cursor-default peer-disabled:text-disabled-foreground"
        >
          {label}
        </label>
      )}
    </div>
  )
}
