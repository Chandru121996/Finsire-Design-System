import type { Meta, StoryObj } from '@storybook/react-vite'
import { formatINR, formatNumberIN } from '../../lib/format'
import { ChartCard } from '../ChartCard/ChartCard'
import { Chart, ChartTable } from './Chart'
import {
  accountFunnel,
  accountFunnelSeries,
  fundHoldings,
  fundHoldingsSeries,
  monthlyLending,
  monthlyLendingSeries,
} from './sampleChartData'

/** Axis in lakhs, as in Figma: 0, 0.40 L, 0.80 L … */
const lakhs = (value: number) => (value === 0 ? '0' : `${(value / 1e5).toFixed(2)} L`)
const count = (value: number) => formatNumberIN(value)

const meta = {
  title: 'Components/Chart',
  component: Chart,
  parameters: { layout: 'padded' },
  decorators: [Story => <div className="w-[552px]"><Story /></div>],
} satisfies Meta<typeof Chart>
export default meta
type Story = StoryObj<typeof meta>

/** Figma Chart card, Type=Horizontal bar. Hover a bar for its value; ⊞ shows the numbers as a table. */
export const HorizontalBar: Story = {
  args: { type: 'horizontal-bar', data: accountFunnel, categoryKey: 'status', series: accountFunnelSeries, axisFormatter: count },
  render: args => (
    <ChartCard
      title="Account status"
      legend={accountFunnel.map(row => ({ label: row.status, series: row.__series as 1 | 2 | 3 | 4 }))}
      table={<ChartTable data={accountFunnel} categoryKey="status" categoryLabel="Status" series={accountFunnelSeries} valueFormatter={count} />}
    >
      <Chart {...args} ariaLabel="Accounts by status" />
    </ChartCard>
  ),
}

/** Figma Chart card, Type=Bar and line. One shared axis (never two). */
export const BarAndLine: Story = {
  args: { type: 'bar-line', data: fundHoldings, categoryKey: 'fund', series: fundHoldingsSeries, axisFormatter: count },
  render: args => (
    <ChartCard
      title="Securities and users by fund"
      legend={fundHoldingsSeries.map(s => ({ label: s.label, series: s.series }))}
      table={<ChartTable data={fundHoldings} categoryKey="fund" categoryLabel="Fund" series={fundHoldingsSeries} valueFormatter={count} />}
    >
      <Chart {...args} ariaLabel="Securities and users for five funds" />
    </ChartCard>
  ),
}

/** Figma Chart card, Type=Line. Hover anywhere for both values in that month. */
export const LineChart: Story = {
  args: {
    type: 'line',
    data: monthlyLending,
    categoryKey: 'month',
    series: monthlyLendingSeries,
    axisFormatter: lakhs,
    valueFormatter: value => formatINR(value, { decimals: 0 }),
  },
  render: args => (
    <ChartCard
      title="Disbursement vs pledged"
      legend={monthlyLendingSeries.map(s => ({ label: s.label, series: s.series }))}
      table={
        <ChartTable
          data={monthlyLending}
          categoryKey="month"
          categoryLabel="Month"
          series={monthlyLendingSeries}
          valueFormatter={value => formatINR(value, { decimals: 0 })}
        />
      }
    >
      <Chart {...args} ariaLabel="Monthly disbursement and pledged amount, May 2023 to May 2024" />
    </ChartCard>
  ),
}
