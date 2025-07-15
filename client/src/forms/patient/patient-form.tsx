import { toast } from 'sonner';
import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '@/forms/patient/schema.ts';
import { Button } from '@/components/ui/button.tsx'
import { Form } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx'
import { DatePicker } from '@/components/ui/date-picker.tsx';
import { Field } from '@/components/ui/field.tsx';
import { getErrorMessage } from '@/lib/get-error-message.ts';

type PatientFormProps = {
  closeModal: () => void,
  handleSubmit: (data: z.infer<typeof formSchema>) => Promise<void>,
  initialValues?: z.infer<typeof formSchema>
}

const defaultValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phoneNumber: '',
  email: ''
}

export const PatientForm = ({
  closeModal,
  handleSubmit,
  initialValues = defaultValues
}: PatientFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {...defaultValues, ...initialValues}
  })
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    handleSubmit(data)
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        toast(getErrorMessage(error))
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={ form.handleSubmit(onSubmit) } className='mt-6 flex flex-col gap-6'>
        <Field control={form.control} name='firstName' label='Имя'>
          <Input />
        </Field>
        <Field control={form.control} name='lastName' label='Фамилия'>
          <Input />
        </Field>
        <Field control={form.control} name='dateOfBirth' label='Дата рождения'>
          <DatePicker disabled={{ after: new Date() }} placeholder='Выберите дату рождения' />
        </Field>
        <Field control={form.control} name='phoneNumber' label='Номер телефона'>
          <Input />
        </Field>
        <Field control={form.control} name='email' label='E-mail'>
          <Input />
        </Field>
        <Button type='submit' className='w-min self-end cursor-pointer'>Сохранить</Button>
      </form>
    </Form>
  )
}
