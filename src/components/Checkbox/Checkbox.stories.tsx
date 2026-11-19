import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const states = [
  { name: 'Default' },
  { name: 'Hover', force: 'hover' },
  { name: 'Focus', force: 'focus-visible' },
  { name: 'Disabled', disabled: true },
  { name: 'Error', invalid: true },
]
const values = [
  { name: 'Unchecked', checked: false },
  { name: 'Checked', checked: true },
  { name: 'Indeterminate', checked: 'indeterminate' as const },
]

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'I agree to the loan terms', disabled: false, invalid: false },
} satisfies Meta<typeof Checkbox>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-[120px_repeat(5,max-content)] items-center gap-x-10 gap-y-5">
      <span />
      {states.map(s => <span key={s.name} className="text-label-small text-text-tertiary">{s.name}</span>)}
      {values.map(v => (
        <div key={v.name} className="contents">
          <span className="text-label-small text-text-tertiary">{v.name}</span>
          {states.map(s => (
            <div key={s.name} data-force-state={s.force}>
              <Checkbox label="Label" checked={v.checked} disabled={s.disabled} invalid={s.invalid} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}
