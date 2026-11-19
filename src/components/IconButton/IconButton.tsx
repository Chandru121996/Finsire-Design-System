import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconSize, type IconStyle } from '../Icon/Icon'

// Figma "Icon button" and "Icon button bordered". Active is the selected / toggled-on state.
export const iconButtonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-text-secondary transition-colors',
    'hover:bg-interaction-hover hover:text-text-primary active:bg-interaction-pressed active:text-text-primary',
    'aria-pressed:bg-primary-container aria-pressed:text-primary-on-container',
    'outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2',
    'disabled:pointer-events-none disabled:text-disabled-foreground',
  ],
  {
    variants: {
      size: { 32: 'size-8', 40: 'size-10' },
      bordered: {
        true: [
          'border border-border-default bg-surface-base shadow-xs',
          'aria-pressed:border-primary-default disabled:bg-disabled-background disabled:shadow-none',
        ],
        false: '',
      },
    },
    defaultVariants: { size: 40, bordered: false },
  },
)

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof iconButtonVariants> {
  /** Material Symbols name, e.g. "search". */
  icon: string
  /** What the button does, read by screen readers, e.g. "Search". Required because there is no visible text. */
  label: string
  iconStyle?: IconStyle
  /** Override the icon size. Default 16 for size 32, 20 for size 40. */
  iconSize?: IconSize
  /** Figma State=Active. Use for toggles such as a selected view. Sets aria-pressed. */
  active?: boolean
}

export function IconButton({ icon, label, iconStyle, iconSize, size = 40, bordered, active, className, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      aria-pressed={active}
      className={cn(iconButtonVariants({ size, bordered }), className)}
      {...props}
    >
      <Icon name={icon} iconStyle={iconStyle} size={iconSize ?? (size === 32 ? 16 : 20)} />
    </button>
  )
}
