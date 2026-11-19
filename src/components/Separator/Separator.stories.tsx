import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './Separator'

const meta = { title: 'Components/Separator', component: Separator } satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex w-[240px] flex-col gap-3">
        <span className="text-label-small text-text-tertiary">Horizontal</span>
        <Separator />
      </div>
      <div className="flex h-10 items-center gap-4 text-body-small">
        <span>Loans</span>
        <Separator orientation="vertical" />
        <span>Collateral</span>
        <Separator orientation="vertical" />
        <span>Reports</span>
      </div>
    </div>
  ),
}
