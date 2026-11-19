// Formatting helpers for Indian finance data. All use Indian digit grouping (12,11,026).
const NBSP = ' '

export interface FormatINROptions {
  /** Decimal places. Default 2. */
  decimals?: number
  /** Show "+" for positive amounts (for credits and debits). Default false. */
  signed?: boolean
}

/** ₹12,11,026.00 (negative: −₹12,500.00). */
export function formatINR(amount: number, { decimals = 2, signed = false }: FormatINROptions = {}) {
  const digits = Math.abs(amount).toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  const sign = amount < 0 ? '−' : signed && amount > 0 ? '+' : ''
  return `${sign}₹${digits}`
}

/** Short amounts for cards and charts: ₹224 Cr, ₹3.4 L, ₹45,000. A crore is 1,00,00,000 and a lakh is 1,00,000. */
export function formatINRCompact(amount: number, decimals = 1) {
  const abs = Math.abs(amount)
  const sign = amount < 0 ? '−' : ''
  const trim = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: decimals })
  if (abs >= 1e7) return `${sign}₹${trim(abs / 1e7)}${NBSP}Cr`
  if (abs >= 1e5) return `${sign}₹${trim(abs / 1e5)}${NBSP}L`
  return `${sign}₹${abs.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

/** 12,11,026 */
export const formatNumberIN = (value: number, decimals = 0) =>
  value.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

/** 3 Nov 2026 */
export const formatDateIN = (date: Date) => date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
