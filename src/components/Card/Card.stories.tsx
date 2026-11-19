import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Card title',
    description: 'A short description of what this card is about.',
    children: 'Content area. Place any content here, such as a form, a list or a chart.',
    footer: (<><Button>Save</Button><Button variant="outline">Cancel</Button></>),
    elevated: false,
  },
  decorators: [Story => <div className="w-[380px]"><Story /></div>],
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Figma Style=Default and Style=Elevated. */
export const AllVariants: Story = {
  decorators: [],
  render: args => (
    <div className="grid grid-cols-[repeat(2,380px)] gap-12 p-2">
      <Card {...args} />
      <Card {...args} elevated />
    </div>
  ),
}
