import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Badge } from '../Badge/Badge'
import { Icon } from '../Icon/Icon'
import { Tooltip } from '../Tooltip/Tooltip'

export type KpiStatus = 'excellent' | 'caution' | 'critical' | 'none'

const statusBadge = {
  excellent: { variant: 'success', label: 'Excellent' },
  caution: { variant: 'warning', label: 'Caution' },
  critical: { variant: 'error', label: 'Critical' },
} as const

export interface KpiCardProps {
  /** Already formatted, e.g. "₹224 Cr". */
  value: ReactNode
  /** Name of the measure, shown at the bottom, e.g. "Total Pledged Amount". */
  title: ReactNode
  /** Goal line under the value, e.g. "Target: ≥ 20% MoM". */
  target?: ReactNode
  /** Figma Status. Excellent (green), Caution (amber), Critical (red) or none. */
  status?: KpiStatus
  /** Explanation shown in a tooltip on the ⓘ icon. */
  info?: ReactNode
  className?: string
}

/** Compact KPI tile for dashboards (Figma "KPI card"). Fills the width it is given (210 in Figma). */
export function KpiCard({ value, title, target, status = 'none', info, className }: KpiCardProps) {
  const badge = status !== 'none' ? statusBadge[status] : undefined
  const infoIcon = <Icon name="info" size={16} className="text-text-tertiary" label={info ? 'More info' : undefined} />
  return (
    <div className={cn('flex h-[106px] min-w-0 flex-col justify-between rounded-lg border border-border-default bg-surface-base p-3', className)}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-heading-h4 text-text-primary tabular-nums">{value}</p>
          <div className="flex shrink-0 items-center gap-1">
            {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
            {info ? (
              <Tooltip label={info}>
                <button type="button" className="flex cursor-help rounded-full outline-border-focus focus-visible:outline-2">{infoIcon}</button>
              </Tooltip>
            ) : (
              infoIcon
            )}
          </div>
        </div>
        {target && <p className="truncate text-body-xsmall text-text-secondary">{target}</p>}
      </div>
      <p className="truncate text-label-base text-text-primary">{title}</p>
    </div>
  )
}
