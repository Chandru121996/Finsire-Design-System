import type { SVGAttributes } from 'react'
import { cn } from '../../lib/utils'

export type SpinnerSize = 16 | 20 | 24 | 32

// Geometry copied from the Figma Spinner: a full track circle and a quarter arc.
const geometry = {
  16: { r: 7, stroke: 2 },
  20: { r: 9, stroke: 2 },
  24: { r: 10.5, stroke: 3 },
  32: { r: 14.5, stroke: 3 },
} as const

export interface SpinnerProps extends SVGAttributes<SVGSVGElement> {
  size?: SpinnerSize
  /** Screen reader text. Default "Loading". */
  label?: string
}

/** Loading indicator. Track is border/default, arc is primary/default. */
export function Spinner({ size = 20, label = 'Loading', className, ...props }: SpinnerProps) {
  const { r, stroke } = geometry[size]
  const c = size / 2
  return (
    <svg
      role="status"
      aria-label={label}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={cn('shrink-0 animate-spin motion-reduce:animate-[spin_3s_linear_infinite]', className)}
      {...props}
    >
      <circle cx={c} cy={c} r={r} strokeWidth={stroke} className="stroke-border-default" />
      <path d={`M${c} ${c - r}A${r} ${r} 0 0 1 ${c + r} ${c}`} strokeWidth={stroke} strokeLinecap="round" className="stroke-primary-default" />
    </svg>
  )
}
