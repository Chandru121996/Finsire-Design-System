import type { Meta, StoryObj } from '@storybook/react-vite'
import { leaves, tokens } from './tokens'

const meta: Meta = { title: 'Foundations/Typography', parameters: { layout: 'padded' } }
export default meta

type Style = { fontSize: string; fontWeight: string; lineHeight: string; letterSpacing: string }
const sizes = tokens['font-size'] as Record<string, { $value: string }>
const weights = tokens['font-weight'] as Record<string, { $value: number }>
const lookup = (ref: string) => {
  const [group, key] = ref.slice(1, -1).split('.')
  return String((group === 'font-size' ? sizes : weights)[key].$value)
}

export const TextStyles: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6">
      {leaves(tokens.typography).map(([segments, token]) => {
        const style = token.$value as Style
        const className = `text-${segments.join('-')}`
        return (
          <div key={className} className="flex flex-col gap-1 border-b border-border-default pb-4">
            <div className={className}>Loan outstanding ₹ 12,11,026 · 4.2 Cr</div>
            <div className="text-body-xsmall text-text-tertiary">
              {segments.map(s => s[0].toUpperCase() + s.slice(1)).join(' / ')} · class "{className}" ·{' '}
              {lookup(style.fontSize)} / {style.lineHeight} · weight {lookup(style.fontWeight)}
            </div>
          </div>
        )
      })}
    </div>
  ),
}

export const TabularNumbers: StoryObj = {
  render: () => (
    <div className="flex gap-12 text-body-base">
      <div>
        <div className="text-label-small text-text-tertiary">Default</div>
        <div>₹ 11,11,111</div>
        <div>₹ 98,76,543</div>
      </div>
      <div className="tabular-nums">
        <div className="text-label-small text-text-tertiary">tabular-nums (use for money)</div>
        <div>₹ 11,11,111</div>
        <div>₹ 98,76,543</div>
      </div>
    </div>
  ),
}
