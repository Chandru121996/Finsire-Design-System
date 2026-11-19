import type { ComponentProps } from 'react'
import { DayPicker } from 'react-day-picker'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

export type CalendarProps = ComponentProps<typeof DayPicker>

const navButton =
  'flex size-8 cursor-pointer items-center justify-center rounded-md border border-border-strong text-text-primary hover:bg-interaction-hover outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2 disabled:pointer-events-none disabled:text-disabled-foreground'

/**
 * Month view built from Figma "Calendar day" cells (Default, Hover, Selected, Today, Outside, Disabled).
 * Pass mode="single" with selected / onSelect for one date.
 */
export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      navLayout="around"
      weekStartsOn={0}
      formatters={{ formatWeekdayName: date => date.toLocaleDateString('en-IN', { weekday: 'short' }).slice(0, 2) }}
      className={cn('w-fit rounded-lg border border-border-default bg-surface-overlay p-4', className)}
      classNames={{
        months: 'flex flex-col',
        month: 'grid grid-cols-[32px_1fr_32px] items-center gap-y-2',
        month_caption: 'col-start-2 row-start-1 flex justify-center',
        caption_label: 'text-label-base text-text-primary',
        button_previous: cn(navButton, 'col-start-1 row-start-1'),
        button_next: cn(navButton, 'col-start-3 row-start-1'),
        month_grid: 'col-span-3 border-collapse',
        weekdays: 'flex',
        weekday: 'flex h-[28px] w-10 items-center justify-center text-label-small text-text-secondary',
        week: 'flex',
        day: 'p-0 text-body-small text-text-primary',
        day_button: cn(
          'flex size-10 cursor-pointer items-center justify-center rounded-md hover:bg-interaction-hover',
          'outline-border-focus focus-visible:outline-2 focus-visible:-outline-offset-2',
        ),
        today: '[&>button]:bg-primary-container [&>button]:text-primary-on-container',
        selected:
          'text-label-base [&&>button]:bg-primary-default [&&>button]:text-primary-on-default [&&>button]:hover:bg-primary-hover',
        outside: 'text-text-tertiary',
        disabled: 'text-disabled-foreground [&>button]:pointer-events-none',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => <Icon name={orientation === 'left' ? 'chevron_left' : 'chevron_right'} size={20} />,
      }}
      {...props}
    />
  )
}
