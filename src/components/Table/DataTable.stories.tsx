import type { Meta, StoryObj } from '@storybook/react-vite'
import { formatDateIN, formatINR } from '../../lib/format'
import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../DropdownMenu/DropdownMenu'
import { EmptyState } from '../EmptyState/EmptyState'
import { IconButton } from '../IconButton/IconButton'
import { DataTable, type DataTableColumn } from './DataTable'
import { sampleTransactions, type Transaction } from './sampleTransactions'
import {
  CellActions,
  CellAvatarText,
  CellNumber,
  CellTextBadge,
  CellTwoLines,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from './Table'

const statusBadge = {
  completed: <Badge variant="success">Completed</Badge>,
  pending: <Badge variant="warning">Pending</Badge>,
  failed: <Badge variant="error">Failed</Badge>,
}

const columns: DataTableColumn<Transaction>[] = [
  { id: 'transaction', header: 'Transaction', cell: t => <CellAvatarText initials={t.initials} text={t.name} subtext={t.id} />, hideable: false },
  { id: 'status', header: 'Status', width: 130, cell: t => statusBadge[t.status] },
  { id: 'date', header: 'Date', width: 140, cell: t => formatDateIN(t.date), sortValue: t => t.date },
  { id: 'amount', header: 'Amount', width: 150, align: 'right', cell: t => <CellNumber>{formatINR(t.amount, { signed: true })}</CellNumber>, sortValue: t => t.amount },
]

const rowActions = (t: Transaction) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger><IconButton icon="more_vert" label={`Actions for ${t.id}`} size={32} iconSize={20} /></DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem icon="visibility">View details</DropdownMenuItem>
      <DropdownMenuItem icon="download">Download receipt</DropdownMenuItem>
      <DropdownMenuItem icon="flag" destructive>Report an issue</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

const meta = {
  title: 'Components/Data table',
  component: DataTable<Transaction>,
  parameters: { layout: 'padded' },
  args: {
    columns,
    data: sampleTransactions,
    getRowId: (t: Transaction) => t.id,
    selectable: true,
    searchText: (t: Transaction) => `${t.name} ${t.id}`,
    searchPlaceholder: 'Filter transactions…',
    rowActions,
    pageSize: 6,
    itemLabel: 'transactions',
    empty: (
      <EmptyState
        title="No transactions found"
        description="When you send or receive money, your transactions will show up here."
        action={<Button leadingIcon="add">Add money</Button>}
      />
    ),
  },
  decorators: [Story => <div className="w-[1116px]"><Story /></div>],
} satisfies Meta<typeof DataTable<Transaction>>
export default meta
type Story = StoryObj<typeof meta>

/** Figma State=Default. Try: tick rows, sort by Date or Amount, type in the filter, hide a column, change page. */
export const Default: Story = { args: { selectedIds: undefined } }

/** Density=Compact: 40px rows, one line per cell. Long text ends in "…"; point at it for the full text. */
export const Compact: Story = { args: { density: 'compact', pageSize: 10 } }

/**
 * Fixed columns: `<Table stickyStart={2} stickyEnd={2}>` keeps the checkbox + name and the status + actions in place
 * while the middle columns scroll sideways. A shadow shows where columns are hidden.
 * To scroll: the ‹ › buttons, Shift + mouse wheel, the scrollbar, a trackpad swipe, or click in and use ← →.
 */
export const FixedColumns: Story = {
  render: () => (
    <div className="w-[640px]">
      <Table density="compact" stickyStart={2} stickyEnd={2} className="min-w-[1000px] table-fixed" aria-label="Transactions">
        <colgroup>
          <col className="w-12" />
          <col className="w-[180px]" />
          <col className="w-[140px]" />
          <col className="w-[160px]" />
          <col />
          <col className="w-[120px]" />
          <col className="w-[56px]" />
        </colgroup>
        <TableHeader>
          <tr>
            <th className="px-4"><Checkbox aria-label="Select all" /></th>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Reference</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell align="right">Amount</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </TableHeader>
        <TableBody>
          {sampleTransactions.slice(0, 6).map((t, i) => (
            <TableRow key={t.id} selected={i === 1}>
              <TableCell><Checkbox aria-label={`Select ${t.name}`} checked={i === 1} /></TableCell>
              <TableCell><CellAvatarText initials={t.initials} text={t.name} /></TableCell>
              <TableCell className="tabular-nums">{t.id}</TableCell>
              <TableCell>{formatDateIN(t.date)}</TableCell>
              <TableCell align="right"><CellNumber>{formatINR(t.amount, { signed: true })}</CellNumber></TableCell>
              <TableCell>{statusBadge[t.status]}</TableCell>
              <TableCell><CellActions>{rowActions(t)}</CellActions></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}

/** Figma State=Empty. */
export const Empty: Story = { args: { data: [] } }

/** Figma State=Loading. */
export const Loading: Story = { args: { loading: true } }

/** Figma "Table header cell": Align Left / Right × Sort None / Sortable, plus sorted up and down. */
export const HeaderCells: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          <TableHeaderCell>Column</TableHeaderCell>
          <TableHeaderCell sort={false}>Column</TableHeaderCell>
          <TableHeaderCell sort="asc">Sorted up</TableHeaderCell>
          <TableHeaderCell align="right">Column</TableHeaderCell>
          <TableHeaderCell align="right" sort={false}>Column</TableHeaderCell>
          <TableHeaderCell align="right" sort="desc">Sorted down</TableHeaderCell>
        </tr>
      </TableHeader>
    </Table>
  ),
}

/** Figma "Table cell": all eight types. */
export const CellTypes: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          {['Text', 'Two lines', 'Number', 'Badge', 'Checkbox', 'Actions', 'Text and badge', 'Avatar and text'].map(name => (
            <TableHeaderCell key={name} align={name === 'Number' || name === 'Actions' ? 'right' : 'left'}>{name}</TableHeaderCell>
          ))}
        </tr>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Cell text</TableCell>
          <TableCell><CellTwoLines text="Cell text" subtext="Secondary text" /></TableCell>
          <TableCell align="right"><CellNumber>₹12,11,026</CellNumber></TableCell>
          <TableCell><Badge variant="success">Completed</Badge></TableCell>
          <TableCell><Checkbox aria-label="Select" /></TableCell>
          <TableCell align="right">
            <CellActions>
              <IconButton icon="refresh" label="Retry" size={32} bordered />
              <IconButton icon="more_vert" label="More" size={32} bordered />
            </CellActions>
          </TableCell>
          <TableCell><CellTextBadge text="Cell text" badge={<Badge variant="info-outline">Admin</Badge>} /></TableCell>
          <TableCell><CellAvatarText initials="AB" text="Cell text" /></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

/** Figma "Table row": Default, Hover, Selected. */
export const RowStates: Story = {
  render: () => (
    <Table>
      <TableBody>
        {[{ name: 'Default' }, { name: 'Hover', force: 'hover' }, { name: 'Selected', selected: true }].map(state => (
          <TableRow key={state.name} selected={state.selected} data-force-state={state.force}>
            <TableCell className="w-[56px]"><Checkbox aria-label="Select" checked={!!state.selected} /></TableCell>
            <TableCell><CellAvatarText initials="AR" text="Anita Rao" subtext="TXN-48213" /></TableCell>
            <TableCell className="w-[130px]"><Badge variant="success">Completed</Badge></TableCell>
            <TableCell className="w-[140px]">3 Nov 2026</TableCell>
            <TableCell align="right" className="w-[150px]"><CellNumber>−₹12,500.00</CellNumber></TableCell>
            <TableCell className="w-[56px] text-label-small text-text-tertiary">{state.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
