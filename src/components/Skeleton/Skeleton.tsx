import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const skeletonVariants = cva('animate-pulse bg-interaction-pressed motion-reduce:animate-none', {
  variants: {
    variant: {
      text: 'h-4 w-full rounded-sm',
      circle: 'size-10 rounded-full',
      rectangle: 'h-[120px] w-full rounded-md',
    },
  },
  defaultVariants: { variant: 'text' },
})

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

/** Loading placeholder. Set the width (and height for rectangles) with className, e.g. "w-[200px]". */
export function Skeleton({ variant, className, ...props }: SkeletonProps) {
  return <div aria-hidden className={cn(skeletonVariants({ variant }), className)} {...props} />
}
