import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../components/DropdownMenu/DropdownMenu'
import type { AppShellProps } from '../components/AppShell/AppShell'
import { sampleNav } from '../components/Sidebar/sampleNav'

/** Sidebar and top bar shared by the reference screens. */
export function shellProps(activeId: string, page: { label: string; icon: string }): Omit<AppShellProps, 'children'> {
  return {
    sidebar: {
      groups: sampleNav,
      activeId,
      defaultState: 'collapsed',
      workspace: { name: 'Acme Finance', detail: 'Team · 4 Members', initials: 'AF' },
    },
    topNav: {
      breadcrumbs: [{ label: page.label }],
      breadcrumbIcon: page.icon,
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
  }
}
