import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

const meta = { title: 'Components/Tabs', component: Tabs } satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>

function Example({ variant, icons = false }: { variant: 'line' | 'pill'; icons?: boolean }) {
  return (
    <Tabs defaultValue="overview" className="w-[560px]">
      <TabsList variant={variant}>
        <TabsTrigger value="overview" icon={icons ? 'dashboard' : undefined}>Overview</TabsTrigger>
        <TabsTrigger value="transactions" icon={icons ? 'receipt_long' : undefined}>Transactions</TabsTrigger>
        <TabsTrigger value="cards" icon={icons ? 'credit_card' : undefined}>Cards</TabsTrigger>
        <TabsTrigger value="billing" disabled icon={icons ? 'payments' : undefined}>Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-body-small text-text-secondary">Overview content</TabsContent>
      <TabsContent value="transactions" className="text-body-small text-text-secondary">Transactions content</TabsContent>
      <TabsContent value="cards" className="text-body-small text-text-secondary">Cards content</TabsContent>
    </Tabs>
  )
}

/** Figma Tabs, Style=Line. Click a tab or use the arrow keys. */
export const Line: Story = { render: () => <Example variant="line" /> }

/** Figma Tabs, Style=Pill. */
export const Pill: Story = { render: () => <Example variant="pill" /> }

export const WithIcons: Story = { render: () => <div className="flex flex-col gap-8"><Example variant="line" icons /><Example variant="pill" icons /></div> }

/** Figma "Tab item": Default, Hover, Active, Disabled for both styles. */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['line', 'pill'] as const).map(variant => (
        <Tabs key={variant} value="active">
          <TabsList variant={variant} className="w-fit">
            <TabsTrigger value="default">Overview</TabsTrigger>
            <span data-force-state="hover" className="contents"><TabsTrigger value="hover">Overview</TabsTrigger></span>
            <TabsTrigger value="active">Overview</TabsTrigger>
            <TabsTrigger value="disabled" disabled>Overview</TabsTrigger>
          </TabsList>
        </Tabs>
      ))}
    </div>
  ),
}
