import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { Sheet, SheetClose } from './Sheet'

const form = (
  <div className="flex flex-col gap-4">
    <Input label="Full name" placeholder="Anita Rao" />
    <Input label="Account number" placeholder="0000 1234 5678" inputMode="numeric" />
    <Input label="IFSC code" placeholder="HDFC0001234" />
  </div>
)
const footer = (
  <>
    <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
    <Button>Save beneficiary</Button>
  </>
)

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Add beneficiary',
    description: 'Save the account details of the person you want to pay.',
    children: form,
    footer,
  },
  decorators: [Story => <div className="h-screen p-8"><Story /></div>],
} satisfies Meta<typeof Sheet>
export default meta
type Story = StoryObj<typeof meta>

/** Click the button to open. Esc, the × or clicking the dimmed page closes it. */
export const WithTrigger: Story = { args: { trigger: <Button leadingIcon="person_add">Add beneficiary</Button> } }

/** Figma Side=Right, shown open. */
export const Right: Story = { args: { defaultOpen: true } }

/** Figma Side=Left, shown open. */
export const Left: Story = { args: { defaultOpen: true, side: 'left' } }
