import { useMemo, useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../DropdownMenu/DropdownMenu'
import { Pagination } from '../Pagination/Pagination'
import { SearchInput } from '../SearchInput/SearchInput'
import { Skeleton } from '../Skeleton/Skeleton'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from './Table'

export interface DataTableColumn<Row> {
  id: string
  /** Column title. Also used in the Columns menu. */
  header: string
  /** What to show in each cell. */
  cell: (row: Row) => ReactNode
  /** Right for numbers and money. */
  align?: 'left' | 'right'
  /** Fixed column width in px. Leave out to let the column take the remaining space. */
  width?: number
  /** Makes the column sortable. Return the value to sort by. */
  sortValue?: (row: Row) => string | number | Date
  /** Can be hidden from the Columns menu. Default true. */
  hideable?: boolean
}

export interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[]
  data: Row[]
  /** Unique id of each row, e.g. row => row.id. */
  getRowId: (row: Row) => string
  /** Adds a checkbox to every row. */
  selectable?: boolean
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
  /** Text searched by the filter box. Leave out to hide the filter box. */
  searchText?: (row: Row) => string
  searchPlaceholder?: string
  /** Extra controls on the right of the toolbar, before the Columns menu. */
  toolbar?: ReactNode
  /** Menu or buttons at the end of each row. */
  rowActions?: (row: Row) => ReactNode
  onRowClick?: (row: Row) => void
  /** Figma State=Loading. */
  loading?: boolean
  /** Shown when there are no rows (Figma State=Empty), usually an EmptyState. */
  empty?: ReactNode
  /** Rows per page. Default 10. */
  pageSize?: number
  /** Word for the footer when nothing is selected, e.g. "transactions". */
  itemLabel?: string
  className?: string
}

/** Figma "Data table": toolbar, sortable and selectable table, footer with pagination. Works on the data you pass in. */
export function DataTable<Row>({
  columns,
  data,
  getRowId,
  selectable = false,
  selectedIds,
  onSelectionChange,
  searchText,
  searchPlaceholder = 'Filter…',
  toolbar,
  rowActions,
  onRowClick,
  loading = false,
  empty,
  pageSize = 10,
  itemLabel = 'results',
  className,
}: DataTableProps<Row>) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<{ id: string; dir: 'asc' | 'desc' } | null>(null)
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const [innerSelected, setInnerSelected] = useState<string[]>([])
  const selected = new Set(selectedIds ?? innerSelected)
  const setSelected = (ids: string[]) => {
    setInnerSelected(ids)
    onSelectionChange?.(ids)
  }

  const visibleColumns = columns.filter(c => !hidden.has(c.id))

  const rows = useMemo(() => {
    let result = data
    const q = query.trim().toLowerCase()
    if (q && searchText) result = result.filter(row => searchText(row).toLowerCase().includes(q))
    const value = sort ? columns.find(c => c.id === sort.id)?.sortValue : undefined
    if (sort && value) {
      const direction = sort.dir === 'asc' ? 1 : -1
      result = [...result].sort((a, b) => {
        const x = value(a)
        const y = value(b)
        return (x < y ? -1 : x > y ? 1 : 0) * direction
      })
    }
    return result
  }, [data, query, searchText, sort, columns])

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const pageIds = pageRows.map(getRowId)
  const selectedOnPage = pageIds.filter(id => selected.has(id)).length
  const allChecked = pageIds.length > 0 && selectedOnPage === pageIds.length
  const toggleAll = () => {
    const next = new Set(selected)
    pageIds.forEach(id => (allChecked ? next.delete(id) : next.add(id)))
    setSelected([...next])
  }
  const toggleRow = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected([...next])
  }
  const cycleSort = (id: string) =>
    setSort(prev => (prev?.id !== id ? { id, dir: 'asc' } : prev.dir === 'asc' ? { id, dir: 'desc' } : null))

  const columnCount = visibleColumns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)
  const footerText = loading
    ? 'Loading…'
    : selectable && selected.size > 0
      ? `${selected.size} of ${rows.length} row(s) selected.`
      : `${rows.length.toLocaleString('en-IN')} ${itemLabel}`

  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <div className="flex items-center gap-2">
        {searchText && (
          <SearchInput
            placeholder={searchPlaceholder}
            shortcut={null}
            value={query}
            onValueChange={value => {
              setQuery(value)
              setPage(1)
            }}
            className="w-[280px]"
          />
        )}
        <span className="flex-1" />
        {toolbar}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Button variant="outline" size="small" trailingIcon="expand_more">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[200px]">
            <DropdownMenuLabel>Show columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.filter(c => c.hideable !== false).map(column => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={!hidden.has(column.id)}
                onSelect={event => event.preventDefault()}
                onCheckedChange={checked =>
                  setHidden(prev => {
                    const next = new Set(prev)
                    if (checked) next.delete(column.id)
                    else next.add(column.id)
                    return next
                  })
                }
              >
                {column.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table aria-busy={loading}>
        <colgroup>
          {selectable && <col className="w-[56px]" />}
          {visibleColumns.map(column => <col key={column.id} style={column.width ? { width: column.width } : undefined} />)}
          {rowActions && <col className="w-[56px]" />}
        </colgroup>
        <TableHeader>
          <tr>
            {selectable && (
              <th className="w-[56px] px-4">
                <Checkbox
                  aria-label="Select all rows on this page"
                  checked={allChecked ? true : selectedOnPage > 0 ? 'indeterminate' : false}
                  onCheckedChange={toggleAll}
                  disabled={loading || pageRows.length === 0}
                />
              </th>
            )}
            {visibleColumns.map(column => (
              <TableHeaderCell
                key={column.id}
                align={column.align}
                sort={column.sortValue ? (sort?.id === column.id ? sort.dir : false) : undefined}
                onSort={() => cycleSort(column.id)}
              >
                {column.header}
              </TableHeaderCell>
            ))}
            {rowActions && <th className="w-[56px]"><span className="sr-only">Actions</span></th>}
          </tr>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }, (_, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                {selectable && <TableCell><Skeleton variant="circle" className="size-5 rounded-sm" /></TableCell>}
                {visibleColumns.map((column, i) => (
                  <TableCell key={column.id} align={column.align}>
                    {i === 0 ? (
                      <div className="flex items-center gap-3"><Skeleton variant="circle" className="size-8" /><Skeleton className="w-[160px]" /></div>
                    ) : (
                      <Skeleton className={cn('w-[72px]', column.align === 'right' && 'ml-auto')} />
                    )}
                  </TableCell>
                ))}
                {rowActions && <TableCell />}
              </TableRow>
            ))
          ) : pageRows.length === 0 ? (
            <tr>
              <td colSpan={columnCount} className="py-6">{empty ?? <p className="py-8 text-center text-body-small text-text-secondary">No results.</p>}</td>
            </tr>
          ) : (
            pageRows.map(row => {
              const id = getRowId(row)
              const isSelected = selected.has(id)
              return (
                <TableRow
                  key={id}
                  selected={isSelected}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={onRowClick ? 'cursor-pointer' : undefined}
                >
                  {selectable && (
                    <TableCell onClick={event => event.stopPropagation()}>
                      <Checkbox aria-label={`Select row ${id}`} checked={isSelected} onCheckedChange={() => toggleRow(id)} />
                    </TableCell>
                  )}
                  {visibleColumns.map(column => (
                    <TableCell key={column.id} align={column.align}>{column.cell(row)}</TableCell>
                  ))}
                  {rowActions && (
                    <TableCell align="right" onClick={event => event.stopPropagation()}>{rowActions(row)}</TableCell>
                  )}
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between gap-4">
        <p className="text-body-small text-text-secondary tabular-nums">{footerText}</p>
        {pageCount > 1 && <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />}
      </div>
    </div>
  )
}
