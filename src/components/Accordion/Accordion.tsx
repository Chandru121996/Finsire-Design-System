import type { ComponentProps, ReactNode } from 'react'
import { Accordion as RadixAccordion } from 'radix-ui'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

type AccordionProps = ComponentProps<typeof RadixAccordion.Root>

/** List of questions or sections that open one at a time (type="single") or many (type="multiple"). */
export function Accordion({ className, ...props }: AccordionProps) {
  return <RadixAccordion.Root className={cn('flex w-full flex-col', className)} {...props} />
}

export interface AccordionItemProps extends Omit<ComponentProps<typeof RadixAccordion.Item>, 'title'> {
  title: ReactNode
}

/** Figma "Accordion item": Closed, Hover, Open. */
export function AccordionItem({ title, children, className, ...props }: AccordionItemProps) {
  return (
    <RadixAccordion.Item className={cn('border-b border-border-default', className)} {...props}>
      <RadixAccordion.Header className="flex">
        <RadixAccordion.Trigger
          className={cn(
            'group flex flex-1 cursor-pointer items-center justify-between gap-4 py-4 text-left text-label-base text-text-primary',
            'hover:underline outline-border-focus focus-visible:outline-2 focus-visible:outline-offset-2',
          )}
        >
          {title}
          <Icon name="expand_more" size={20} className="text-text-secondary transition-transform group-data-[state=open]:rotate-180" />
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="pb-4 text-body-small text-text-secondary">{children}</RadixAccordion.Content>
    </RadixAccordion.Item>
  )
}
