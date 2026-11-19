import type { Meta, StoryObj } from '@storybook/react-vite'
import { cssVar, leaves, tokens } from './tokens'

const meta: Meta = { title: 'Foundations/Shadows', parameters: { layout: 'padded' } }
export default meta

export const Elevation: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-4">
      {leaves(tokens.shadow, ['shadow']).map(([segments]) => (
        <div key={segments.join('-')} className="flex flex-col items-center gap-3">
          <div className="size-[96px] rounded-lg bg-surface-raised" style={{ boxShadow: `var(${cssVar(segments)})` }} />
          <div className="text-label-small">shadow-{segments[1]}</div>
        </div>
      ))}
    </div>
  ),
}
