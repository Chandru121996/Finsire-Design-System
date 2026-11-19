import type { Meta, StoryObj } from '@storybook/react-vite'
import { Collapsible } from './Collapsible'

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  args: { title: 'Linked accounts (3)', items: ['HDFC Bank •••• 4821', 'ICICI Bank •••• 1190', 'SBI •••• 7763'] },
  decorators: [Story => <div className="w-[360px]"><Story /></div>],
} satisfies Meta<typeof Collapsible>
export default meta
type Story = StoryObj<typeof meta>

/** Figma State=Closed. Click ⇕ to show all accounts. */
export const Closed: Story = {}

/** Figma State=Open. */
export const Open: Story = { args: { defaultOpen: true } }
