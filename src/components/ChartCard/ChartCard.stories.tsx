import type { Meta, StoryObj } from '@storybook/react-vite'
import { LegendItem } from '../LegendItem/LegendItem'
import { ChartCard } from './ChartCard'

const meta = {
  title: 'Components/Chart card',
  component: ChartCard,
  args: {
    title: 'Chart title',
    action: { label: 'View as table', onClick: () => {} },
    legend: [{ label: 'Securities', series: 3 }, { label: 'Users', series: 1 }],
    children: (
      <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed border-border-strong text-body-small text-text-tertiary">
        The real chart goes here (Charts batch)
      </div>
    ),
  },
  decorators: [Story => <div className="w-[552px]"><Story /></div>],
} satisfies Meta<typeof ChartCard>
export default meta
type Story = StoryObj<typeof meta>

export const Frame: Story = {}

/** Figma "Legend item", Series 1 to 6 (chart/series-N tokens). */
export const LegendItems: Story = {
  decorators: [],
  render: () => (
    <div className="flex flex-wrap gap-4">
      {([1, 2, 3, 4, 5, 6] as const).map(series => <LegendItem key={series} series={series} label={`Series ${series}`} />)}
    </div>
  ),
}
