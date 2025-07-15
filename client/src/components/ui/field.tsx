import { Children, cloneElement, type ReactElement } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';

type IFormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  label: string,
  children: ReactElement<ControllerRenderProps<FieldValues, string>>
} & UseControllerProps<TFieldValues, TName>

export const Field = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
({ name, control, label, children }: IFormField<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{ label }</FormLabel>
          <FormControl>
            { Children.only(cloneElement(children, field)) }
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
