import type { Meta, StoryObj } from '@storybook/react-vite'
import { forceState, interactiveStates as states } from '../../storybook/states'
import { Button } from './Button'

const variants = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const
const sizes = ['small', 'medium', 'large'] as const
const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Button', variant: 'primary', size: 'medium' },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    size: { control: 'inline-radio', options: sizes },
    leadingIcon: { control: 'text' },
    trailingIcon: { control: 'text' },
  },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithIcons: Story = {
  args: { leadingIcon: 'add', trailingIcon: 'arrow_forward' },
}

function Grid({ size }: { size: (typeof sizes)[number] }) {
  return (
    <div className="grid grid-cols-[100px_repeat(5,max-content)] items-center gap-x-6 gap-y-4">
      <span />
      {states.map(s => (
        <span key={s.name} className="text-label-small text-text-tertiary">{s.name}</span>
      ))}
      {variants.map(variant => (
        <div key={variant} className="contents">
          <span className="text-label-small text-text-tertiary capitalize">{variant}</span>
          {states.map(s => (
            <span key={s.name} {...forceState(s)}>
              <Button variant={variant} size={size} leadingIcon="add" disabled={s.disabled}>Button</Button>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

/** Every Variant × State, per Size, matching the Figma component set. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {sizes.map(size => (
        <section key={size} className="flex flex-col gap-4">
          <h2 className="text-heading-h5 capitalize">{size}</h2>
          <Grid size={size} />
        </section>
      ))}
    </div>
  ),
}
