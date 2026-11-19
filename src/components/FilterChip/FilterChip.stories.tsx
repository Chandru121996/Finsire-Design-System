import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilterChip } from './FilterChip'

const states = [
  { name: 'Default' },
  { name: 'Hover', force: 'hover' },
  { name: 'Open', open: true },
  { name: 'Applied', applied: true },
  { name: 'Disabled', disabled: true },
]

const meta = {
  title: 'Components/Filter chip',
  component: FilterChip,
  args: { children: 'Users', variant: 'filter', applied: false, open: false, disabled: false },
  argTypes: { variant: { control: 'inline-radio', options: ['filter', 'all-filters'] } },
} satisfies Meta<typeof FilterChip>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-[100px_repeat(5,max-content)] items-center gap-x-6 gap-y-4">
      <span />
      {states.map(s => <span key={s.name} className="text-label-small text-text-tertiary">{s.name}</span>)}
      {(['filter', 'all-filters'] as const).map(variant => (
        <div key={variant} className="contents">
          <span className="text-label-small text-text-tertiary">{variant === 'filter' ? 'Filter' : 'All filters'}</span>
          {states.map(({ name, force, ...props }) => (
            <span key={name} data-force-state={force}>
              <FilterChip variant={variant} {...props}>{variant === 'filter' ? 'Users' : undefined}</FilterChip>
            </span>
          ))}
        </div>
      ))}
    </div>
  ),
}
