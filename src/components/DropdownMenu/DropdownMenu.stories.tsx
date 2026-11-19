import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu'

const meta = { title: 'Components/Dropdown menu', component: DropdownMenu } satisfies Meta<typeof DropdownMenu>
export default meta
type Story = StoryObj<typeof meta>

function AccountMenu({ defaultOpen }: { defaultOpen?: boolean }) {
  return (
    <DropdownMenu defaultOpen={defaultOpen} modal={false}>
      <DropdownMenuTrigger>
        <Button variant="outline" trailingIcon="expand_more">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon="person" shortcut="⇧⌘P">Profile</DropdownMenuItem>
        <DropdownMenuItem icon="credit_card" shortcut="⌘B">Billing</DropdownMenuItem>
        <DropdownMenuItem icon="settings" shortcut="⌘S">Settings</DropdownMenuItem>
        <DropdownMenuItem icon="notifications" shortcut="⌘N" disabled>Notifications</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon="logout" shortcut="⇧⌘Q" destructive>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Figma "Dropdown", State=Closed. Click the button to open it; arrow keys move through the items. */
export const Closed: Story = { render: () => <AccountMenu /> }

/** Figma "Dropdown", State=Open, with the "Dropdown menu" panel. */
export const Open: Story = { render: () => <div className="h-[320px]"><AccountMenu defaultOpen /></div> }

/** Figma "Menu item": Default, Hover, Disabled × Default and Destructive. */
export const MenuItems: Story = {
  render: () => (
    <div className="h-[200px]">
      <DropdownMenu open modal={false}>
        <DropdownMenuTrigger><span /></DropdownMenuTrigger>
        <DropdownMenuContent className="w-[240px]">
          <DropdownMenuItem icon="person" shortcut="⌘P">Profile</DropdownMenuItem>
          <div data-force-state="hover"><DropdownMenuItem icon="person" shortcut="⌘P">Profile (hover)</DropdownMenuItem></div>
          <DropdownMenuItem icon="person" shortcut="⌘P" disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem icon="logout" shortcut="⇧⌘Q" destructive>Log out</DropdownMenuItem>
          <div data-force-state="hover"><DropdownMenuItem icon="logout" shortcut="⇧⌘Q" destructive>Log out (hover)</DropdownMenuItem></div>
          <DropdownMenuItem icon="logout" shortcut="⇧⌘Q" destructive disabled>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}
