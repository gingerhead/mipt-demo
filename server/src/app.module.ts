import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { PatientsService } from './modules/patients/patients.service';
import { VisitsService } from './modules/visits/visits.service';
import { PatientsController } from './modules/patients/patients.controller';
import { VisitsController } from './modules/visits/visits.controller';

@Module({
  imports: [],
  controllers: [AppController, PatientsController, VisitsController],
  providers: [AppService, PrismaService, PatientsService, VisitsService],
})
export class AppModule {}
