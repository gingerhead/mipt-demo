import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import type { ComponentProps } from 'react';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';

type IFormSelect = ComponentProps<typeof Select> & Pick<Partial<ControllerRenderProps<FieldValues, string>>, 'value' | 'onChange'> & {
  options: Record<string, string>
}

export const FormSelect = ({ value, onChange, options}: IFormSelect) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-full">
        { Object.entries(options).map(([id, name]) => (
          <SelectItem value={id} key={id}>{name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
