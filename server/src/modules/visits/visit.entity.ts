import { Visit as VisitModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNotEmpty, IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Patient as PatientEntity } from '../patients/patient.entity';

export enum VisitStatus {
  SCHEDULED = 'SCHEDULED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export class Visit implements VisitModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  visitDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  diagnosis: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  treatment: string;

  @ApiProperty({ enum: VisitStatus, enumName: 'VisitStatus' })
  status: VisitStatus;

  @ApiProperty({ type: String, required: false, nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(1024)
  notes: string | null;

  @ApiProperty()
  patientId: string;

  @ApiProperty({ required: false, type: () => PatientEntity })
  patient?: PatientEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
