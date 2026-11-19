import { useId, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Field, fieldBoxVariants, helperId, type FieldStatus } from '../Field/Field'
import { Icon } from '../Icon/Icon'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode
  helperText?: ReactNode
  status?: FieldStatus
  leadingIcon?: string
  trailingIcon?: string
  className?: string
  textareaClassName?: string
}

/** Multi-line text field. 96px tall by default. */
export function Textarea({
  label,
  helperText,
  status = 'default',
  leadingIcon,
  trailingIcon,
  disabled,
  id,
  className,
  textareaClassName,
  ...props
}: TextareaProps) {
  const autoId = useId()
  const textareaId = id ?? autoId
  const iconClass = disabled ? 'text-disabled-foreground' : 'text-text-tertiary'
  return (
    <Field id={textareaId} label={label} helperText={helperText} status={status} disabled={disabled} className={className}>
      <div className={cn(fieldBoxVariants({ status, disabled }), 'items-start py-2')}>
        {leadingIcon && <Icon name={leadingIcon} size={20} className={cn('mt-[2px]', iconClass)} />}
        <textarea
          id={textareaId}
          disabled={disabled}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={helperText ? helperId(textareaId) : undefined}
          className={cn(
            'min-h-[78px] min-w-0 flex-1 resize-none bg-transparent outline-none placeholder:text-text-tertiary disabled:placeholder:text-disabled-foreground',
            textareaClassName,
          )}
          {...props}
        />
        {trailingIcon && <Icon name={trailingIcon} size={20} className={cn('mt-[2px]', iconClass)} />}
      </div>
    </Field>
  )
}
