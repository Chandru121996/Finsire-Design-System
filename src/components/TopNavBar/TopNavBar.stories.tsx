import type { Meta, StoryObj } from '@storybook/react-vite'
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../DropdownMenu/DropdownMenu'
import { TopNavBar } from './TopNavBar'

const meta = {
  title: 'Components/Top nav bar',
  component: TopNavBar,
  parameters: { layout: 'fullscreen' },
  args: {
    breadcrumbs: [{ label: 'Home', href: '#' }, { label: 'Accounts', href: '#' }, { label: 'Statements' }],
    notificationCount: 15,
    user: { initials: 'AR', name: 'Anita Rao' },
    profileMenu: (
      <>
        <DropdownMenuLabel>Anita Rao</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon="person">Profile</DropdownMenuItem>
        <DropdownMenuItem icon="settings">Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon="logout" destructive>Log out</DropdownMenuItem>
      </>
    ),
  },
} satisfies Meta<typeof TopNavBar>
export default meta
type Story = StoryObj<typeof meta>

/** Figma Type=Desktop (1180 wide). Click the avatar for the profile menu; press / to search. */
export const Desktop: Story = { decorators: [Story => <div className="w-[1180px]"><Story /></div>] }

/** Figma Type=Compact (760 wide). */
export const Compact: Story = { args: { variant: 'compact' }, decorators: [Story => <div className="w-[760px]"><Story /></div>] }
