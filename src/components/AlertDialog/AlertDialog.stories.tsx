import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { AlertDialog } from './AlertDialog'

const meta = {
  title: 'Components/Alert dialog',
  component: AlertDialog,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Are you sure?',
    description: 'This action cannot be undone. Please confirm to continue.',
    destructive: false,
  },
  decorators: [Story => <div className="h-[320px] p-8"><Story /></div>],
} satisfies Meta<typeof AlertDialog>
export default meta
type Story = StoryObj<typeof meta>

/** Figma Type=Default, shown open. */
export const Default: Story = { args: { defaultOpen: true } }

/** Figma Type=Destructive, shown open. */
export const Destructive: Story = {
  args: {
    defaultOpen: true,
    destructive: true,
    title: 'Delete this loan application?',
    description: 'The application and its documents will be removed. This cannot be undone.',
  },
}

/** Click the button to open the dialog. Esc or Cancel closes it. */
export const WithTrigger: Story = {
  args: { trigger: <Button variant="destructive" leadingIcon="delete">Delete application</Button>, destructive: true },
}
