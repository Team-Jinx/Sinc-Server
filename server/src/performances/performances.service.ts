import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';
import { ReservationTimeModel } from 'src/reservation-times';

import { FindPerformanceById, PerformanceModel } from '.';
import { CreatePerformanceInput, FindPerformanceArgs, UpdatePerformanceInput } from './dtos';
import { Status } from '.prisma/client';

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
    const { skip, take, keyword, ...where } = args;

    return this.prismaService.performance.findMany({
      where: {
        ...where,
        ...(keyword && {
          OR: [
            {
              title: { contains: keyword },
            },
            {
              artist: { agency: { contains: keyword } },
            },
            {
              artist: { name: { contains: keyword } },
            },
          ],
        }),
      },
      skip,
      take,
      orderBy: { toEndAt: 'desc' },
      include: { artist: true, reservationTimes: { orderBy: { toReserveAt: 'asc' } } },
    });
  }

  public async findOrderByStatistics(): Promise<PerformanceModel[]> {
    return this.prismaService.performance.findMany({
      where: { fundingStatus: Status.PROGRESS },
      orderBy: { ticketPercentage: 'desc' },
      take: 3,
      include: { artist: true, reservationTimes: { orderBy: { toReserveAt: 'asc' } } },
    });
  }

  public async countPerformance(args: FindPerformanceArgs): Promise<number> {
    const { skip, take, keyword, ...where } = args;

    return this.prismaService.performance.count({
      where: {
        ...where,
        ...(keyword && {
          OR: [
            {
              title: { contains: keyword },
            },
            {
              artist: { agency: { contains: keyword } },
            },
            {
              artist: { name: { contains: keyword } },
            },
          ],
        }),
      },
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
