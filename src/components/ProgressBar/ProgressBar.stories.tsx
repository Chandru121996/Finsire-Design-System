import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Components/Progress bar',
  component: ProgressBar,
  args: { value: 50, label: 'Uploading statement', status: 'default' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    status: { control: 'inline-radio', options: ['default', 'success', 'error'] },
  },
  decorators: [Story => <div className="w-[320px]"><Story /></div>],
} satisfies Meta<typeof ProgressBar>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  decorators: [],
  render: () => (
    <div className="grid grid-cols-[repeat(3,320px)] gap-x-8 gap-y-6">
      {[0, 25, 50, 75, 100].flatMap(value =>
        (['default', 'success', 'error'] as const).map(status => (
          <ProgressBar key={`${value}${status}`} value={value} status={status} label="Uploading statement" />
        )),
      )}
    </div>
  ),
}
