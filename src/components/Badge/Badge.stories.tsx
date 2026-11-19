import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const variants = ['default', 'secondary', 'success', 'warning', 'error', 'info', 'outline', 'accent', 'info-outline', 'accent-outline'] as const

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Badge', variant: 'default' },
  argTypes: { variant: { control: 'select', options: variants } },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {variants.map(variant => (
        <div key={variant} className="flex flex-col items-start gap-2">
          <Badge variant={variant}>Badge</Badge>
          <span className="text-body-xsmall text-text-tertiary">{variant}</span>
        </div>
      ))}
    </div>
  ),
}

export const LoanStatuses: Story = {
  render: () => (
    <div className="flex gap-3">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Caution</Badge>
      <Badge variant="error">Critical</Badge>
      <Badge variant="secondary">Closed</Badge>
    </div>
  ),
}
