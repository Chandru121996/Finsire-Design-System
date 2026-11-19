import type { Meta, StoryObj } from '@storybook/react-vite'
import { forceState } from '../../storybook/states'
import { NotificationBell } from './NotificationBell'

const counts = [
  { name: 'None', props: {} },
  { name: 'Dot', props: { dot: true } },
  { name: 'Single', props: { count: 3 } },
  { name: 'Double', props: { count: 15 } },
  { name: 'Overflow', props: { count: 120 } },
]

const meta = {
  title: 'Components/Notification bell',
  component: NotificationBell,
  args: { count: 3, dot: false, iconStyle: 'outlined' },
  argTypes: { iconStyle: { control: 'inline-radio', options: ['outlined', 'filled'] } },
} satisfies Meta<typeof NotificationBell>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-[160px_repeat(5,max-content)] items-center gap-x-8 gap-y-4">
      <span />
      {counts.map(c => (
        <span key={c.name} className="text-label-small text-text-tertiary">{c.name}</span>
      ))}
      {(['outlined', 'filled'] as const).flatMap(iconStyle =>
        [{ name: 'Default' }, { name: 'Hover', force: 'hover' as const }].map(state => (
          <div key={iconStyle + state.name} className="contents">
            <span className="text-label-small text-text-tertiary capitalize">{iconStyle} · {state.name}</span>
            {counts.map(c => (
              <span key={c.name} {...forceState(state)}>
                <NotificationBell iconStyle={iconStyle} {...c.props} />
              </span>
            ))}
          </div>
        )),
      )}
    </div>
  ),
}
