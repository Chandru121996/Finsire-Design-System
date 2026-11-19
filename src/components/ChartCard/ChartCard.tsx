import { useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { IconButton } from '../IconButton/IconButton'
import { LegendItem, type ChartSeries } from '../LegendItem/LegendItem'

export interface ChartCardProps {
  title: ReactNode
  /** The chart, usually a <Chart />. */
  children: ReactNode
  /** Legend under the chart. Always give one when there are two or more series. */
  legend?: { label: ReactNode; series: ChartSeries }[]
  /** The same data as a table, usually a <ChartTable />. The top-right button (Figma Show action) switches to it. */
  table?: ReactNode
  /** A custom top-right button instead of the table switch. */
  action?: { icon?: string; label: string; onClick: () => void }
  className?: string
}

/** Card frame for a chart: title, table-view button, chart, legend (Figma "Chart card"). */
export function ChartCard({ title, children, legend, table, action, className }: ChartCardProps) {
  const [showTable, setShowTable] = useState(false)
  return (
    <section className={cn('flex flex-col gap-4 rounded-lg border border-border-default bg-surface-base p-6', className)}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="truncate text-heading-h5 text-text-primary">{title}</h3>
        {action ? (
          <IconButton icon={action.icon ?? 'table_view'} label={action.label} size={32} bordered onClick={action.onClick} />
        ) : (
          table && (
            <IconButton
              icon={showTable ? 'bar_chart' : 'table_view'}
              label={showTable ? 'Show chart' : 'Show as table'}
              size={32}
              bordered
              onClick={() => setShowTable(value => !value)}
            />
          )
        )}
      </div>
      <div className="min-h-0 w-full">{showTable && table ? table : children}</div>
      {legend && legend.length > 0 && !showTable && (
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
          {legend.map((item, index) => <LegendItem key={index} {...item} />)}
        </div>
      )}
    </section>
  )
}
