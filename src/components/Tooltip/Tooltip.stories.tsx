import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { IconButton } from '../IconButton/IconButton'
import { Tooltip } from './Tooltip'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  args: { label: 'Copy account number', placement: 'top', children: null },
  argTypes: { placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] } },
} satisfies Meta<typeof Tooltip>
export default meta
type Story = StoryObj<typeof meta>

/** Hover or tab to the button to see the tooltip. */
export const Playground: Story = {
  render: args => (
    <Tooltip {...args}>
      <IconButton icon="content_copy" label="Copy account number" bordered />
    </Tooltip>
  ),
}

export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-x-[240px] gap-y-16 p-16">
      {(['top', 'bottom', 'left', 'right'] as const).map(placement => (
        <div key={placement} className="flex justify-center">
          <Tooltip label="Copy account number" placement={placement} open>
            <Button variant="outline" size="small" className="capitalize">{placement}</Button>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
}
