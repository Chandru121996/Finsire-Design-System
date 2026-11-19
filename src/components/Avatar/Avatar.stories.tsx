import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const sizes = [24, 32, 40, 56] as const
const tones = ['primary', 'success', 'warning', 'error', 'info', 'accent'] as const

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { initials: 'AB', size: 40, tone: 'primary' },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
    tone: { control: 'select', options: tones },
  },
} satisfies Meta<typeof Avatar>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <span className="w-[120px] text-label-small text-text-tertiary">Icon · primary</span>
        {sizes.map(size => <Avatar key={size} size={size} />)}
      </div>
      {tones.map(tone => (
        <div key={tone} className="flex items-center gap-6">
          <span className="w-[120px] text-label-small text-text-tertiary capitalize">Initials · {tone}</span>
          {sizes.map(size => <Avatar key={size} initials="AB" size={size} tone={tone} />)}
        </div>
      ))}
    </div>
  ),
}
