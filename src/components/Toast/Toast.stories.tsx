import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Toast, Toaster, toast } from './Toast'

const variants = ['default', 'info', 'success', 'warning', 'error'] as const

const meta = {
  title: 'Components/Toast',
  component: Toast,
  args: { title: 'Transfer sent', description: 'You sent ₹ 12,500 to Anita Rao.', variant: 'default' },
  argTypes: { variant: { control: 'inline-radio', options: variants } },
} satisfies Meta<typeof Toast>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithActionAndClose: Story = {
  args: { variant: 'success', action: { label: 'Undo', onClick: () => {} }, onClose: () => {} },
}

export const AllVariants: Story = {
  render: args => (
    <div className="grid grid-cols-[repeat(2,360px)] gap-6 p-2">
      {variants.map(variant => <Toast key={variant} {...args} variant={variant} />)}
    </div>
  ),
}

/** Click a button: the toast pops up bottom-right and disappears after 5 seconds. */
export const LiveDemo: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Toaster />
      <Button onClick={() => toast({ variant: 'success', title: 'Transfer sent', description: 'You sent ₹ 12,500 to Anita Rao.', action: { label: 'Undo', onClick: () => {} } })}>
        Success toast
      </Button>
      <Button variant="destructive" onClick={() => toast({ variant: 'error', title: 'Payment failed', description: 'EMI could not be debited.' })}>
        Error toast
      </Button>
      <Button variant="outline" onClick={() => toast({ title: 'Statement ready', description: 'October statement is ready to download.' })}>
        Default toast
      </Button>
    </div>
  ),
}
