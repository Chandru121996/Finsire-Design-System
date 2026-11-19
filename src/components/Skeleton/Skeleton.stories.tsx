import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta = { title: 'Components/Skeleton', component: Skeleton } satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <Skeleton variant="text" className="w-[200px]" />
      <Skeleton variant="circle" />
      <Skeleton variant="rectangle" className="w-[200px]" />
    </div>
  ),
}

export const CardLoading: Story = {
  render: () => (
    <div className="flex w-[320px] items-center gap-3 rounded-lg border border-border-default bg-surface-base p-4">
      <Skeleton variant="circle" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="w-3/4" />
        <Skeleton className="w-1/2" />
      </div>
    </div>
  ),
}
