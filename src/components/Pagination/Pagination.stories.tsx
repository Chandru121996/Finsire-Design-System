import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageEllipsis, PageNumber, Pagination } from './Pagination'
import { PaginationBar } from './PaginationBar'

const meta = { title: 'Components/Pagination', component: Pagination } satisfies Meta<typeof Pagination>
export default meta
type Story = StoryObj<typeof meta>

function PaginationDemo() {
  const [page, setPage] = useState(2)
  return <Pagination page={page} pageCount={10} onPageChange={setPage} />
}

function PaginationBarDemo() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(15)
  return (
    <div className="w-[1116px]">
      <PaginationBar page={page} pageSize={pageSize} total={750} onPageChange={setPage} onPageSizeChange={size => { setPageSize(size); setPage(1) }} />
    </div>
  )
}

/** Figma "Pagination". Click the pages. */
export const Default: Story = { args: { page: 2, pageCount: 10, onPageChange: () => {} }, render: () => <PaginationDemo /> }

/** Figma "Pagination bar", used under data tables. */
export const Bar: Story = { args: { page: 1, pageCount: 50, onPageChange: () => {} }, render: () => <PaginationBarDemo /> }

/** Figma "Page item": Number (Default, Hover, Active, Disabled), Previous / Next, Ellipsis. */
export const PageItems: Story = {
  args: { page: 1, pageCount: 1, onPageChange: () => {} },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <PageNumber page={1} />
        <span data-force-state="hover"><PageNumber page={1} /></span>
        <PageNumber page={1} active />
        <PageEllipsis />
      </div>
      <Pagination page={1} pageCount={1} onPageChange={() => {}} />
    </div>
  ),
}
