// Story helpers for showing Figma's State variants (Hover, Pressed, Focus ...) side by side.
// Wrap a component in <span {...forceState(state)}> to display that state without the mouse.
export type ForcedState = 'hover' | 'active' | 'focus-visible'

export interface StoryState {
  name: string
  force?: ForcedState
  disabled?: boolean
}

export const interactiveStates: StoryState[] = [
  { name: 'Default' },
  { name: 'Hover', force: 'hover' },
  { name: 'Pressed', force: 'active' },
  { name: 'Focus', force: 'focus-visible' },
  { name: 'Disabled', disabled: true },
]

export const forceState = (state: StoryState) => ({ 'data-force-state': state.force })
