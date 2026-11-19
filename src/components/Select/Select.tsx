import { useId, type ReactNode } from 'react'
import { Select as RadixSelect } from 'radix-ui'
import { cn } from '../../lib/utils'
import { Field, fieldBoxVariants, helperId, type FieldStatus } from '../Field/Field'
import { Icon } from '../Icon/Icon'

export interface SelectOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: ReactNode
  helperText?: ReactNode
  /** Only "error" applies to Select (Figma has no success state). */
  status?: Extract<FieldStatus, 'default' | 'error'>
  disabled?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  name?: string
  required?: boolean
  id?: string
  className?: string
}

/** Figma "Select" field with its "Select menu" of "Select item" options. */
export function Select({
  options,
  placeholder = 'Select',
  label,
  helperText,
  status = 'default',
  disabled,
  id,
  className,
  ...rootProps
}: SelectProps) {
  const autoId = useId()
  const triggerId = id ?? autoId
  return (
    <Field id={triggerId} label={label} helperText={helperText} status={status} disabled={disabled} className={className}>
      <RadixSelect.Root disabled={disabled} {...rootProps}>
        <RadixSelect.Trigger
          id={triggerId}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={helperText ? helperId(triggerId) : undefined}
          className={cn(
            fieldBoxVariants({ status, disabled }),
            'group h-10 cursor-pointer text-left outline-none',
            'data-[state=open]:border-border-focus data-[state=open]:inset-ring-1 data-[state=open]:inset-ring-border-focus',
            'focus-visible:border-border-focus focus-visible:inset-ring-1 focus-visible:inset-ring-border-focus',
            'data-[placeholder]:text-text-tertiary',
          )}
        >
          <span className="min-w-0 flex-1 truncate">
            <RadixSelect.Value placeholder={placeholder} />
          </span>
          <RadixSelect.Icon asChild>
            <Icon
              name="expand_more"
              size={20}
              className={cn('transition-transform group-data-[state=open]:rotate-180', disabled ? 'text-disabled-foreground' : 'text-text-tertiary')}
            />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={4}
            className="z-50 max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border-default bg-surface-overlay shadow-md"
          >
            <RadixSelect.Viewport className="flex flex-col p-1">
              {options.map(option => (
                <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </SelectItem>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </Field>
  )
}

/** Figma "Select item": Default, Hover (keyboard or mouse highlight), Selected, Disabled. */
function SelectItem({ value, disabled, children }: { value: string; disabled?: boolean; children: ReactNode }) {
  return (
    <RadixSelect.Item
      value={value}
      disabled={disabled}
      className={cn(
        'flex h-[36px] cursor-pointer items-center gap-2 rounded-sm px-3 text-body-base text-text-primary outline-none select-none',
        'data-[highlighted]:bg-interaction-hover data-[state=checked]:bg-interaction-selected',
        'data-[disabled]:pointer-events-none data-[disabled]:text-disabled-foreground',
      )}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="ml-auto flex">
        <Icon name="check" size={20} className="text-primary-default" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
}
