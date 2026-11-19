import { useState } from 'react'
import { AppShell, PageHeader } from '../components/AppShell/AppShell'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { FilterChip } from '../components/FilterChip/FilterChip'
import { IconButton } from '../components/IconButton/IconButton'
import { PaginationBar } from '../components/Pagination/PaginationBar'
import { CellActions, CellTextBadge, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '../components/Table/Table'
import { shellProps } from './shell'

interface LogEntry {
  id: number
  user: string
  distributor: string
  phone: string
  event: string
  date: string
  time: string
  admin: string
  role: 'admin' | 'rm'
}

const users = ['Anaya Ram', 'Karthik S', 'Divya Sharma', 'Rohit Patil', 'Meera Nair', 'Sandeep K', 'Priya Iyer', 'Arjun Mehta', 'Neha Gupta', 'Vikram Rao', 'Sneha Reddy', 'Imran Shaikh', 'Kavya Menon', 'Rahul Verma', 'Pooja Desai']
const distributors = ['Finsire Capital', 'Wealth Hub', 'Axis Partners', 'Nexa Finserv', 'Wealth Hub']
const events = [
  'Pledged 150 units of HDFC Bank shares for overdraft',
  'Overdraft limit of ₹2,50,000 approved by RM',
  'KYC documents verified, account activated',
  'Loan repayment of ₹12,500 received',
  'Invoked collateral of 80 units due to LTV breach',
  'Digisign agreement created for credit card',
]
const admins = ['Ravi Kumar', 'Sunita Rao', 'Amit Shah', 'Deepa Menon', 'Nikhil Jain']

/** The 15 rows of the Figma Master Log. */
const entries: LogEntry[] = users.map((user, i) => {
  const day = 12 - (i % 9)
  const hour = 10 + (i % 6)
  return {
    id: i + 1,
    user,
    distributor: distributors[i % distributors.length],
    phone: `+91 ${98765 + i * 10}\u00a0${43210 + i * 7}`,
    event: events[i % events.length],
    date: `${day} Nov 2026,`,
    time: `${String(hour).padStart(2, '0')}:${String(10 + i * 3).padStart(2, '0')} AM`,
    admin: admins[i % admins.length],
    role: [2, 5, 8, 11].includes(i) ? 'rm' : 'admin',
  }
})

const filters = ['Users', 'Distributor', 'Phone Number', 'Event/Description', 'Timestamp', 'Admin/RM', 'Status']

/** Figma "Master Log" reference screen. */
export function MasterLog() {
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(15)
  const allChecked = selected.size === entries.length
  const toggle = (id: number) =>
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <AppShell {...shellProps('master-log', { label: 'Master Log', icon: 'list_alt' })} className="flex flex-col gap-5">
      <PageHeader
        title="Master Log"
        description="List of User"
        actions={
          <>
            <IconButton icon="search" label="Search the log" bordered />
            <IconButton icon="view_column" label="Choose columns" bordered />
            <Button leadingIcon="download">Download</Button>
          </>
        }
      />
      <div className="flex flex-wrap gap-2">
        <FilterChip variant="all-filters" />
        {filters.map(label => <FilterChip key={label}>{label}</FilterChip>)}
      </div>
      <Table containerClassName="min-h-0 flex-1" className="table-fixed">
        <colgroup>
          <col className="w-[56px]" />
          <col className="w-[150px]" />
          <col className="w-[150px]" />
          <col className="w-[160px]" />
          <col className="w-[248px]" />
          <col className="w-[150px]" />
          <col className="w-[180px]" />
          <col className="w-[120px]" />
          <col className="w-[104px]" />
        </colgroup>
        <TableHeader>
          <tr>
            <th className="px-4">
              <Checkbox
                aria-label="Select all"
                checked={allChecked ? true : selected.size > 0 ? 'indeterminate' : false}
                onCheckedChange={() => setSelected(allChecked ? new Set() : new Set(entries.map(e => e.id)))}
              />
            </th>
            {['Users', 'Distributor', 'Phone Number', 'Event/Description', 'Time Stamp', 'Admin/RM Name', 'Status'].map(h => (
              <TableHeaderCell key={h}>{h}</TableHeaderCell>
            ))}
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </TableHeader>
        <TableBody>
          {entries.map((e, i) => (
            <TableRow key={e.id} selected={selected.has(e.id)}>
              <TableCell><Checkbox aria-label={`Select ${e.user}`} checked={selected.has(e.id)} onCheckedChange={() => toggle(e.id)} /></TableCell>
              <TableCell className="truncate">{e.user}</TableCell>
              <TableCell className="truncate">{e.distributor}</TableCell>
              <TableCell className="whitespace-nowrap tabular-nums">{e.phone}</TableCell>
              <TableCell className="py-2"><span className="line-clamp-2">{e.event}</span></TableCell>
              <TableCell className="py-2 tabular-nums">{e.date}<br />{e.time}</TableCell>
              <TableCell>
                <CellTextBadge
                  text={e.admin}
                  badge={e.role === 'admin' ? <Badge variant="info-outline">Admin</Badge> : <Badge variant="accent-outline">Relationship manager</Badge>}
                />
              </TableCell>
              <TableCell><Badge variant="success">Completed</Badge></TableCell>
              <TableCell>
                <CellActions>
                  {i === 0 && <IconButton icon="refresh" label="Retry" size={32} bordered />}
                  <IconButton icon="more_vert" label={`More actions for ${e.user}`} size={32} bordered />
                </CellActions>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar
        className="shrink-0"
        page={page}
        pageSize={pageSize}
        total={150}
        onPageChange={setPage}
        onPageSizeChange={size => { setPageSize(size); setPage(1) }}
      />
    </AppShell>
  )
}
