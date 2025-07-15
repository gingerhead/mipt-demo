import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DayPicker, type PropsSingle } from 'react-day-picker';
import { type ComponentProps, memo, useState } from 'react';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';

type IDatePicker = ComponentProps<typeof DayPicker> & Pick<Partial<ControllerRenderProps<FieldValues, string>>, 'value' | 'onChange'> & {
  placeholder?: string
}

export const DatePicker = memo(({value, onChange, placeholder, ...rest}: IDatePicker) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((old) => !old);
  const onSelect: PropsSingle['onSelect'] = (data) => {
    setIsOpen(false);
    if (typeof onChange !== 'undefined' && typeof data !== 'undefined') {
      onChange(data.toISOString());
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild onClick={() => toggle()}>
        <Button
          variant='outline'
          data-empty={!value}
          className='data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal w-full'
        >
          <CalendarIcon />
          {value ? new Date(value).toLocaleDateString() : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar {...rest} mode='single' selected={value} onSelect={onSelect} captionLayout='dropdown' />
      </PopoverContent>
    </Popover>
  )
})
