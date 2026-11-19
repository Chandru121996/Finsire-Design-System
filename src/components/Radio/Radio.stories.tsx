import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio, RadioGroup } from './Radio'

const states = [
  { name: 'Default' },
  { name: 'Hover', force: 'hover' },
  { name: 'Focus', force: 'focus-visible' },
  { name: 'Disabled', disabled: true },
  { name: 'Error', invalid: true },
]

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  args: { label: 'Payment method', defaultValue: 'upi' },
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
} satisfies Meta<typeof RadioGroup>
export default meta
type Story = StoryObj<typeof meta>

/** Figma "Radio group". */
export const Group: Story = {
  render: args => (
    <RadioGroup {...args}>
      <Radio value="upi" label="UPI" />
      <Radio value="netbanking" label="Net banking" />
      <Radio value="card" label="Credit card" />
    </RadioGroup>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-[80px_repeat(5,max-content)] items-center gap-x-10 gap-y-5">
      <span />
      {states.map(s => <span key={s.name} className="text-label-small text-text-tertiary">{s.name}</span>)}
      {[false, true].map(selected => (
        <div key={String(selected)} className="contents">
          <span className="text-label-small text-text-tertiary">{selected ? 'On' : 'Off'}</span>
          {states.map(s => (
            <div key={s.name} data-force-state={s.force}>
              <RadioGroup value={selected ? 'a' : ''} invalid={s.invalid} disabled={s.disabled}>
                <Radio value="a" label="Label" />
              </RadioGroup>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}
