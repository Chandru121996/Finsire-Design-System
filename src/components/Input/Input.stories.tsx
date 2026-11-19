import type { Meta, StoryObj } from '@storybook/react-vite'
import { FieldStates } from '../../storybook/FieldStates'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Loan amount', placeholder: 'Enter amount', helperText: 'Helper text', status: 'default', disabled: false },
  argTypes: { status: { control: 'inline-radio', options: ['default', 'error', 'success'] } },
  decorators: [Story => <div className="w-[320px]"><Story /></div>],
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithIcons: Story = {
  args: { label: 'Password', type: 'password', placeholder: 'Enter password', leadingIcon: 'lock', trailingIcon: 'visibility' },
}

export const AllStates: Story = {
  decorators: [],
  render: () => (
    <FieldStates
      render={({ filled, ...props }) => (
        <Input label="Label" placeholder="Enter amount" defaultValue={filled ? '₹ 12,11,026' : undefined} {...props} />
      )}
    />
  ),
}
