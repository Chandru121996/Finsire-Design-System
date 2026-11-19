import type { Meta, StoryObj } from '@storybook/react-vite'
import { KpiCard } from './KpiCard'

const meta = {
  title: 'Components/KPI card',
  component: KpiCard,
  args: { value: '₹224 Cr', target: 'Target: ≥ 20% MoM', title: 'Total Pledged Amount', status: 'excellent', info: 'Sum of all securities pledged as collateral this month.' },
  argTypes: { status: { control: 'inline-radio', options: ['excellent', 'caution', 'critical', 'none'] } },
  decorators: [Story => <div className="w-[210px]"><Story /></div>],
} satisfies Meta<typeof KpiCard>
export default meta
type Story = StoryObj<typeof meta>

/** Hover the ⓘ icon to see the explanation. */
export const Playground: Story = {}

/** Figma Status: Excellent, Caution, Critical, None. */
export const AllVariants: Story = {
  decorators: [],
  render: args => (
    <div className="grid grid-cols-[repeat(4,210px)] gap-6">
      {(['excellent', 'caution', 'critical', 'none'] as const).map(status => <KpiCard key={status} {...args} status={status} />)}
    </div>
  ),
}
