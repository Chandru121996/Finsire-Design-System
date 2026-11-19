import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from './DatePicker'

const meta = {
  title: 'Components/Date picker',
  component: DatePicker,
  args: { label: 'Payment date', defaultValue: new Date(2026, 10, 24), placeholder: 'Select date', disabled: false },
  decorators: [Story => <div className="w-[320px]"><Story /></div>],
} satisfies Meta<typeof DatePicker>
export default meta
type Story = StoryObj<typeof meta>

/** Figma State=Closed. Click the field to open the calendar. */
export const Closed: Story = {}

/** Figma State=Open. */
export const Open: Story = {
  args: { defaultOpen: true },
  decorators: [Story => <div className="h-[420px]"><Story /></div>],
}

export const Empty: Story = { args: { defaultValue: undefined, helperText: 'First EMI date' } }

export const WithError: Story = { args: { defaultValue: undefined, status: 'error', helperText: 'Choose a payment date' } }

export const Disabled: Story = { args: { disabled: true } }
