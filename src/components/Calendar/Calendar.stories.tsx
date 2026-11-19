import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from './Calendar'

const meta = { title: 'Components/Calendar', component: Calendar } satisfies Meta<typeof Calendar>
export default meta
type Story = StoryObj<typeof meta>

function SingleDate() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 10, 24))
  return <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 10)} today={new Date(2026, 10, 19)} />
}

/** Figma "Calendar": November 2026, today 19th, 24th selected. Click any day to select it. */
export const Default: Story = { render: () => <SingleDate /> }

/** Weekends and past dates disabled, as for picking an EMI date. */
export const WithDisabledDays: Story = {
  render: () => (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 10)}
      today={new Date(2026, 10, 19)}
      disabled={[{ before: new Date(2026, 10, 19) }, { dayOfWeek: [0, 6] }]}
    />
  ),
}
