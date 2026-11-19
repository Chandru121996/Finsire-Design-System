import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  /** Purely visual (default) or a meaningful divider announced to screen readers. */
  decorative?: boolean
}

/** 1px line in border/default. Fills the width (horizontal) or height (vertical) of its container. */
export function Separator({ orientation = 'horizontal', decorative = true, className, ...props }: SeparatorProps) {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn('shrink-0 bg-border-default', orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch', className)}
      {...props}
    />
  )
}
