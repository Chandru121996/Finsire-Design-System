import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

// Hover, Pressed, Focus and Disabled from Figma map to :hover, :active, :focus-visible and the disabled attribute.
export const buttonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors select-none',
    'outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2',
    'disabled:pointer-events-none disabled:text-disabled-foreground',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary-default text-primary-on-default hover:bg-primary-hover active:bg-primary-pressed disabled:bg-disabled-background',
        secondary:
          'bg-secondary-default text-secondary-on-default hover:bg-secondary-hover active:bg-secondary-pressed disabled:bg-disabled-background',
        outline:
          'border border-border-strong text-text-primary hover:bg-interaction-hover active:bg-interaction-pressed disabled:border-border-default',
        ghost: 'text-text-primary hover:bg-interaction-hover active:bg-interaction-pressed',
        destructive:
          'bg-error-default text-error-on-default hover:bg-error-hover active:bg-error-pressed disabled:bg-disabled-background',
      },
      size: {
        small: 'h-8 px-3 text-label-base',
        medium: 'h-10 px-4 text-label-base',
        large: 'h-12 px-6 text-label-large',
      },
    },
    defaultVariants: { variant: 'primary', size: 'medium' },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Icon name shown before the label (Figma "Leading icon"). */
  leadingIcon?: string
  /** Icon name shown after the label (Figma "Trailing icon"). */
  trailingIcon?: string
  /** Render the child element (for example a link) with button styles instead of a <button>. */
  asChild?: boolean
}

export function Button({
  variant,
  size,
  leadingIcon,
  trailingIcon,
  asChild = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const iconSize = size === 'small' ? 16 : 20
  const Comp = asChild ? Slot.Root : 'button'
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} type={asChild ? undefined : type} {...props}>
      {leadingIcon && <Icon name={leadingIcon} size={iconSize} />}
      {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children}
      {trailingIcon && <Icon name={trailingIcon} size={iconSize} />}
    </Comp>
  )
}
