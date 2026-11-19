import { Select as RadixSelect } from 'radix-ui'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'
import { PageEllipsis, PageNumber, pageRange } from './Pagination'

const formatCount = (n: number) => n.toLocaleString('en-IN')

export interface PaginationBarProps {
  /** Current page, starting at 1. */
  page: number
  pageSize: number
  /** Total number of rows. */
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: number[]
  /** Word used in the summary, e.g. "1–15 of 150 items". */
  itemLabel?: string
  className?: string
}

/** Figma "Pagination bar": summary on the left, pager in the middle, items per page on the right. Sits under a Data table. */
export function PaginationBar({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 15, 25, 50, 100],
  itemLabel = 'items',
  className,
}: PaginationBarProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  return (
    <div className={cn('flex items-center gap-4 px-4 py-2', className)}>
      <p className="min-w-0 flex-1 truncate text-body-small text-text-secondary tabular-nums">
        {formatCount(from)}–{formatCount(to)} of {formatCount(total)} {itemLabel}
      </p>
      <nav aria-label="Pagination" className="flex shrink-0 items-center gap-1 rounded-lg border border-border-default bg-surface-base p-1 shadow-xs">
        <IconButton icon="first_page" label="First page" size={32} disabled={page <= 1} onClick={() => onPageChange(1)} />
        <IconButton icon="chevron_left" label="Previous page" size={32} disabled={page <= 1} onClick={() => onPageChange(page - 1)} />
        {pageRange(page, pageCount).map((item, index) =>
          item === 'ellipsis' ? (
            <PageEllipsis key={`gap${index}`} />
          ) : (
            <PageNumber key={item} page={item} active={item === page} onSelect={onPageChange} />
          ),
        )}
        <IconButton icon="chevron_right" label="Next page" size={32} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} />
        <IconButton icon="last_page" label="Last page" size={32} disabled={page >= pageCount} onClick={() => onPageChange(pageCount)} />
      </nav>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
        <span className="text-body-small whitespace-nowrap text-text-secondary">Items per page:</span>
        <RadixSelect.Root value={String(pageSize)} onValueChange={value => onPageSizeChange?.(Number(value))}>
          <RadixSelect.Trigger
            aria-label="Items per page"
            className="group flex cursor-pointer items-center gap-2 rounded-md border border-border-default bg-surface-base py-2 pr-2 pl-3 text-label-base text-text-primary hover:border-border-strong outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2"
          >
            <RadixSelect.Value />
            <Icon name="expand_more" size={16} className="text-text-secondary transition-transform group-data-[state=open]:rotate-180" />
          </RadixSelect.Trigger>
          <RadixSelect.Portal>
            <RadixSelect.Content position="popper" sideOffset={4} className="z-50 min-w-[var(--radix-select-trigger-width)] rounded-md border border-border-default bg-surface-overlay p-1 shadow-md">
              <RadixSelect.Viewport>
                {pageSizeOptions.map(option => (
                  <RadixSelect.Item
                    key={option}
                    value={String(option)}
                    className="flex h-8 cursor-pointer items-center rounded-sm px-3 text-body-small text-text-primary outline-none data-[highlighted]:bg-interaction-hover data-[state=checked]:bg-interaction-selected"
                  >
                    <RadixSelect.ItemText>{option}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>
    </div>
  )
}
