import { z } from 'zod'

// best we could do here without using extensive libraries with phone validation
// consider to use single ZOD schema for both Nest and frontend

const validPhoneNumberRE = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

export const formSchema = z.object({
  firstName: z.string().min(1, { message: 'Длина должна быть не менее 1 символа'}).max(256, { message: 'Длина должна быть не более 256 символа'}),
  lastName: z.string().min(1, { message: 'Длина должна быть не менее 1 символа'}).max(256, { message: 'Длина должна быть не более 256 символа'}),
  dateOfBirth: z.iso.datetime({ message: 'Пожалуйста, заполните дату рождения' }),
  phoneNumber: z.string().refine((value) => validPhoneNumberRE.test(value ?? ""), 'Пожалуйста, заполните номер телефона'),
  email: z.string().nullish().transform( value => value === '' ? null : value ).pipe(z.email({ message: 'Пожалуйста, введите E-mail в формате xxx@yyy.zz' }).nullish())
})
