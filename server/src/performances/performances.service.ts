import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';
import { ReservationTimeModel } from 'src/reservation-times';

import { FindPerformanceById, PerformanceModel } from '.';
import { CreatePerformanceInput, FindPerformanceArgs, UpdatePerformanceInput } from './dtos';

@Injectable()
export class PerformancesService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(data: CreatePerformanceInput): Promise<PerformanceModel> {
    return this.prismaService.performance.create({ data });
  }

  public async read(id: string): Promise<FindPerformanceById | null> {
    return this.prismaService.performance.findUnique({
      where: { id },
      include: {
        stories: { orderBy: { id: 'desc' } },
        artist: { include: { _count: { select: { performances: true } } } },
        reservationTimes: { orderBy: { toReserveAt: 'asc' } },
      },
    });
  }

  public async readWithReservationTime(id: string): Promise<ReservationTimeModel[]> {
    return this.prismaService.performance.findUnique({ where: { id } }).reservationTimes();
  }

  public async find(args: FindPerformanceArgs): Promise<PerformanceModel[]> {
    return this.prismaService.performance.findMany({
      where: args,
      include: { artist: true, reservationTimes: true },
    });
  }

  public async findPopularPerformances(): Promise<PerformanceModel[]> {
    return this.prismaService.performance.findMany({
      include: { artist: true, reservationTimes: true },
      where: { fundingStatus: 'PROGRESS' },
      orderBy: { cheerCount: 'desc' },
      take: 3,
    });
  }

  public async update(id: string, performance: UpdatePerformanceInput): Promise<PerformanceModel> {
    try {
      return await this.prismaService.performance.update({
        data: {
          ...performance,
          id: undefined,
        },
        where: { id },
      });
    } catch (error) {
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error instanceof PrismaClientKnownRequestError && error.code === PrismaError.RECORD_DOES_NOT_EXIST) {
        throw new NotFoundException('post with id not found');
      }
      throw error;
    }
  }

  public async remove(id: string): Promise<boolean> {
    const result = await this.prismaService.performance.delete({ where: { id } });

    return !!result;
  }
}
