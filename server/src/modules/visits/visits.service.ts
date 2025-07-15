import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Visit, Prisma } from '@prisma/client';

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) {}

  async visit(
    visitWhereUniqueInput: Prisma.VisitWhereUniqueInput,
  ): Promise<Visit | null> {
    return this.prisma.visit.findUnique({
      where: visitWhereUniqueInput,
      include: {
        patient: true,
      },
    });
  }

  async visits(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VisitWhereUniqueInput;
    where?: Prisma.VisitWhereInput;
    orderBy?: Prisma.VisitOrderByWithRelationInput;
  }): Promise<Visit[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.visit.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        patient: true,
      },
    });
  }

  async createVisit(data: Prisma.VisitCreateInput): Promise<Visit> {
    return this.prisma.visit.create({
      data,
      include: {
        patient: true,
      },
    });
  }

  async updateVisit(params: {
    where: Prisma.VisitWhereUniqueInput;
    data: Prisma.VisitUpdateInput;
  }): Promise<Visit> {
    const { data, where } = params;
    return this.prisma.visit.update({
      data,
      where,
      include: {
        patient: true,
      },
    });
  }

  async deleteVisit(where: Prisma.VisitWhereUniqueInput): Promise<Visit> {
    return this.prisma.visit.delete({
      where,
    });
  }
}
