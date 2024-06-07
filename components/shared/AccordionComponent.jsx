'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Text from './Text'

export function AccordionComponent({ children, title, icon: Icon, ...props }) {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='flex w-full items-center gap-3' {...props}>
          {Icon}
          <Text className={'flex w-full items-center'}>{title}</Text>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
