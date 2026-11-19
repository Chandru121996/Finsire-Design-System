import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const accounts = [
  { value: 'savings', label: 'Savings account' },
  { value: 'current', label: 'Current account' },
  { value: 'salary', label: 'Salary account' },
  { value: 'fd', label: 'Fixed deposit', disabled: true },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'Debit account', placeholder: 'Select account', helperText: 'EMI is debited on the 5th', options: accounts, status: 'default', disabled: false },
  argTypes: { status: { control: 'inline-radio', options: ['default', 'error'] } },
  decorators: [Story => <div className="w-[320px]"><Story /></div>],
} satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Figma "Select menu": open, with Savings account selected and Fixed deposit disabled. */
export const OpenMenu: Story = {
  args: { defaultValue: 'savings', defaultOpen: true },
  decorators: [Story => <div className="h-[260px]"><Story /></div>],
}

export const AllStates: Story = {
  decorators: [],
  render: () => (
    <div className="grid grid-cols-[repeat(3,320px)] gap-x-8 gap-y-6">
      {[
        { name: 'Default' },
        { name: 'Hover', force: 'hover' },
        { name: 'Focus', force: 'focus-visible' },
        { name: 'Error', status: 'error' as const, helperText: 'Choose an account' },
        { name: 'Disabled', disabled: true },
      ].map(s => (
        <div key={s.name} className="flex flex-col gap-2" data-force-state={s.force}>
          <span className="text-label-small text-text-tertiary">{s.name}</span>
          <Select label="Label" placeholder="Select account" helperText="Helper text" options={accounts} {...s} />
        </div>
      ))}
    </div>
  ),
}
