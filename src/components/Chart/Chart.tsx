import type { ReactNode } from 'react'
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from 'recharts'
import { cn } from '../../lib/utils'
import { seriesBg, seriesColor, type ChartSeries } from '../LegendItem/LegendItem'

// Real charts drawn with Recharts. Every colour comes from the chart/* tokens, so Light and Dark just work.

export interface ChartSeriesConfig {
  /** Field in each data row that holds this series' number. */
  key: string
  /** Name shown in the legend, tooltip and table. */
  label: string
  /** Which chart/series colour (1 to 6). Keep it fixed per entity, never by rank. */
  series: ChartSeries
  /** Bar-and-line charts only: draw this series as a bar or a line. */
  kind?: 'bar' | 'line'
}

export type ChartType = 'horizontal-bar' | 'bar-line' | 'line'

export interface ChartProps {
  /** Figma Type. */
  type: ChartType
  /**
   * One object per category / time point, e.g. { month: "May'23", disbursed: 35000, pledged: 90000 }.
   * Horizontal bars: add __series (1 to 6) to a row to give that bar its own colour, as in Figma.
   */
  data: Record<string, string | number>[]
  /** Field used for the category axis (x, or y for horizontal bars). */
  categoryKey: string
  series: ChartSeriesConfig[]
  /** Formats numbers on the value axis, e.g. v => formatINRCompact(v). */
  axisFormatter?: (value: number) => string
  /** Formats numbers in the tooltip. Defaults to axisFormatter. */
  valueFormatter?: (value: number) => string
  /** Pixel height. Default 300 (Figma). */
  height?: number
  className?: string
  /** Short description for screen readers, e.g. "Monthly disbursement and pledged amount". */
  ariaLabel?: string
}

const axisTick = { fill: 'var(--color-chart-axis)', fontSize: 12 }
const gridStroke = 'var(--color-chart-grid)'
const defaultFormat = (value: number) => value.toLocaleString('en-IN')

/** Round axis steps (1, 2, 2.5 or 5 × 10ⁿ), at most 6 intervals, starting at 0. E.g. max 3,700 -> 0, 1,000 … 4,000. */
export function niceTicks(max: number, maxIntervals = 6): number[] {
  if (!(max > 0)) return [0, 1]
  const magnitude = 10 ** Math.floor(Math.log10(max / maxIntervals))
  const step = [1, 2, 2.5, 5, 10].map(m => m * magnitude).find(s => Math.ceil(max / s) <= maxIntervals) ?? magnitude * 10
  return Array.from({ length: Math.ceil(max / step) + 1 }, (_, i) => Number((i * step).toPrecision(12)))
}

/** Shorten long category names so they fit under a column, e.g. "ICICI Prudential" -> "ICICI Pru…". */
const truncate = (text: string, max = 11) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text)

/** Two-line category labels for horizontal bars (Figma "Account / Created"). */
function WrappedTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  const words = String(payload?.value ?? '').split(' ')
  const lines = words.length > 1 ? [words.slice(0, -1).join(' '), words.at(-1)!] : words
  return (
    <text x={x} y={y} textAnchor="end" fill="var(--color-chart-axis)" fontSize={12}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? (lines.length > 1 ? -2 : 4) : 16}>{truncate(line, 12)}</tspan>
      ))}
    </text>
  )
}

/** Tooltip panel in the system's overlay style. Text uses text tokens; the dot carries the series colour. */
function ChartTooltipContent({
  active,
  payload,
  label,
  format,
  config,
}: TooltipContentProps<number, string> & { format: (v: number) => string; config: ChartSeriesConfig[] }) {
  if (!active || !payload?.length) return null
  return (
    <div className="flex min-w-[160px] flex-col gap-1 rounded-md border border-border-default bg-surface-overlay p-3 shadow-md">
      {label !== undefined && <p className="text-label-small text-text-primary">{String(label)}</p>}
      {payload.map(item => {
        const series = (item.payload?.__series ?? config.find(s => s.key === item.dataKey)?.series) as ChartSeries | undefined
        return (
          <div key={String(item.dataKey)} className="flex items-center gap-2 text-body-xsmall">
            <span aria-hidden className={cn('size-2 shrink-0 rounded-full', series && seriesBg[series])} />
            <span className="flex-1 text-text-secondary">{item.name}</span>
            <span className="text-label-small text-text-primary tabular-nums">{format(Number(item.value))}</span>
          </div>
        )
      })}
    </div>
  )
}

/** Figma "Chart": Horizontal bar, Bar and line, or Line. Put it inside a ChartCard. */
export function Chart({
  type,
  data,
  categoryKey,
  series,
  axisFormatter = defaultFormat,
  valueFormatter,
  height = 300,
  className,
  ariaLabel,
}: ChartProps) {
  const format = valueFormatter ?? axisFormatter
  const horizontal = type === 'horizontal-bar'
  const ticks = niceTicks(Math.max(0, ...data.flatMap(row => series.map(s => Number(row[s.key]) || 0))))
  const domain: [number, number] = [0, ticks.at(-1)!]
  const tooltip = (
    <RechartsTooltip
      cursor={horizontal || type === 'bar-line' ? { fill: 'var(--color-interaction-hover)' } : { stroke: 'var(--color-chart-axis)', strokeWidth: 1 }}
      content={props => <ChartTooltipContent {...(props as TooltipContentProps<number, string>)} format={format} config={series} />}
      isAnimationActive={false}
    />
  )

  return (
    <div role="img" aria-label={ariaLabel} className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {horizontal ? (
          <ComposedChart data={data} layout="vertical" margin={{ top: 8, right: 12, bottom: 0, left: 8 }}>
            <CartesianGrid horizontal={false} stroke={gridStroke} />
            <XAxis type="number" domain={domain} ticks={ticks} tickFormatter={axisFormatter} tick={axisTick} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey={categoryKey} width={68} tick={<WrappedTick />} axisLine={{ stroke: gridStroke }} tickLine={false} />
            {tooltip}
            {series.map(s => (
              <Bar key={s.key} dataKey={s.key} name={s.label} barSize={10} radius={[0, 2, 2, 0]} fill={seriesColor(s.series)} isAnimationActive={false}>
                {data.map((row, index) => (
                  <Cell key={index} fill={seriesColor((row.__series as ChartSeries | undefined) ?? s.series)} />
                ))}
              </Bar>
            ))}
          </ComposedChart>
        ) : (
          <ComposedChart data={data} margin={{ top: 8, right: type === 'line' ? 24 : 12, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke={gridStroke} />
            <XAxis
              dataKey={categoryKey}
              tick={axisTick}
              tickFormatter={value => truncate(String(value))}
              axisLine={{ stroke: gridStroke }}
              tickLine={false}
              interval={type === 'line' ? 1 : 0}
              padding={type === 'line' ? { left: 0, right: 0 } : undefined}
            />
            <YAxis domain={domain} ticks={ticks} tickFormatter={axisFormatter} tick={axisTick} axisLine={false} tickLine={false} width={52} />
            {tooltip}
            {series.map(s =>
              type === 'line' || s.kind === 'line' ? (
                <Line
                  key={s.key}
                  dataKey={s.key}
                  name={s.label}
                  type="linear"
                  stroke={seriesColor(s.series)}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  dot={{ r: 3, strokeWidth: 2, fill: 'var(--color-surface-base)', stroke: seriesColor(s.series) }}
                  activeDot={{ r: 5, strokeWidth: 2, fill: seriesColor(s.series), stroke: 'var(--color-surface-base)' }}
                  isAnimationActive={false}
                />
              ) : (
                <Bar key={s.key} dataKey={s.key} name={s.label} barSize={8} radius={[2, 2, 0, 0]} fill={seriesColor(s.series)} isAnimationActive={false} />
              ),
            )}
          </ComposedChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export interface ChartTableProps {
  data: Record<string, string | number>[]
  categoryKey: string
  /** Header of the first column, e.g. "Month". */
  categoryLabel: string
  series: ChartSeriesConfig[]
  valueFormatter?: (value: number) => string
  className?: string
}

/** The same numbers as a table: the accessible alternative to a chart (Chart card's ⊞ button). */
export function ChartTable({ data, categoryKey, categoryLabel, series, valueFormatter = defaultFormat, className }: ChartTableProps): ReactNode {
  return (
    <div className={cn('max-h-[300px] overflow-auto rounded-md border border-border-default', className)}>
      <table className="w-full border-collapse text-body-small">
        <thead className="sticky top-0 bg-surface-muted">
          <tr>
            <th scope="col" className="px-3 py-2 text-left text-label-small text-text-secondary">{categoryLabel}</th>
            {series.map(s => (
              <th key={s.key} scope="col" className="px-3 py-2 text-right text-label-small text-text-secondary">{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t border-border-default">
              <th scope="row" className="px-3 py-2 text-left font-regular text-text-primary">{String(row[categoryKey])}</th>
              {series.map(s => (
                <td key={s.key} className="px-3 py-2 text-right text-text-primary tabular-nums">
                  {row[s.key] === undefined ? '–' : valueFormatter(Number(row[s.key]))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
