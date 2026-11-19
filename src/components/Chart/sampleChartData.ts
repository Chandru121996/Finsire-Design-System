import type { ChartSeriesConfig } from './Chart'

// The data shown in the Figma Chart card examples. Handy for stories and reference screens.

/** Figma Type=Horizontal bar: one bar per status, each in its own colour. */
export const accountFunnel = [
  { status: 'Account Created', count: 122, __series: 1 },
  { status: 'Account Approved', count: 84, __series: 2 },
  { status: 'Account Failed', count: 26, __series: 3 },
  { status: 'Digisign Created', count: 104, __series: 4 },
]
export const accountFunnelSeries: ChartSeriesConfig[] = [{ key: 'count', label: 'Accounts', series: 1 }]

/** Figma Type=Bar and line: securities (bars) and users (line) per fund, on one axis. */
export const fundHoldings = [
  { fund: 'ICICI Prudential Bluechip', securities: 3700, users: 800 },
  { fund: 'ICICI Large Cap', securities: 3000, users: 2050 },
  { fund: 'HDFC Flexi Cap', securities: 2500, users: 1400 },
  { fund: 'Axis Bluechip', securities: 1500, users: 500 },
  { fund: 'Kotak Flexicap', securities: 1250, users: 2050 },
]
export const fundHoldingsSeries: ChartSeriesConfig[] = [
  { key: 'securities', label: 'Securities', series: 3, kind: 'bar' },
  { key: 'users', label: 'Users', series: 1, kind: 'line' },
]

/** Figma Type=Line: monthly disbursement vs pledged amount, in rupees. */
const months = ["May'23", "Jun'23", "Jul'23", "Aug'23", "Sep'23", "Oct'23", "Nov'23", "Dec'23", "Jan'24", "Feb'24", "Mar'24", "Apr'24", "May'24"]
const disbursed = [0.35, 1.05, 0.5, 0.35, 0.9, 1.0, 0.5, 0.35, 1.05, 0.6, 0.9, 0.7, 1.05]
const pledged = [0.9, 1.6, 1.4, 0.7, 1.75, 1.6, 0.9, 0.7, 1.6, 1.15, 1.6, 1.4, 1.4]
export const monthlyLending = months.map((month, i) => ({ month, disbursed: disbursed[i] * 1e5, pledged: pledged[i] * 1e5 }))
export const monthlyLendingSeries: ChartSeriesConfig[] = [
  { key: 'disbursed', label: 'Disbursement', series: 2 },
  { key: 'pledged', label: 'Pledged', series: 3 },
]
