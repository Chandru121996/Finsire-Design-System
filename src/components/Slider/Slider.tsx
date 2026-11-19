import type { ComponentProps } from 'react'
import { Slider as RadixSlider } from 'radix-ui'
import { cn } from '../../lib/utils'

export interface SliderProps extends Omit<ComponentProps<typeof RadixSlider.Root>, 'value' | 'defaultValue' | 'onValueChange'> {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  /** Screen reader label, e.g. "Loan tenure in months". */
  label: string
}

/** Pick a number in a range by dragging or with arrow keys. */
export function Slider({ value, defaultValue = 0, onValueChange, label, className, ...props }: SliderProps) {
  return (
    <RadixSlider.Root
      value={value === undefined ? undefined : [value]}
      defaultValue={[defaultValue]}
      onValueChange={values => onValueChange?.(values[0])}
      className={cn('group relative flex h-[28px] w-full touch-none items-center select-none', className)}
      {...props}
    >
      <RadixSlider.Track className="relative h-1 grow rounded-full bg-secondary-pressed group-data-[disabled]:bg-disabled-background">
        <RadixSlider.Range className="absolute h-full rounded-full bg-primary-default group-data-[disabled]:bg-disabled-foreground" />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        aria-label={label}
        className={cn(
          'block size-5 cursor-pointer rounded-full border-2 border-primary-default bg-surface-base transition-colors',
          'hover:border-primary-hover hover:bg-interaction-hover',
          'outline-border-focus focus-visible:outline-2 focus-visible:outline-offset-2',
          'group-data-[disabled]:pointer-events-none group-data-[disabled]:border-disabled-foreground group-data-[disabled]:bg-surface-base',
        )}
      />
    </RadixSlider.Root>
  )
}
