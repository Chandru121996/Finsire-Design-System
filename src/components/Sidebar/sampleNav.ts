import type { SidebarGroup } from './Sidebar'

/** The navigation used in the Figma Sidebar examples. Handy for stories and reference screens. */
export const sampleNav: SidebarGroup[] = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'repayment', label: 'Repayment', icon: 'receipt_long' },
      { id: 'master-log', label: 'Master Log', icon: 'history' },
      { id: 'communication', label: 'Communication', icon: 'mail' },
    ],
  },
  {
    label: 'Loan Management',
    shortLabel: 'Loan',
    items: [
      { id: 'users', label: 'Users', icon: 'group', children: [{ id: 'kyc', label: 'KYC Status' }, { id: 'eligible', label: 'Eligible Users' }] },
      {
        id: 'assets',
        label: 'Assets',
        icon: 'account_balance_wallet',
        children: [
          { id: 'overdraft', label: 'Overdraft' },
          { id: 'overdraft-upi', label: 'Overdraft-UPI' },
          { id: 'term-loan', label: 'Term Loan' },
          { id: 'credit-card', label: 'Credit Card' },
        ],
      },
    ],
  },
  {
    label: 'Collateral Management',
    shortLabel: 'Collateral',
    items: [
      {
        id: 'loan-action',
        label: 'Loan Action',
        icon: 'swap_horiz',
        children: [{ id: 'invoke', label: 'Invoke', count: '100+' }, { id: 'revoke', label: 'Revoke', count: '100+' }],
      },
    ],
  },
  {
    label: 'Other',
    items: [
      { id: 'distributor', label: 'Distributor', icon: 'hub' },
      { id: 'settings', label: 'Settings', icon: 'settings', children: [{ id: 'roles', label: 'Roles' }, { id: 'audit', label: 'Audit trail' }] },
    ],
  },
]
