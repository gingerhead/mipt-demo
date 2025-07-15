import { OmitType } from '@nestjs/swagger';
import { Visit as VisitEntity } from '../visit.entity';

export class CreateVisitDto extends OmitType(VisitEntity, [
  'id',
  'createdAt',
  'updatedAt',
  'patient',
] as const) {}
