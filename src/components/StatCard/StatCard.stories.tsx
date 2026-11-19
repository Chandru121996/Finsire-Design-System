import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCard } from './StatCard'

const meta = {
  title: 'Components/Stat card',
  component: StatCard,
  args: { label: 'Total balance', value: '₹ 48,250.00', change: { value: '+12.5%', trend: 'up' } },
  decorators: [Story => <div className="w-[280px]"><Story /></div>],
} satisfies Meta<typeof StatCard>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Examples: Story = {
  decorators: [],
  render: () => (
    <div className="grid grid-cols-[repeat(3,280px)] gap-6">
      <StatCard label="Total balance" value="₹ 48,250.00" change={{ value: '+12.5%', trend: 'up' }} />
      <StatCard label="Overdue EMIs" value="₹ 3.4 L" icon="warning" change={{ value: '-4.1%', trend: 'down' }} />
      <StatCard label="Active loans" value="1,284" icon="description" change={{ value: '0%', trend: 'neutral' }} />
    </div>
  ),
}
