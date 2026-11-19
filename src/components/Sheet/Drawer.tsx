import { Panel, PanelClose, type PanelProps } from './Panel'

export interface DrawerProps extends PanelProps {
  /**
   * Figma Side.
   * - right: details of one item, 360 wide, full-width stacked buttons.
   * - left: mobile menu, 320 wide.
   * - bottom: pick-list on small screens, 390 wide with a drag handle, height fits the content.
   */
  side?: 'right' | 'left' | 'bottom'
}

export function Drawer({ side = 'right', ...props }: DrawerProps) {
  return (
    <Panel
      {...props}
      side={side}
      width={side === 'left' ? 'w-[320px]' : 'w-[360px]'}
      gap={side === 'left' ? 'gap-4' : 'gap-6'}
      footerClass="flex-col [&>*]:w-full"
    />
  )
}

export const DrawerClose = PanelClose
