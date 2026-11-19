import type { Meta, StoryObj } from '@storybook/react-vite'
import { forceState, interactiveStates, type StoryState } from '../../storybook/states'
import { IconButton } from './IconButton'

// Figma has Active instead of Focus as a visual state; Focus still works for keyboard users.
const states: StoryState[] = [...interactiveStates.slice(0, 3), { name: 'Active' }, ...interactiveStates.slice(3)]

const meta = {
  title: 'Components/Icon button',
  component: IconButton,
  args: { icon: 'search', label: 'Search', size: 40, bordered: false, active: false },
  argTypes: { size: { control: 'inline-radio', options: [32, 40] } },
} satisfies Meta<typeof IconButton>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-[160px_repeat(6,max-content)] items-center gap-x-8 gap-y-4">
      <span />
      {states.map(s => (
        <span key={s.name} className="text-label-small text-text-tertiary">{s.name}</span>
      ))}
      {[false, true].flatMap(bordered =>
        ([32, 40] as const).map(size => (
          <div key={`${bordered}${size}`} className="contents">
            <span className="text-label-small text-text-tertiary">{bordered ? 'Bordered' : 'Plain'} · {size}</span>
            {states.map(s => (
              <span key={s.name} {...forceState(s)}>
                <IconButton
                  icon={bordered ? 'search' : 'help'}
                  label="Example"
                  size={size}
                  bordered={bordered}
                  active={s.name === 'Active'}
                  disabled={s.disabled}
                />
              </span>
            ))}
          </div>
        )),
      )}
    </div>
  ),
}
