import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export type IconSize = 16 | 20 | 24 | 32
export type IconStyle = 'outlined' | 'filled'

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Any Material Symbols name from fonts.google.com/icons, e.g. "account_balance". Same as the Figma Name property. */
  name: string
  /** Figma Size. Default 20. */
  size?: IconSize
  /** Figma Style. Use "filled" only for active or selected states. Default "outlined". */
  iconStyle?: IconStyle
  /** Text for screen readers. Leave empty when the icon is decorative (next to a label). */
  label?: string
}

/** Material Symbols Rounded icon. Colour follows the surrounding text colour. */
export function Icon({ name, size = 20, iconStyle = 'outlined', label, className, style, ...props }: IconProps) {
  return (
    <span
      className={cn('material-symbols-rounded shrink-0 select-none', className)}
      style={{
        fontSize: size,
        lineHeight: `${size}px`,
        // Optical size axis starts at 20, so 16px icons use the 20 design.
        fontVariationSettings: `'FILL' ${iconStyle === 'filled' ? 1 : 0}, 'GRAD' 0, 'opsz' ${Math.max(size, 20)}`,
        ...style,
      }}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      {...props}
    >
      {name}
    </span>
  )
}
