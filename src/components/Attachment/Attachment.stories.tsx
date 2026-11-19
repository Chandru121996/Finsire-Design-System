import type { Meta, StoryObj } from '@storybook/react-vite'
import { Attachment } from './Attachment'

const meta = {
  title: 'Components/Attachment',
  component: Attachment,
  args: { fileName: 'Statement-Oct-2026.pdf', meta: 'PDF · 2.4 MB', status: 'default', progress: 60 },
  argTypes: {
    status: { control: 'inline-radio', options: ['default', 'uploading', 'error'] },
    progress: { control: { type: 'range', min: 0, max: 100 } },
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>],
} satisfies Meta<typeof Attachment>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Figma State: Default, Hover, Uploading, Error. */
export const AllStates: Story = {
  decorators: [],
  render: args => (
    <div className="grid grid-cols-[repeat(2,360px)] gap-8">
      <Attachment {...args} />
      <div data-force-state="hover"><Attachment {...args} /></div>
      <Attachment {...args} status="uploading" />
      <Attachment {...args} status="error" />
    </div>
  ),
}
