import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Query,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiQuery,
} from '@nestjs/swagger';
import { Patient as PatientModel } from '@prisma/client';
import { Patient as PatientEntity } from './patient.entity';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { PaginatedPatientOutput } from './dto/paginated-patient-output.dto';

@Controller()
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}

  @Get('patients')
  @ApiPaginatedResponse(PaginatedPatientOutput)
  async getPatients(
    @Query('page') page?: number,
  ): Promise<PaginatedPatientOutput> {
    return this.patientService.patients({
      orderBy: { createdAt: 'desc' },
      page,
    });
  }

  @Get('patients/all')
  @ApiOkResponse({ type: PatientEntity, isArray: true })
  async getAllPatients(): Promise<PatientEntity[]> {
    return this.patientService.all({
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post('patients')
  @ApiCreatedResponse({ type: PatientEntity })
  @ApiBadRequestResponse({ description: 'Not found' })
  async createPatient(
    @Body()
    createPatientDto: CreatePatientDto,
  ): Promise<PatientModel> {
    return this.patientService.createPatient(createPatientDto);
  }

  @ApiQuery({ name: 'page', required: false, type: Number })
  @Get('patients/search/:searchString')
  @ApiPaginatedResponse(PaginatedPatientOutput)
  async getFilteredPatients(
    @Param('searchString') searchString: string,
    @Query('page') page?: number,
  ): Promise<PaginatedPatientOutput> {
    const preparedSearch = searchString.split(' ').join(' | ');
    return this.patientService.patients({
      where: {
        OR: [
          {
            firstName: { search: preparedSearch },
          },
          {
            lastName: { search: preparedSearch },
          },
          {
            firstName: {
              contains: searchString,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: searchString,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      page,
    });
  }

  @Get('patients/:id')
  @ApiOkResponse({ type: PatientEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async getPatientById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PatientModel> {
    const patient = await this.patientService.patient({ id });
    if (!patient) {
      throw new NotFoundException('Invalid user');
    }
    return patient;
  }

  @Put('patients/:id')
  @ApiOkResponse({ type: PatientEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async updatePatient(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<PatientModel> {
    return this.patientService.updatePatient({
      where: { id },
      data: updatePatientDto,
    });
  }

  @Delete('patients/:id')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not found' })
  async deletePatient(@Param('id') id: string): Promise<PatientModel> {
    return this.patientService.deletePatient({ id });
  }
}
