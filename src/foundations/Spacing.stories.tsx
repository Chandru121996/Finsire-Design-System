import type { Meta, StoryObj } from '@storybook/react-vite'
import { cssVar, leaves, tokens } from './tokens'

const meta: Meta = { title: 'Foundations/Spacing', parameters: { layout: 'padded' } }
export default meta

export const Scale: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3">
      {leaves(tokens.spacing, ['spacing']).map(([segments, token]) => (
        <div key={segments.join('-')} className="flex items-center gap-4">
          <div className="w-[160px] text-label-base">
            spacing/{segments[1]} <span className="text-text-tertiary">· {String(token.$value)}</span>
          </div>
          <div className="h-4 rounded-sm bg-primary-default" style={{ width: `var(${cssVar(segments)})` }} />
        </div>
      ))}
    </div>
  ),
}
