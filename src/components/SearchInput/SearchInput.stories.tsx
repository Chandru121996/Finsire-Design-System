import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchInput } from './SearchInput'

const states = [
  { name: 'Default' },
  { name: 'Hover', force: 'hover' },
  { name: 'Focus', force: 'focus-visible' },
  { name: 'Filled', value: 'October statement' },
  { name: 'Disabled', disabled: true },
]

const meta = {
  title: 'Components/Search input',
  component: SearchInput,
  args: { variant: 'default', placeholder: 'Search…', shortcut: '/', disabled: false },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'muted', 'pill'] } },
  decorators: [Story => <div className="w-[300px]"><Story /></div>],
} satisfies Meta<typeof SearchInput>
export default meta
type Story = StoryObj<typeof meta>

/** Press "/" anywhere on the page to jump into the field. Esc clears it. */
export const Playground: Story = {}

export const AllVariants: Story = {
  decorators: [],
  render: () => (
    <div className="grid grid-cols-[80px_repeat(3,300px)] items-center gap-x-6 gap-y-4">
      <span />
      {(['default', 'muted', 'pill'] as const).map(v => <span key={v} className="text-label-small text-text-tertiary capitalize">{v}</span>)}
      {states.map(s => (
        <div key={s.name} className="contents">
          <span className="text-label-small text-text-tertiary">{s.name}</span>
          {(['default', 'muted', 'pill'] as const).map(variant => (
            <div key={variant} data-force-state={s.force}>
              <SearchInput variant={variant} defaultValue={s.value} disabled={s.disabled} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}
