import type { Meta, StoryObj } from '@storybook/react-vite'
import { cssVar, leaves, tokens } from './tokens'

const meta: Meta = { title: 'Foundations/Radius', parameters: { layout: 'padded' } }
export default meta

export const Scale: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {leaves(tokens.radius, ['radius']).map(([segments, token]) => (
        <div key={segments.join('-')} className="flex flex-col items-center gap-2">
          <div
            className="size-16 border border-primary-default bg-primary-container"
            style={{ borderRadius: `var(${cssVar(segments)})` }}
          />
          <div className="text-label-small">rounded-{segments[1]}</div>
          <div className="text-body-xsmall text-text-tertiary">{String(token.$value)}</div>
        </div>
      ))}
    </div>
  ),
}
