import type { Meta, StoryObj } from '@storybook/react-vite'
import { cssVar, leaves, resolveHex, tokens } from './tokens'

const meta: Meta = { title: 'Foundations/Colors', parameters: { layout: 'padded' } }
export default meta

function Swatch({ name, variable, note }: { name: string; variable: string; note: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-10 shrink-0 rounded-md border border-border-default"
        style={{ background: `var(${variable})` }}
      />
      <div className="min-w-0">
        <div className="text-label-base">{name}</div>
        <div className="truncate text-body-xsmall text-text-tertiary">{variable}</div>
        <div className="text-body-xsmall text-text-tertiary">{note}</div>
      </div>
    </div>
  )
}

export const Semantic: StoryObj = {
  render: () => {
    const groups = Object.entries(tokens.color)
    return (
      <div className="flex flex-col gap-8">
        <p className="text-body-small text-text-secondary">
          Components use these. Switch Light / Dark in the toolbar (paintbrush icon) to see both modes.
        </p>
        {groups.map(([group, values]) => (
          <section key={group} className="flex flex-col gap-3">
            <h2 className="text-heading-h5 capitalize">{group}</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
              {leaves(values, ['color', group]).map(([segments, token]) => (
                <Swatch
                  key={segments.join('/')}
                  name={segments.slice(1).join('/')}
                  variable={cssVar(segments)}
                  note={`Light ${resolveHex(String(token.$value))} · Dark ${resolveHex(token.$extensions?.modes?.dark ?? '')}`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    )
  },
}

export const Palette: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-body-small text-text-secondary">Primitives. Reference only: never use these directly in components.</p>
      {Object.entries(tokens.palette).map(([family, steps]) => (
        <section key={family} className="flex flex-col gap-2">
          <h2 className="text-heading-h5 capitalize">{family}</h2>
          <div className="flex flex-wrap gap-2">
            {leaves(steps, ['palette', family]).map(([segments, token]) => (
              <div key={segments.join('-')} className="flex w-[80px] flex-col gap-1">
                <div className="h-12 rounded-md border border-border-default" style={{ background: `var(${cssVar(segments)})` }} />
                <div className="text-label-small">{segments.at(-1)}</div>
                <div className="text-body-xsmall text-text-tertiary">{String(token.$value)}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}
