import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Badge } from '../Badge/Badge'
import { Icon } from '../Icon/Icon'

export interface StatCardProps {
  label: ReactNode
  /** Already formatted, e.g. "₹ 48,250.00" or "₹ 224 Cr". */
  value: ReactNode
  icon?: string
  /** Change badge, e.g. { value: "+12.5%", trend: "up" }. Up is green, down is red. */
  change?: { value: ReactNode; trend: 'up' | 'down' | 'neutral' }
  /** Text after the change badge. Default "vs last month". */
  comparison?: ReactNode
  className?: string
}

const trendBadge = { up: 'success', down: 'error', neutral: 'secondary' } as const

/** Big number with a label and change (Figma "Stat card"). */
export function StatCard({ label, value, icon = 'account_balance_wallet', change, comparison = 'vs last month', className }: StatCardProps) {
  return (
    <div className={cn('flex flex-col gap-3 rounded-lg border border-border-default bg-surface-base p-4', className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-label-base text-text-secondary">{label}</p>
        <Icon name={icon} size={20} className="text-text-tertiary" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="truncate text-heading-h2 text-text-primary tabular-nums">{value}</p>
        {change && (
          <div className="flex items-center gap-2">
            <Badge variant={trendBadge[change.trend]} className="tabular-nums">
              {change.value}
            </Badge>
            <span className="text-body-xsmall text-text-secondary">{comparison}</span>
          </div>
        )}
      </div>
    </div>
  )
}
