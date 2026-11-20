import type { Meta, StoryObj } from '@storybook/react-vite'
import { FinsireLogo, FinsireMark } from './Logo'

const meta = { title: 'Foundations/Logo', parameters: { layout: 'padded' } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

/** Brand teal in Light, white in Dark (primary/logo token). Switch the theme in the toolbar to compare. */
export const Logos: Story = {
  render: () => (
    <div className="flex items-end gap-12">
      <div className="flex flex-col gap-3">
        <FinsireLogo />
        <span className="text-label-small text-text-tertiary">FinsireLogo · expanded sidebar</span>
      </div>
      <div className="flex flex-col gap-3">
        <FinsireMark />
        <span className="text-label-small text-text-tertiary">FinsireMark · collapsed sidebar</span>
      </div>
    </div>
  ),
}
