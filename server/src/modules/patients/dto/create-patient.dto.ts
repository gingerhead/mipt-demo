import { OmitType } from '@nestjs/swagger';
import { Patient as PatientEntity } from '../patient.entity';

export class CreatePatientDto extends OmitType(PatientEntity, [
  'id',
  'createdAt',
  'updatedAt',
  'visits',
] as const) {}
