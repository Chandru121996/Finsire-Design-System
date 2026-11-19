import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

/** Page numbers to show, with "…" gaps. Always 7 slots when there are enough pages, e.g. 1 2 3 4 5 … 50. */
export function pageRange(page: number, pageCount: number, siblings = 1): (number | 'ellipsis')[] {
  const slots = siblings * 2 + 5
  if (pageCount <= slots) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const left = Math.max(page - siblings, 2)
  const right = Math.min(page + siblings, pageCount - 1)
  const showLeftGap = left > 3
  const showRightGap = right < pageCount - 2
  const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i)
  if (!showLeftGap) return [...range(1, slots - 2), 'ellipsis', pageCount]
  if (!showRightGap) return [1, 'ellipsis', ...range(pageCount - slots + 3, pageCount)]
  return [1, 'ellipsis', ...range(left, right), 'ellipsis', pageCount]
}

const itemBase =
  'flex shrink-0 cursor-pointer items-center justify-center rounded-md text-label-base text-text-primary transition-colors hover:bg-interaction-hover outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2 disabled:pointer-events-none disabled:text-disabled-foreground'

/** Figma "Page item" (Number). Active is the current page. */
export function PageNumber({ page, active, onSelect }: { page: number; active?: boolean; onSelect?: (page: number) => void }) {
  return (
    <button
      type="button"
      aria-label={`Page ${page}`}
      aria-current={active ? 'page' : undefined}
      onClick={() => onSelect?.(page)}
      className={cn(itemBase, 'size-[36px] tabular-nums', active && 'border border-border-strong bg-surface-base shadow-xs hover:bg-surface-base')}
    >
      {page}
    </button>
  )
}

export function PageEllipsis() {
  return (
    <span aria-hidden className="flex size-[36px] shrink-0 items-center justify-center text-text-secondary">
      <Icon name="more_horiz" size={16} />
    </span>
  )
}

export interface PaginationProps {
  /** Current page, starting at 1. */
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  className?: string
}

/** Figma "Pagination": Previous, page numbers and Next. */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className={cn(itemBase, 'gap-1 px-3 py-2')}>
        <Icon name="chevron_left" size={16} />
        Previous
      </button>
      {pageRange(page, pageCount).map((item, index) =>
        item === 'ellipsis' ? (
          <PageEllipsis key={`gap${index}`} />
        ) : (
          <PageNumber key={item} page={item} active={item === page} onSelect={onPageChange} />
        ),
      )}
      <button type="button" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} className={cn(itemBase, 'gap-1 px-3 py-2')}>
        Next
        <Icon name="chevron_right" size={16} />
      </button>
    </nav>
  )
}
