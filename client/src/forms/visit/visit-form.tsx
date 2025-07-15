import { toast } from 'sonner';
import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './schema.ts';
import { Button } from '@/components/ui/button.tsx'
import { Form } from '@/components/ui/form.tsx';
import { DatePicker } from '@/components/ui/date-picker.tsx';
import { Field } from '@/components/ui/field.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { usePatientsStore } from '@/stores/patients.ts';
import { FormSelect } from '@/components/ui/form-select.tsx';
import { VisitStatus } from '../../../api/__generated__/types';
import { getErrorMessage } from '@/lib/get-error-message.ts';

type VisitFormProps = {
  closeModal: () => void,
  handleSubmit: (data: z.infer<typeof formSchema>) => Promise<void>,
  initialValues?: z.infer<typeof formSchema>
}

const defaultValues: z.infer<typeof formSchema> = {
  patientId: '',
  visitDate: '',
  diagnosis: '',
  treatment: '',
  status: 'SCHEDULED',
  notes: ''
}

export const VisitForm = ({
  closeModal,
  handleSubmit,
  initialValues = defaultValues
}: VisitFormProps) => {
  const patientsObject = usePatientsStore((state) => state.patients);
  const patientsOptions: Record<string, string> = Object.fromEntries(
    Object.values(patientsObject).map((patient) =>
      [patient.id, `${patient.firstName} ${patient.lastName}`]
    )
  )
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
        <Field control={form.control} name='visitDate' label='Дата посещения'>
          <DatePicker disabled={{ before: new Date() }} placeholder='Выберите дату посещения' />
        </Field>
        <Field control={form.control} name='patientId' label='Пациент'>
          <FormSelect options={patientsOptions} />
        </Field>
        <Field control={form.control} name='status' label='Статус'>
          <FormSelect options={VisitStatus} />
        </Field>
        <Field control={form.control} name='diagnosis' label='Диагноз'>
          <Textarea />
        </Field>
        <Field control={form.control} name='treatment' label='Назначение'>
          <Textarea />
        </Field>
        <Field control={form.control} name='notes' label='Комментарий'>
          <Textarea />
        </Field>
        <Button type='submit' className='w-min self-end cursor-pointer'>Сохранить</Button>
      </form>
    </Form>
  )
}
