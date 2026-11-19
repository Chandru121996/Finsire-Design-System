import { AppShell, PageHeader } from '../components/AppShell/AppShell'
import { Avatar } from '../components/Avatar/Avatar'
import { Chart, ChartTable } from '../components/Chart/Chart'
import { accountFunnel, accountFunnelSeries, fundHoldings, fundHoldingsSeries, monthlyLending, monthlyLendingSeries } from '../components/Chart/sampleChartData'
import { ChartCard } from '../components/ChartCard/ChartCard'
import { EmptyState } from '../components/EmptyState/EmptyState'
import { KpiCard, type KpiStatus } from '../components/KpiCard/KpiCard'
import { Select } from '../components/Select/Select'
import { CellNumber, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '../components/Table/Table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs/Tabs'
import { formatINR, formatNumberIN } from '../lib/format'
import { shellProps } from './shell'

const kpis: { value: string; status: KpiStatus; target: string; title: string; info: string }[] = [
  { value: '₹224 Cr', status: 'caution', target: '16% MoM, Target: ≥ 20% MoM', title: 'Total Pledged Amount', info: 'Value of all securities pledged as collateral.' },
  { value: '₹160 Cr', status: 'caution', target: 'Aggregated LTV: 65% of pledged value', title: 'Total Disbursed Amount', info: 'Loans paid out against pledged securities.' },
  { value: '6%', status: 'critical', target: 'Target: ≤ 4%', title: 'NPL Ratio (Non-Performing Loans)', info: 'Share of loans overdue by 90 days or more.' },
  { value: '10%', status: 'caution', target: 'Target: ≥ 11%', title: 'Portfolio Yield', info: 'Interest earned as a share of the loan book.' },
  { value: '90%', status: 'excellent', target: 'Target: ≥ 85%', title: 'Collection Effectiveness Index (CEI)', info: 'Share of dues collected this month.' },
]

const topUsers = [
  { initials: 'KS', name: 'Karthik S', value: 1211026.81, tone: 'primary' },
  { initials: 'SK', name: 'Sunita Kapoor', value: 1210967.01, tone: 'accent' },
  { initials: 'DS', name: 'Divya Sharma', value: 129440.79, tone: 'success' },
  { initials: 'SS', name: 'Sandeep Singh', value: 27367.16, tone: 'warning' },
  { initials: 'RP', name: 'Rohit Patil', value: 20000, tone: 'info' },
] as const

const lakhs = (value: number) => (value === 0 ? '0' : `${(value / 1e5).toFixed(2)} L`)
const rupees = (value: number) => formatINR(value, { decimals: 0 })
const count = (value: number) => formatNumberIN(value)

/** Figma "Credit Dashboard" reference screen. */
export function CreditDashboard() {
  return (
    <AppShell {...shellProps('dashboard', { label: 'Dashboard', icon: 'dashboard' })}>
      <div className="flex flex-col gap-5">
        <PageHeader
          title="Dashboard"
          actions={
            <Select
              className="w-[240px]"
              placeholder="Select DSA"
              options={[
                { value: 'finsire', label: 'Finsire Capital' },
                { value: 'wealth', label: 'Wealth Hub' },
                { value: 'axis', label: 'Axis Partners' },
              ]}
            />
          }
        />
        <Tabs defaultValue="credit" className="gap-5">
          <TabsList>
            <TabsTrigger value="credit" icon="account_balance">Credit Dashboard</TabsTrigger>
            <TabsTrigger value="conversion" icon="insights">Conversion Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="credit" className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-4">
              {kpis.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ChartCard title="Overdraft Activity" legend={accountFunnel.map(r => ({ label: r.status, series: r.__series as 1 | 2 | 3 | 4 }))}>
                <Chart type="horizontal-bar" data={accountFunnel} categoryKey="status" series={accountFunnelSeries} axisFormatter={count} ariaLabel="Overdraft accounts by status" />
              </ChartCard>
              <ChartCard
                title="Top Pledged Securities"
                legend={fundHoldingsSeries.map(s => ({ label: s.label, series: s.series }))}
                table={<ChartTable data={fundHoldings} categoryKey="fund" categoryLabel="Fund" series={fundHoldingsSeries} valueFormatter={count} />}
              >
                <Chart type="bar-line" data={fundHoldings} categoryKey="fund" series={fundHoldingsSeries} axisFormatter={count} ariaLabel="Securities and users for the top five funds" />
              </ChartCard>
              <ChartCard
                title="Disbursement - Pledged"
                legend={monthlyLendingSeries.map(s => ({ label: s.label, series: s.series }))}
                table={<ChartTable data={monthlyLending} categoryKey="month" categoryLabel="Month" series={monthlyLendingSeries} valueFormatter={rupees} />}
              >
                <Chart type="line" data={monthlyLending} categoryKey="month" series={monthlyLendingSeries} axisFormatter={lakhs} valueFormatter={rupees} ariaLabel="Monthly disbursement and pledged amount" />
              </ChartCard>
              <section className="flex flex-col gap-4 rounded-lg border border-border-default bg-surface-base p-6">
                <h3 className="text-heading-h5 text-text-primary">Top Active Pledged Users</h3>
                <Table containerClassName="rounded-none border-0">
                  <TableHeader>
                    <tr>
                      <TableHeaderCell>Username</TableHeaderCell>
                      <TableHeaderCell align="right">Pledged Value</TableHeaderCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {topUsers.map(u => (
                      <TableRow key={u.name}>
                        <TableCell>
                          <div className="flex items-center gap-3"><Avatar initials={u.initials} size={32} tone={u.tone} />{u.name}</div>
                        </TableCell>
                        <TableCell align="right"><CellNumber>{formatINR(u.value)}</CellNumber></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </section>
            </div>
          </TabsContent>
          <TabsContent value="conversion">
            <EmptyState bordered icon="insights" title="Conversion Analytics" description="This tab is a placeholder in the Figma reference screens." />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
