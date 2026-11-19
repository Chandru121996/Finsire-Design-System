import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Avatar } from '../Avatar/Avatar'
import { Icon } from '../Icon/Icon'

// Building blocks matching the Figma "Data Table" page. DataTable puts them together for you.

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Class for the bordered frame around the table, e.g. a max height so the rows scroll. */
  containerClassName?: string
}

/** Bordered table frame. Scrolls sideways (and down, if you limit its height) when the content is bigger. */
export function Table({ className, containerClassName, children, ...props }: TableProps) {
  return (
    <div className={cn('w-full overflow-auto rounded-lg border border-border-default bg-surface-base', containerClassName)}>
      <table className={cn('w-full border-collapse text-left', className)} {...props}>{children}</table>
    </div>
  )
}

/** Figma "Table header": grey band above the rows. It stays visible while the rows scroll. */
export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn('sticky top-0 z-10 bg-surface-muted [&_tr]:border-b [&_tr]:border-border-default', className)}
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
  return (
    <tr
      data-selected={selected || undefined}
      aria-selected={selected}
      className={cn(
        'h-[56px] border-b border-border-default transition-colors last:border-b-0 hover:bg-interaction-hover data-selected:bg-interaction-selected',
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
      className={cn('h-[56px] px-4 text-label-base whitespace-nowrap text-text-secondary', align === 'right' && 'text-right', className)}
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
  return <td className={cn('px-4 text-body-small text-text-primary', align === 'right' && 'text-right', className)} {...props} />
}

/** Type=Two lines: bold first line, small grey second line. */
export function CellTwoLines({ text, subtext }: { text: ReactNode; subtext: ReactNode }) {
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

/** Type=Text and badge: text with a badge under it. */
export function CellTextBadge({ text, badge }: { text: ReactNode; badge: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-body-small text-text-primary">{text}</span>
      {badge}
    </div>
  )
}

/** Type=Avatar and text. Pass subtext for a second line, as in the Figma "Table row". */
export function CellAvatarText({ initials, text, subtext }: { initials: string; text: ReactNode; subtext?: ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar initials={initials} size={32} />
      {subtext ? <CellTwoLines text={text} subtext={subtext} /> : <span className="truncate text-body-small text-text-primary">{text}</span>}
    </div>
  )
}

/** Type=Actions: a row of small buttons, e.g. bordered IconButtons. */
export function CellActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end gap-2">{children}</div>
}
