import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Visit as VisitModel } from '@prisma/client';
import { Visit as VisitEntity } from './visit.entity';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Controller()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get('visits')
  @ApiOkResponse({ type: VisitEntity, isArray: true })
  async getVisits(): Promise<VisitModel[]> {
    return this.visitsService.visits({ orderBy: { visitDate: 'desc' } });
  }

  @Post('visits')
  @ApiCreatedResponse({ type: VisitEntity })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async createVisit(
    @Body()
    createVisitDto: CreateVisitDto,
  ): Promise<VisitModel> {
    const { patientId, ...data } = createVisitDto;
    return this.visitsService.createVisit({
      ...data,
      patient: {
        connect: { id: patientId },
      },
    });
  }

  @Get('visits/:id')
  @ApiOkResponse({ type: VisitEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  async getVisitById(@Param('id') id: string): Promise<VisitModel | null> {
    return this.visitsService.visit({ id });
  }

  @Put('visits/:id')
  @ApiOkResponse({ type: VisitEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async updateVisit(
    @Param('id') id: string,
    @Body() updateVisitDto: UpdateVisitDto,
  ): Promise<VisitModel> {
    const { patientId, ...data } = updateVisitDto;

    return this.visitsService.updateVisit({
      where: { id },
      data: {
        ...data,
        patient: {
          connect: {
            id: patientId,
          },
        },
      },
    });
  }

  @Delete('visits/:id')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not found' })
  async deleteVisit(@Param('id') id: string): Promise<VisitModel> {
    return this.visitsService.deleteVisit({ id });
  }

  @Get('patients/:id/visits')
  @ApiOkResponse({ type: VisitEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Not found' })
  async getVisitsByPatientId(@Param('id') id: string): Promise<VisitModel[]> {
    return this.visitsService.visits({ where: { patientId: { equals: id } } });
  }
}
