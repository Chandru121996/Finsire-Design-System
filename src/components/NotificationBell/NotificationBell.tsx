import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Icon, type IconStyle } from '../Icon/Icon'

export interface NotificationBellProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Unread count. 0 or undefined shows no number; above 99 shows "99+". */
  count?: number
  /** Show a small dot instead of a number (Figma Count=Dot). */
  dot?: boolean
  iconStyle?: IconStyle
  /** Screen reader label. The count is added automatically. */
  label?: string
}

// Badge left offsets from Figma for 1 digit, 2 digits and "99+".
const badgeOffset = ['left-[23px]', 'left-[19px]', 'left-[9px]']

export function NotificationBell({
  count,
  dot = false,
  iconStyle = 'outlined',
  label = 'Notifications',
  className,
  type = 'button',
  ...props
}: NotificationBellProps) {
  const text = count && count > 0 ? (count > 99 ? '99+' : String(count)) : undefined
  return (
    <button
      type={type}
      aria-label={text ? `${label}, ${text} unread` : label}
      className={cn(
        'relative inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-interaction-hover',
        'outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2',
        iconStyle === 'filled' ? 'text-text-primary' : 'text-text-secondary',
        className,
      )}
      {...props}
    >
      <Icon name="notifications" size={24} iconStyle={iconStyle} />
      {text ? (
        <span
          className={cn(
            'absolute top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-surface-base bg-error-default px-1',
            'text-label-small leading-[14px] text-error-on-default tabular-nums',
            badgeOffset[Math.min(text.length, 3) - 1],
          )}
        >
          {text}
        </span>
      ) : (
        dot && (
          <span className="absolute top-[5px] left-[25px] size-[10px] rounded-full border-2 border-surface-base bg-error-default" />
        )
      )}
    </button>
  )
}
