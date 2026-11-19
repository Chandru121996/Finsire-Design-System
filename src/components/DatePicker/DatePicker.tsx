import { useId, useState, type ReactNode } from 'react'
import { Popover } from 'radix-ui'
import { cn } from '../../lib/utils'
import { Calendar, type CalendarProps } from '../Calendar/Calendar'
import { Field, fieldBoxVariants, helperId, type FieldStatus } from '../Field/Field'
import { Icon } from '../Icon/Icon'

/** "24 Nov 2026" */
export const formatDate = (date: Date) => date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

export interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  label?: ReactNode
  helperText?: ReactNode
  status?: Extract<FieldStatus, 'default' | 'error'>
  disabled?: boolean
  /** Days that cannot be picked, e.g. [{ before: new Date() }]. */
  disabledDays?: CalendarProps['disabled']
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  id?: string
  className?: string
}

/** Figma "Date picker": a field that opens a Calendar. */
export function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select date',
  label,
  helperText,
  status = 'default',
  disabled,
  disabledDays,
  open,
  defaultOpen = false,
  onOpenChange,
  id,
  className,
}: DatePickerProps) {
  const autoId = useId()
  const triggerId = id ?? autoId
  const [innerValue, setInnerValue] = useState(defaultValue)
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const date = value ?? innerValue
  const isOpen = open ?? innerOpen
  const setOpen = (next: boolean) => {
    setInnerOpen(next)
    onOpenChange?.(next)
  }

  return (
    <Field id={triggerId} label={label} helperText={helperText} status={status} disabled={disabled} className={className}>
      <Popover.Root open={isOpen} onOpenChange={setOpen}>
        <Popover.Trigger
          id={triggerId}
          disabled={disabled}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={helperText ? helperId(triggerId) : undefined}
          className={cn(
            fieldBoxVariants({ status, disabled }),
            'h-10 cursor-pointer text-left outline-none',
            'data-[state=open]:border-border-focus data-[state=open]:inset-ring-1 data-[state=open]:inset-ring-border-focus',
            'focus-visible:border-border-focus focus-visible:inset-ring-1 focus-visible:inset-ring-border-focus',
          )}
        >
          <span className={cn('min-w-0 flex-1 truncate', !date && 'text-text-tertiary')}>{date ? formatDate(date) : placeholder}</span>
          <Icon name="calendar_month" size={20} className={disabled ? 'text-disabled-foreground' : 'text-text-tertiary'} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align="start" sideOffset={8} className="z-50">
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date}
              disabled={disabledDays}
              onSelect={next => {
                setInnerValue(next)
                onValueChange?.(next)
                setOpen(false)
              }}
              className="shadow-md"
              autoFocus
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </Field>
  )
}
