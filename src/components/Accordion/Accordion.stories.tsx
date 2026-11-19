import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionItem } from './Accordion'

const meta = { title: 'Components/Accordion', component: Accordion, args: { type: 'single' } } satisfies Meta<typeof Accordion>
export default meta
type Story = StoryObj<typeof meta>

/** Figma "Accordion": first item open. Click a question to open it. */
export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="protected" className="w-[480px]">
      <AccordionItem value="protected" title="Is my money protected?">
        Yes. Funds are held in segregated accounts with partner banks and every transfer is protected with two-factor authentication.
      </AccordionItem>
      <AccordionItem value="time" title="How long do transfers take?">Most transfers reach the account within 30 minutes on working days.</AccordionItem>
      <AccordionItem value="team" title="Can I add team members?">Yes. Admins can invite members from Settings › Team.</AccordionItem>
    </Accordion>
  ),
}

/** Figma "Accordion item": Closed, Hover, Open. */
export const ItemStates: Story = {
  render: () => (
    <div className="flex w-[480px] flex-col gap-6">
      <Accordion type="single" collapsible><AccordionItem value="a" title="Is my money protected? (closed)">Answer</AccordionItem></Accordion>
      <div data-force-state="hover"><Accordion type="single" collapsible><AccordionItem value="a" title="Is my money protected? (hover)">Answer</AccordionItem></Accordion></div>
      <Accordion type="single" collapsible defaultValue="a">
        <AccordionItem value="a" title="Is my money protected? (open)">
          Yes. Funds are held in segregated accounts with partner banks and every transfer is protected with two-factor authentication.
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
