import { Panel, PanelClose, type PanelProps } from './Panel'

export interface SheetProps extends PanelProps {
  /** Figma Side. Default "right". */
  side?: 'right' | 'left'
}

/** Side panel for a task such as a form (Figma "Sheet", 420 wide). Footer buttons sit bottom-right. */
export function Sheet({ side = 'right', ...props }: SheetProps) {
  return <Panel {...props} side={side} width="w-[420px]" gap="gap-6" footerClass="justify-end" />
}

export const SheetClose = PanelClose
