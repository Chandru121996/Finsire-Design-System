import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type ChartSeries = 1 | 2 | 3 | 4 | 5 | 6

/** Background class for each chart/series-N token. Use these for chart colours, never raw hex. */
export const seriesBg: Record<ChartSeries, string> = {
  1: 'bg-chart-series-1',
  2: 'bg-chart-series-2',
  3: 'bg-chart-series-3',
  4: 'bg-chart-series-4',
  5: 'bg-chart-series-5',
  6: 'bg-chart-series-6',
}

/** CSS variable for each series, for chart libraries that take a colour string. */
export const seriesColor = (series: ChartSeries) => `var(--color-chart-series-${series})`

export interface LegendItemProps {
  label: ReactNode
  /** Which chart/series colour (1 to 6). */
  series: ChartSeries
  className?: string
}

/** Coloured dot and series name (Figma "Legend item"). */
export function LegendItem({ label, series, className }: LegendItemProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-body-small whitespace-nowrap text-text-secondary', className)}>
      <span aria-hidden className={cn('size-3 shrink-0 rounded-full', seriesBg[series])} />
      {label}
    </span>
  )
}
