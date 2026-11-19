import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './Spinner'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: { size: 24 },
  argTypes: { size: { control: 'inline-radio', options: [16, 20, 24, 32] } },
} satisfies Meta<typeof Spinner>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      {([16, 20, 24, 32] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <span className="text-label-small text-text-tertiary">{size}</span>
        </div>
      ))}
    </div>
  ),
}
