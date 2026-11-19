import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'

const states = [
  { name: 'Default' },
  { name: 'Hover', force: 'hover' },
  { name: 'Focus', force: 'focus-visible' },
  { name: 'Disabled', disabled: true },
]

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { label: 'Auto-debit EMI', disabled: false },
} satisfies Meta<typeof Switch>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-[80px_repeat(4,max-content)] items-center gap-x-10 gap-y-5">
      <span />
      {states.map(s => <span key={s.name} className="text-label-small text-text-tertiary">{s.name}</span>)}
      {[false, true].map(checked => (
        <div key={String(checked)} className="contents">
          <span className="text-label-small text-text-tertiary">{checked ? 'On' : 'Off'}</span>
          {states.map(s => (
            <div key={s.name} data-force-state={s.force}>
              <Switch label="Label" checked={checked} disabled={s.disabled} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}
