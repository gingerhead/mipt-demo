import { z } from 'zod'
import { VisitStatus } from '../../../api/__generated__/types';

export const formSchema = z.object({
  patientId: z.uuidv7(),
  visitDate: z.iso.datetime({ message: 'Пожалуйста, заполните дату и время посещения' }),
  diagnosis: z.string().min(1, { message: 'Длина должна быть не менее 1 символа'}).max(1024, { message: 'Длина должна быть не более 1024 символов'}),
  treatment: z.string().min(1, { message: 'Длина должна быть не менее 1 символа'}).max(1024, { message: 'Длина должна быть не более 1024 символов'}),
  status: z.enum(VisitStatus),
  notes: z.string().nullish().transform( value => value === '' ? null : value ).pipe(z.string().min(1, { message: 'Длина должна быть не менее 1 символа'}).max(1024, { message: 'Длина должна быть не более 1024 символов'}).nullish())
})
