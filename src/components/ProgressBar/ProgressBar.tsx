import type { ReactNode } from 'react'
import { Progress } from 'radix-ui'
import { cn } from '../../lib/utils'

export interface ProgressBarProps {
  /** 0 to 100. */
  value: number
  /** Text above the bar, e.g. "Uploading statement" (Figma Show label). The percentage shows on the right. */
  label?: ReactNode
  status?: 'default' | 'success' | 'error'
  className?: string
}

export function ProgressBar({ value, label, status = 'default', className }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, Math.round(value)))
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {label && (
        <div className="flex items-start justify-between gap-4 whitespace-nowrap">
          <span className="truncate text-label-base text-text-primary">{label}</span>
          <span className="text-body-small text-text-secondary tabular-nums">{percent}%</span>
        </div>
      )}
      <Progress.Root value={percent} className="relative h-2 w-full overflow-hidden rounded-full bg-secondary-pressed">
        <Progress.Indicator
          className={cn(
            'h-full rounded-full transition-[width]',
            { default: 'bg-primary-default', success: 'bg-success-default', error: 'bg-error-default' }[status],
          )}
          style={{ width: `${percent}%` }}
        />
      </Progress.Root>
    </div>
  )
}
