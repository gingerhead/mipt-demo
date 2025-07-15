import { Patient as PatientModel } from '@prisma/client';
import { Visit as VisitEntity } from '../visits/visit.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class Patient implements PatientModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  dateOfBirth: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
  phoneNumber: string;

  @ApiProperty({ type: String, required: false, nullable: true })
  @IsOptional()
  @IsEmail()
  email: string | null;

  @ApiProperty({ required: false, type: () => [VisitEntity] })
  visits?: VisitEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
