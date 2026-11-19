import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard } from './HoverCard'

const meta = {
  title: 'Components/Hover card',
  component: HoverCard,
  args: {
    trigger: <a href="#" className="text-label-base text-text-link underline">Anita Rao</a>,
    name: 'Anita Rao',
    handle: 'Beneficiary · HDFC •••• 4821',
    initials: 'AR',
    children: 'Saved on 12 March 2026. Last transfer of ₹\u00a012,500 sent on 3 November.',
    meta: { icon: 'calendar_today', text: 'Joined March 2026' },
  },
  decorators: [Story => <div className="h-[220px] p-4"><Story /></div>],
} satisfies Meta<typeof HoverCard>
export default meta
type Story = StoryObj<typeof meta>

/** Point at the name to see the card. */
export const Default: Story = {}

/** Shown open, as in Figma. */
export const Open: Story = { args: { defaultOpen: true } }
