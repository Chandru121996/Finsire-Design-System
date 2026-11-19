import type { ReactNode } from 'react'
import type { FieldStatus } from '../components/Field/Field'

// The seven Figma field states (Input, Textarea). render() receives the props for each state.
export interface FieldStateProps {
  status?: FieldStatus
  filled: boolean
  disabled?: boolean
  helperText: string
}

const fieldStates: { name: string; force?: string; props: FieldStateProps }[] = [
  { name: 'Default', props: { filled: false, helperText: 'Helper text' } },
  { name: 'Hover', force: 'hover', props: { filled: false, helperText: 'Helper text' } },
  { name: 'Focus', force: 'focus-visible', props: { filled: false, helperText: 'Helper text' } },
  { name: 'Filled', props: { filled: true, helperText: 'Helper text' } },
  { name: 'Error', props: { filled: true, status: 'error', helperText: 'Enter an amount below ₹ 50,00,000' } },
  { name: 'Success', props: { filled: true, status: 'success', helperText: 'Looks good' } },
  { name: 'Disabled', props: { filled: false, disabled: true, helperText: 'Helper text' } },
]

export function FieldStates({ render }: { render: (props: FieldStateProps) => ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(3,320px)] gap-x-8 gap-y-6">
      {fieldStates.map(state => (
        <div key={state.name} className="flex flex-col gap-2">
          <span className="text-label-small text-text-tertiary">{state.name}</span>
          <div data-force-state={state.force}>{render(state.props)}</div>
        </div>
      ))}
    </div>
  )
}
