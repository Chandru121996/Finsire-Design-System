import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumbs } from './Breadcrumbs'

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  args: { items: [{ label: 'Home', href: '#' }, { label: 'Accounts', href: '#' }, { label: 'Statements' }] },
} satisfies Meta<typeof Breadcrumbs>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Figma Levels 3, 2 and 1, and the Hover state of a link. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Accounts', href: '#' }, { label: 'Statements' }]} />
      <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Master Log' }]} />
      <Breadcrumbs items={[{ label: 'Master Log' }]} />
      <Breadcrumbs icon="history" items={[{ label: 'Home', href: '#' }, { label: 'Master Log' }]} />
      <div data-force-state="hover">
        <Breadcrumbs items={[{ label: 'Accounts (hover)', href: '#' }, { label: 'Statements' }]} />
      </div>
    </div>
  ),
}
