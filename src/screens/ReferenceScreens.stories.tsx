import type { Meta, StoryObj } from '@storybook/react-vite'
import { CreditDashboard } from './CreditDashboard'
import { MasterLog } from './MasterLog'

const meta = {
  title: 'Reference screens',
  parameters: { layout: 'fullscreen' },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

/** Figma Dashboard Test › Master Log (1440 × 1024). Built only from library components. */
export const MasterLogScreen: Story = { name: 'Master Log', render: () => <MasterLog /> }

/** Figma Dashboard Test › Credit Dashboard. Scroll the main area to see all charts. */
export const CreditDashboardScreen: Story = { name: 'Credit Dashboard', render: () => <CreditDashboard /> }
