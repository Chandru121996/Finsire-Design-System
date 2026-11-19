import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'account_balance', size: 24, iconStyle: 'outlined' },
  argTypes: {
    size: { control: 'inline-radio', options: [16, 20, 24, 32] },
    iconStyle: { control: 'inline-radio', options: ['outlined', 'filled'] },
  },
} satisfies Meta<typeof Icon>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: args => (
    <div className="flex flex-col gap-4 text-text-primary">
      {(['outlined', 'filled'] as const).map(iconStyle => (
        <div key={iconStyle} className="flex items-center gap-6">
          <span className="w-[80px] text-label-small text-text-tertiary capitalize">{iconStyle}</span>
          {([16, 20, 24, 32] as const).map(size => (
            <Icon key={size} {...args} iconStyle={iconStyle} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
}
