/** Example rows matching the Figma "Data table". Handy for stories and reference screens. */
export interface Transaction {
  id: string
  name: string
  initials: string
  status: 'completed' | 'pending' | 'failed'
  date: Date
  /** Negative = money out, positive = money in. */
  amount: number
}

const base: Omit<Transaction, 'id'>[] = [
  { name: 'Anita Rao', initials: 'AR', status: 'completed', date: new Date(2026, 10, 3), amount: -12500 },
  { name: 'Rahul Mehta', initials: 'RM', status: 'pending', date: new Date(2026, 10, 2), amount: 3200 },
  { name: 'Priya Nair', initials: 'PN', status: 'completed', date: new Date(2026, 10, 1), amount: -480 },
  { name: 'Acme Payroll', initials: 'AP', status: 'completed', date: new Date(2026, 9, 31), amount: 240000 },
  { name: 'Electricity Board', initials: 'EB', status: 'failed', date: new Date(2026, 9, 30), amount: -9640 },
  { name: 'Vikram Singh', initials: 'VS', status: 'completed', date: new Date(2026, 9, 28), amount: -115000 },
]

/** 60 rows: the six Figma rows repeated with earlier dates, so pagination has something to do. */
export const sampleTransactions: Transaction[] = Array.from({ length: 60 }, (_, i) => {
  const row = base[i % base.length]
  const date = new Date(row.date)
  date.setDate(date.getDate() - Math.floor(i / base.length) * 7)
  return { ...row, id: `TXN-${48213 - i * 7}`, date }
})
