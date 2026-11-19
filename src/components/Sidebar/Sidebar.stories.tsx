import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavItem, SidebarItem } from './NavItem'
import { Sidebar, type SidebarState } from './Sidebar'
import { sampleNav } from './sampleNav'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  args: {
    groups: sampleNav,
    workspace: { name: 'Super Admin', detail: 'Team · 4 Members', initials: 'SA' },
  },
} satisfies Meta<typeof Sidebar>
export default meta
type Story = StoryObj<typeof meta>

function Demo({ initial, ...args }: Story['args'] & { initial: SidebarState }) {
  const [active, setActive] = useState('dashboard')
  return (
    <div className="flex h-[1024px] bg-surface-page">
      <Sidebar {...args} groups={sampleNav} defaultState={initial} activeId={active} onNavigate={link => setActive(link.id)} />
      <main className="flex-1 p-8 text-body-small text-text-secondary">Page content. Current page: {active}</main>
    </div>
  )
}

/** Figma State=Pinned. Click Users / Assets to open them; click the pin to unpin; « collapses. */
export const Pinned: Story = { render: args => <Demo {...args} initial="pinned" defaultOpenIds={['users', 'assets', 'loan-action']} /> }

/** Figma State=Collapsed (72 rail). Hover it to see State=Hover expanded; » opens State=Expanded. */
export const Collapsed: Story = { render: args => <Demo {...args} initial="collapsed" /> }

/** Figma State=Expanded: opened with », closes after you pick a page. */
export const Expanded: Story = { render: args => <Demo {...args} initial="expanded" /> }

/** Figma "Nav item": Item, Parent, Child × Default, Hover, Active (Parent also Open). */
export const NavItems: Story = {
  render: () => (
    <div className="grid w-[800px] grid-cols-3 gap-4 bg-surface-base p-6">
      <NavItem label="Menu item" icon="dashboard" />
      <div data-force-state="hover"><NavItem label="Menu item" icon="dashboard" /></div>
      <NavItem label="Menu item" icon="dashboard" active />
      <NavItem label="Menu item" icon="dashboard" type="parent" />
      <div data-force-state="hover"><NavItem label="Menu item" icon="dashboard" type="parent" /></div>
      <NavItem label="Menu item" icon="dashboard" type="parent" open />
      <NavItem label="Menu item" type="child" count="100+" />
      <div data-force-state="hover"><NavItem label="Menu item" type="child" /></div>
      <NavItem label="Menu item" type="child" active />
    </div>
  ),
}

/** Figma "Sidebar item": expanded row and collapsed rail button × Default, Hover, Active. */
export const SidebarItems: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-surface-base p-6">
      <div className="flex w-[760px] gap-4">
        <NavItem label="Dashboard" icon="dashboard" />
        <div data-force-state="hover" className="w-full"><NavItem label="Dashboard" icon="dashboard" /></div>
        <NavItem label="Dashboard" icon="dashboard" active />
      </div>
      <div className="flex gap-4">
        <SidebarItem label="Dashboard" icon="dashboard" />
        <span data-force-state="hover"><SidebarItem label="Dashboard" icon="dashboard" /></span>
        <SidebarItem label="Dashboard" icon="dashboard" active />
      </div>
    </div>
  ),
}
