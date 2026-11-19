import type { Meta, StoryObj } from '@storybook/react-vite'
import { FieldStates } from '../../storybook/FieldStates'
import { Textarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: { label: 'Remarks', placeholder: 'Write a note', helperText: 'Visible to the credit team', status: 'default', disabled: false },
  argTypes: { status: { control: 'inline-radio', options: ['default', 'error', 'success'] } },
  decorators: [Story => <div className="w-[320px]"><Story /></div>],
} satisfies Meta<typeof Textarea>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllStates: Story = {
  decorators: [],
  render: () => (
    <FieldStates
      render={({ filled, ...props }) => (
        <Textarea label="Label" placeholder="Write a note" defaultValue={filled ? 'Collateral verified on site.' : undefined} {...props} />
      )}
    />
  ),
}
