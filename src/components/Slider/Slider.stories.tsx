import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from './Slider'

const states = [
  { name: 'Default' },
  { name: 'Hover', force: 'hover' },
  { name: 'Focus', force: 'focus-visible' },
  { name: 'Disabled', disabled: true },
]

const meta = {
  title: 'Components/Slider',
  component: Slider,
  args: { label: 'Loan tenure', defaultValue: 25, min: 0, max: 100, step: 1, disabled: false },
  decorators: [Story => <div className="w-[280px]"><Story /></div>],
} satisfies Meta<typeof Slider>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  decorators: [],
  render: () => (
    <div className="grid grid-cols-[80px_repeat(3,280px)] items-center gap-x-10 gap-y-4">
      <span />
      {[25, 50, 75].map(v => <span key={v} className="text-label-small text-text-tertiary">Value {v}</span>)}
      {states.map(s => (
        <div key={s.name} className="contents">
          <span className="text-label-small text-text-tertiary">{s.name}</span>
          {[25, 50, 75].map(v => (
            <div key={v} data-force-state={s.force}>
              <Slider label="Example" value={v} disabled={s.disabled} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}
