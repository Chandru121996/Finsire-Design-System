import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menubar, MenubarItem, MenubarMenu, MenubarSeparator } from './Menubar'

const meta = { title: 'Components/Menu bar', component: Menubar } satisfies Meta<typeof Menubar>
export default meta
type Story = StoryObj<typeof meta>

function Example(props: { defaultValue?: string }) {
  return (
    <Menubar {...props}>
      <MenubarMenu label="File" value="file">
        <MenubarItem icon="add" shortcut="⌘N">New application</MenubarItem>
        <MenubarItem icon="upload" shortcut="⌘U">Upload statement</MenubarItem>
        <MenubarSeparator />
        <MenubarItem icon="print" shortcut="⌘P">Print</MenubarItem>
      </MenubarMenu>
      <MenubarMenu label="Transfers" value="transfers">
        <MenubarItem icon="send">New transfer</MenubarItem>
        <MenubarItem icon="schedule">Scheduled</MenubarItem>
      </MenubarMenu>
      <MenubarMenu label="Reports" value="reports">
        <MenubarItem icon="download">Download MIS</MenubarItem>
      </MenubarMenu>
      <MenubarMenu label="Account" value="account">
        <MenubarItem icon="person">Profile</MenubarItem>
        <MenubarItem icon="logout" destructive>Log out</MenubarItem>
      </MenubarMenu>
    </Menubar>
  )
}

/** Figma "Menu bar". Click a menu; arrow keys move between menus. */
export const Default: Story = { render: () => <Example /> }

/** With the File menu open (Figma Menu bar trigger State=Open). */
export const Open: Story = { render: () => <div className="h-[220px]"><Example defaultValue="file" /></div> }
