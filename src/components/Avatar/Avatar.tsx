import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

export const avatarVariants = cva('inline-flex shrink-0 items-center justify-center rounded-full select-none', {
  variants: {
    size: {
      24: 'size-6 text-label-small',
      32: 'size-8 text-label-small',
      40: 'size-10 text-label-base',
      56: 'size-[56px] text-heading-h4',
    },
    tone: {
      primary: 'bg-primary-container text-primary-on-container',
      success: 'bg-success-container text-success-on-container',
      warning: 'bg-warning-container text-warning-on-container',
      error: 'bg-error-container text-error-on-container',
      info: 'bg-info-container text-info-on-container',
      accent: 'bg-accent-container text-accent-on-container',
    },
  },
  defaultVariants: { size: 40, tone: 'primary' },
})

const iconSize = { 24: 16, 32: 16, 40: 20, 56: 24 } as const

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
  /** Figma Type=Initials. Up to two letters, e.g. "AB". */
  initials?: string
  /** Figma Type=Icon. Used when no initials are given. Default "person". */
  icon?: string
  /** Full name for screen readers, e.g. "Anita Bose". */
  name?: string
}

export function Avatar({ initials, icon = 'person', name, size = 40, tone, className, ...props }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={name ?? initials}
      className={cn(avatarVariants({ size, tone }), className)}
      {...props}
    >
      {initials ? initials.slice(0, 2).toUpperCase() : <Icon name={icon} size={iconSize[size ?? 40]} />}
    </span>
  )
}
