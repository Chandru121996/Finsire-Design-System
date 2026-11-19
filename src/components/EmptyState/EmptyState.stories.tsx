import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'Components/Empty state',
  component: EmptyState,
  args: {
    title: 'No transactions yet',
    description: 'When you send or receive money, your transactions will show up here.',
    action: <Button leadingIcon="add">Add money</Button>,
    bordered: false,
  },
  decorators: [Story => <div className="w-[440px]"><Story /></div>],
} satisfies Meta<typeof EmptyState>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  decorators: [],
  render: args => (
    <div className="grid grid-cols-[repeat(2,440px)] gap-12">
      <EmptyState {...args} />
      <EmptyState {...args} bordered />
    </div>
  ),
}

export const NoResults: Story = {
  args: { icon: 'search_off', title: 'No loans match your filters', description: 'Try removing a filter or searching for a different borrower.', action: <Button variant="outline">Clear filters</Button> },
}
