import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Field, fieldBoxVariants, helperId, type FieldStatus } from '../Field/Field'
import { Icon } from '../Icon/Icon'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode
  helperText?: ReactNode
  /** Error shows a red border and helper text; success shows green. */
  status?: FieldStatus
  /** Icon name before the text, e.g. "search". */
  leadingIcon?: string
  /** Icon name after the text, e.g. "visibility". Use trailing for a clickable element instead. */
  trailingIcon?: string
  /** Any element after the text, such as an icon button. */
  trailing?: ReactNode
  /** Class for the outer wrapper (label + field + helper). */
  className?: string
  /** Class for the <input> element itself. */
  inputClassName?: string
}

export function Input({
  label,
  helperText,
  status = 'default',
  leadingIcon,
  trailingIcon,
  trailing,
  disabled,
  id,
  className,
  inputClassName,
  ...props
}: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const iconClass = disabled ? 'text-disabled-foreground' : 'text-text-tertiary'
  return (
    <Field id={inputId} label={label} helperText={helperText} status={status} disabled={disabled} className={className}>
      <div className={cn(fieldBoxVariants({ status, disabled }), 'h-10')}>
        {leadingIcon && <Icon name={leadingIcon} size={20} className={iconClass} />}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={helperText ? helperId(inputId) : undefined}
          className={cn(
            'h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-tertiary disabled:placeholder:text-disabled-foreground',
            inputClassName,
          )}
          {...props}
        />
        {trailingIcon && <Icon name={trailingIcon} size={20} className={iconClass} />}
        {trailing}
      </div>
    </Field>
  )
}
