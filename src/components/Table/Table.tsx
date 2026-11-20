import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes, type ReactNode, type TdHTMLAttributes, type ThHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Avatar } from '../Avatar/Avatar'
import { Icon } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'
import { Tooltip } from '../Tooltip/Tooltip'

// Building blocks matching the Figma "Data Table" page. DataTable puts them together for you.

/**
 * Figma Density.
 * - comfortable: 56px rows, cells may wrap to two lines.
 * - compact: 40px rows, one line per cell (long text ends in "…" with a tooltip). For dense screens such as the Master Log.
 */
export type TableDensity = 'comfortable' | 'compact'

const DensityContext = createContext<TableDensity>('comfortable')
const useDensity = () => useContext(DensityContext)

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Row height and text size of every row, header and cell inside. Default comfortable. */
  density?: TableDensity
  /** Class for the bordered frame around the table, e.g. a max height so the rows scroll. */
  containerClassName?: string
  /** Number of columns fixed on the left while the others scroll sideways, e.g. 2 for checkbox + name. */
  stickyStart?: number
  /** Number of columns fixed on the right, e.g. 2 for status + actions. */
  stickyEnd?: number
}

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Bordered table frame. Scrolls sideways (and down, if you limit its height) when the content is bigger.
 * When it scrolls sideways:
 * - stickyStart / stickyEnd columns stay in place, with a soft shadow where columns are hidden underneath.
 * - ‹ › buttons at the edges (shown while the mouse is over the table) slide one column at a time.
 * - Shift + mouse wheel, the scrollbar, and the ← → keys (after clicking into the table) also scroll.
 */
export function Table({ density = 'comfortable', stickyStart = 0, stickyEnd = 0, className, containerClassName, children, ...props }: TableProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const [scroll, setScroll] = useState({ overflow: false, canStart: false, canEnd: false, startWidth: 0, endWidth: 0 })

  // Column edges from the header row: x = left edge of each column, w = its width.
  const measure = useCallback(() => {
    const cells = Array.from(tableRef.current?.rows[0]?.cells ?? [])
    const w = cells.map(cell => cell.offsetWidth)
    const x = w.map((_, i) => w.slice(0, i).reduce((a, b) => a + b, 0))
    const start = Math.min(stickyStart, cells.length)
    const end = Math.min(stickyEnd, cells.length - start)
    return { w, x, start, end, startWidth: w.slice(0, start).reduce((a, b) => a + b, 0), endWidth: w.slice(cells.length - end).reduce((a, b) => a + b, 0) }
  }, [stickyStart, stickyEnd])

  const update = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { startWidth, endWidth } = measure()
    const next = {
      overflow: el.scrollWidth > el.clientWidth + 1,
      canStart: el.scrollLeft > 1,
      canEnd: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
      startWidth,
      endWidth,
    }
    setScroll(prev => (Object.keys(next) as (keyof typeof next)[]).every(k => prev[k] === next[k]) ? prev : next)
  }, [measure])

  // Fix the first / last columns of every row in place. Runs after each render so new rows are included.
  useLayoutEffect(() => {
    const table = tableRef.current
    if (!table) return
    const { w, x, start, end } = measure()
    const n = w.length
    for (const row of Array.from(table.rows)) {
      Array.from(row.cells).forEach((cell, i) => {
        const side = row.cells.length !== n ? undefined : i < start ? 'start' : i >= n - end ? 'end' : undefined
        if (side) cell.dataset.sticky = side
        else delete cell.dataset.sticky
        cell.style.left = side === 'start' ? `${x[i]}px` : ''
        cell.style.right = side === 'end' ? `${x[n - 1] + w[n - 1] - x[i] - w[i]}px` : ''
        const edge = (side === 'start' && i === start - 1) || (side === 'end' && i === n - end)
        if (edge) cell.dataset.stickyEdge = side
        else delete cell.dataset.stickyEdge
      })
    }
    update()
  })

  useEffect(() => {
    const observer = new ResizeObserver(() => update())
    if (scrollerRef.current) observer.observe(scrollerRef.current)
    if (tableRef.current) observer.observe(tableRef.current)
    return () => observer.disconnect()
  }, [update])

  /** Slide the next hidden column fully into view. */
  const scrollByColumn = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const { w, x, start, end, startWidth, endWidth } = measure()
    const middle = w.map((_, i) => i).slice(start, w.length - end)
    // Columns hidden by 24px or less count as visible, so every click moves a useful amount.
    // With nothing left to reveal, go all the way to the end.
    let left: number
    if (direction === 1) {
      const viewEnd = el.scrollLeft + el.clientWidth - endWidth
      const i = middle.find(i => x[i] + w[i] > viewEnd + 24)
      left = i === undefined ? el.scrollWidth : x[i] + w[i] - (el.clientWidth - endWidth)
    } else {
      const viewStart = el.scrollLeft + startWidth
      const i = middle.findLast(i => x[i] < viewStart - 24)
      left = i === undefined ? 0 : x[i] - startWidth
    }
    el.scrollTo({ left, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <DensityContext.Provider value={density}>
      <div
        data-can-scroll-start={scroll.canStart || undefined}
        data-can-scroll-end={scroll.canEnd || undefined}
        className={cn('group/table relative flex w-full flex-col overflow-hidden rounded-lg border border-border-default bg-surface-base', containerClassName)}
      >
        <div
          ref={scrollerRef}
          onScroll={update}
          // Focusable when it scrolls sideways, so the ← → keys work.
          tabIndex={scroll.overflow ? 0 : undefined}
          role={scroll.overflow ? 'region' : undefined}
          aria-label={scroll.overflow ? (props['aria-label'] ?? 'Table') : undefined}
          className="table-scroller min-h-0 flex-1 overflow-auto outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2"
        >
          <table ref={tableRef} data-density={density} className={cn('w-full border-collapse text-left', className)} {...props}>{children}</table>
        </div>
        {scroll.canStart && (
          <IconButton
            icon="chevron_left"
            label="Show previous column"
            size={32}
            iconSize={20}
            bordered
            tabIndex={-1}
            onClick={() => scrollByColumn(-1)}
            className="pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 rounded-full opacity-0 shadow-md transition-opacity group-hover/table:pointer-events-auto group-hover/table:opacity-100"
            style={{ left: scroll.startWidth + 8 }}
          />
        )}
        {scroll.canEnd && (
          <IconButton
            icon="chevron_right"
            label="Show next column"
            size={32}
            iconSize={20}
            bordered
            tabIndex={-1}
            onClick={() => scrollByColumn(1)}
            className="pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 rounded-full opacity-0 shadow-md transition-opacity group-hover/table:pointer-events-auto group-hover/table:opacity-100"
            style={{ right: scroll.endWidth + 8 }}
          />
        )}
      </div>
    </DensityContext.Provider>
  )
}

/** Figma "Table header": grey band above the rows. It stays visible while the rows scroll. */
export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn('sticky top-0 z-10 bg-surface-muted [&_tr]:border-b [&_tr]:border-border-default [&_tr]:bg-inherit', className)}
      {...props}
    />
  )
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Figma State=Selected. */
  selected?: boolean
}

/** Figma "Table row": Default, Hover, Selected. */
export function TableRow({ selected, className, ...props }: TableRowProps) {
  const density = useDensity()
  return (
    <tr
      data-selected={selected || undefined}
      aria-selected={selected}
      className={cn(
        'border-b border-border-default bg-surface-base transition-colors last:border-b-0 hover:bg-interaction-hover data-selected:bg-interaction-selected',
        density === 'compact' ? 'h-10' : 'h-[56px]',
        className,
      )}
      {...props}
    />
  )
}

export type SortDirection = 'asc' | 'desc' | false

export interface TableHeaderCellProps extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /** Figma Align. Right for numbers and money. */
  align?: 'left' | 'right'
  /** Figma Sort=Sortable. Pass the current direction, or false when sortable but not sorted. Leave undefined if not sortable. */
  sort?: SortDirection
  onSort?: () => void
}

/** Figma "Table header cell". */
export function TableHeaderCell({ align = 'left', sort, onSort, className, children, ...props }: TableHeaderCellProps) {
  const density = useDensity()
  const sortable = sort !== undefined
  const icon = sort === 'asc' ? 'arrow_upward' : sort === 'desc' ? 'arrow_downward' : 'unfold_more'
  const content = (
    <span className={cn('inline-flex items-center gap-[6px] align-middle', align === 'right' && 'flex-row-reverse')}>
      {children}
      {sortable && <Icon name={icon} size={16} className={sort ? 'text-text-secondary' : 'text-text-tertiary'} />}
    </span>
  )
  return (
    <th
      scope="col"
      aria-sort={sort === 'asc' ? 'ascending' : sort === 'desc' ? 'descending' : undefined}
      className={cn(
        'px-4 whitespace-nowrap text-text-secondary',
        density === 'compact' ? 'h-10 text-label-small' : 'h-[56px] text-label-base',
        align === 'right' && 'text-right',
        className,
      )}
      {...props}
    >
      {sortable ? (
        <button type="button" onClick={onSort} className="inline-flex cursor-pointer align-middle rounded-sm hover:text-text-primary outline-border-focus focus-visible:outline-2 focus-visible:outline-offset-2">
          {content}
        </button>
      ) : (
        content
      )}
    </th>
  )
}

export interface TableCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  align?: 'left' | 'right'
}

/** Figma "Table cell". Put any content inside, or use the Cell… helpers below for the Figma types. */
export function TableCell({ align = 'left', className, ...props }: TableCellProps) {
  const density = useDensity()
  return (
    <td
      className={cn('px-4 text-body-small text-text-primary', density === 'compact' && 'whitespace-nowrap', align === 'right' && 'text-right', className)}
      {...props}
    />
  )
}

/**
 * One line of text that ends in "…" when it does not fit the column.
 * Pointing at (or focusing) cut-off text shows the full text in a tooltip.
 */
export function TruncatedText({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const isCut = () => !!ref.current && ref.current.scrollWidth > ref.current.clientWidth
  return (
    <Tooltip label={children} open={open} onOpenChange={next => setOpen(next && isCut())} delayDuration={200} className="max-w-[360px] whitespace-normal">
      <span ref={ref} className={cn('block min-w-0 truncate', className)}>{children}</span>
    </Tooltip>
  )
}

/** Type=Two lines: bold first line, small grey second line. Compact: both on one line. */
export function CellTwoLines({ text, subtext }: { text: ReactNode; subtext: ReactNode }) {
  if (useDensity() === 'compact') {
    return (
      <TruncatedText>
        <span className="text-label-base text-text-primary">{text}</span>
        <span className="ml-2 text-body-xsmall text-text-secondary">{subtext}</span>
      </TruncatedText>
    )
  }
  return (
    <div className="flex min-w-0 flex-col">
      <span className="truncate text-label-base text-text-primary">{text}</span>
      <span className="truncate text-body-xsmall text-text-secondary">{subtext}</span>
    </div>
  )
}

/** Type=Number: medium weight, digits lined up. Use inside a right-aligned TableCell. */
export function CellNumber({ children }: { children: ReactNode }) {
  return <span className="text-label-base whitespace-nowrap text-text-primary tabular-nums">{children}</span>
}

/** Type=Text and badge: text with a badge under it. Compact: badge beside the text. */
export function CellTextBadge({ text, badge }: { text: ReactNode; badge: ReactNode }) {
  if (useDensity() === 'compact') {
    return (
      <div className="flex min-w-0 items-center gap-2">
        <TruncatedText className="text-body-small text-text-primary">{text}</TruncatedText>
        <span className="flex shrink-0">{badge}</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-body-small text-text-primary">{text}</span>
      {badge}
    </div>
  )
}

/** Type=Avatar and text. Pass subtext for a second line, as in the Figma "Table row". Compact uses a 24px avatar. */
export function CellAvatarText({ initials, text, subtext }: { initials: string; text: ReactNode; subtext?: ReactNode }) {
  const compact = useDensity() === 'compact'
  return (
    <div className={cn('flex min-w-0 items-center', compact ? 'gap-2' : 'gap-3')}>
      <Avatar initials={initials} size={compact ? 24 : 32} />
      {subtext ? <CellTwoLines text={text} subtext={subtext} /> : <TruncatedText className="text-body-small text-text-primary">{text}</TruncatedText>}
    </div>
  )
}

/** Type=Actions: a row of small buttons, e.g. bordered IconButtons. */
export function CellActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end gap-2">{children}</div>
}
