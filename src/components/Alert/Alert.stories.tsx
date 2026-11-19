import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'

const variants = ['default', 'info', 'success', 'warning', 'error'] as const

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    variant: 'default',
    title: 'Alert title',
    children: 'A short description that explains what happened and what to do next.',
  },
  argTypes: { variant: { control: 'inline-radio', options: variants } },
  decorators: [Story => <div className="w-[480px]"><Story /></div>],
} satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithClose: Story = { args: { variant: 'info', onClose: () => {} } }

export const AllVariants: Story = {
  decorators: [],
  render: args => (
    <div className="grid grid-cols-[repeat(2,480px)] gap-6">
      {variants.map(variant => <Alert key={variant} {...args} variant={variant} />)}
    </div>
  ),
}

export const Examples: Story = {
  decorators: [],
  render: () => (
    <div className="flex w-[480px] flex-col gap-4">
      <Alert variant="warning" title="KYC pending">Upload the borrower's PAN card to release the loan.</Alert>
      <Alert variant="success" title="Collateral verified" onClose={() => {}} />
      <Alert variant="error" title="Payment failed">EMI of ₹ 24,500 could not be debited. Retry or change the account.</Alert>
    </div>
  ),
}
