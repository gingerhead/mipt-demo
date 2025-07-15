import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Patient, Prisma } from '@prisma/client';
import { PaginatedResult, paginator } from '../common/paginator';

const paginate = paginator<Patient>({ perPage: 10 });

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async patient(
    patientWhereUniqueInput: Prisma.PatientWhereUniqueInput,
  ): Promise<Patient | null> {
    return this.prisma.patient.findUnique({
      where: patientWhereUniqueInput,
      include: {
        visits: true,
      },
    });
  }

  async patients(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PatientWhereUniqueInput;
    where?: Prisma.PatientWhereInput;
    orderBy?: Prisma.PatientOrderByWithRelationInput;
    page?: number;
  }): Promise<PaginatedResult<Patient>> {
    const { skip, take, cursor, where, orderBy, page } = params;
    return paginate(
      this.prisma.patient,
      {
        skip,
        take,
        cursor,
        where,
        orderBy,
      },
      {
        page,
      },
    );
  }

  async all(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PatientWhereUniqueInput;
    where?: Prisma.PatientWhereInput;
    orderBy?: Prisma.PatientOrderByWithRelationInput;
  }): Promise<Patient[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.patient.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPatient(data: Prisma.PatientCreateInput): Promise<Patient> {
    return this.prisma.patient.create({
      data,
    });
  }

  async updatePatient(params: {
    where: Prisma.PatientWhereUniqueInput;
    data: Prisma.PatientUpdateInput;
  }): Promise<Patient> {
    const { where, data } = params;
    return this.prisma.patient.update({
      data,
      where,
    });
  }

  async deletePatient(where: Prisma.PatientWhereUniqueInput): Promise<Patient> {
    return this.prisma.patient.delete({
      where,
    });
  }
}
