import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { cn } from '../../lib/utils'
import { Avatar } from '../Avatar/Avatar'
import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { NavItem } from '../Sidebar/NavItem'
import { Drawer } from './Drawer'

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
  args: { title: 'Transaction details' },
  decorators: [Story => <div className="h-screen p-8"><Story /></div>],
} satisfies Meta<typeof Drawer>
export default meta
type Story = StoryObj<typeof meta>

const details = [
  ['To', 'Anita Rao'],
  ['Account', 'HDFC •••• 4821'],
  ['Date', '3 Nov 2026, 10:42'],
  ['Reference', 'TXN-48213'],
  ['Fee', '₹ 0.00'],
]

/** Figma Side=Right: details of one transaction. */
export const Right: Story = {
  args: {
    defaultOpen: true,
    children: (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-1">
          <span className="text-body-xsmall text-text-secondary">Amount sent</span>
          <span className="text-heading-h2 text-text-primary tabular-nums">₹&nbsp;12,500.00</span>
          <Badge variant="success">Completed</Badge>
        </div>
        <dl className="flex flex-col">
          {details.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-border-default py-3 text-body-small">
              <dt className="text-text-secondary">{label}</dt>
              <dd className="text-label-base text-text-primary tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
    footer: (<><Button leadingIcon="download">Download receipt</Button><Button variant="outline">Report an issue</Button></>),
  },
}

/** Figma Side=Left: menu on small screens. */
export const Left: Story = {
  args: {
    defaultOpen: true,
    side: 'left',
    title: 'Menu',
    children: (
      <nav className="flex flex-col gap-1">
        <NavItem label="Dashboard" icon="dashboard" active />
        <NavItem label="Accounts" icon="account_balance" />
        <NavItem label="Transactions" icon="receipt_long" />
        <NavItem label="Cards" icon="credit_card" />
        <NavItem label="Payments" icon="payments" />
        <NavItem label="Settings" icon="settings" />
      </nav>
    ),
    footer: (
      <div className="flex items-center gap-3">
        <Avatar initials="AR" size={32} />
        <div className="flex flex-col">
          <span className="text-label-base text-text-primary">Anita Rao</span>
          <span className="text-body-xsmall text-text-secondary">anita@acme.com</span>
        </div>
      </div>
    ),
  },
}

const accounts = [
  { id: 'salary', name: 'Salary account', number: '•••• 4821' },
  { id: 'savings', name: 'Savings account', number: '•••• 1190' },
  { id: 'business', name: 'Business account', number: '•••• 7763' },
]

function AccountPicker() {
  const [selected, setSelected] = useState('salary')
  return (
    <div role="radiogroup" aria-label="Accounts" className="flex flex-col gap-2">
      {accounts.map(account => {
        const isSelected = account.id === selected
        return (
          <button
            key={account.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => setSelected(account.id)}
            className={cn(
              'flex w-full cursor-pointer items-center gap-3 rounded-md border p-3 text-left outline-border-focus focus-visible:outline-2',
              isSelected ? 'border-primary-default bg-primary-container' : 'border-border-default bg-surface-base hover:bg-interaction-hover',
            )}
          >
            <span className="flex size-10 items-center justify-center rounded-md bg-surface-muted text-text-secondary"><Icon name="account_balance" size={20} /></span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-label-base text-text-primary">{account.name}</span>
              <span className="text-body-xsmall text-text-secondary">{account.number}</span>
            </span>
            {isSelected && <Icon name="check_circle" size={20} className="text-primary-default" />}
          </button>
        )
      })}
    </div>
  )
}

/** Figma Side=Bottom: pick-list on small screens. Height fits its content. */
export const Bottom: Story = {
  args: {
    defaultOpen: true,
    side: 'bottom',
    title: 'Select account',
    description: 'Choose the account to pay from.',
    children: <AccountPicker />,
    footer: <Button>Continue</Button>,
  },
}
