import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';

import { PerformanceModel } from '.';
import { CreatePerformanceInput, FindPerformanceArgs, UpdatePerformanceInput } from './dtos';
import { FindPerformanceById } from './performances.model';
import { Category } from '.prisma/client';

@Injectable()
export class PerformancesService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(data: CreatePerformanceInput): Promise<PerformanceModel> {
    return this.prismaService.performance.create({ data });
  }

  public async read(id: string): Promise<FindPerformanceById | null> {
    const performance = await this.prismaService.performance.findUnique({
      where: { id },
      include: { stories: true, reservationTimes: true },
    });

    if (!performance) return null;

    const usersBoughtPerformancesStatistics = await this.prismaService.usersBoughtPerformances.aggregate({
      where: { performanceId: id },
      _sum: {
        amount: true,
        ticketCount: true,
        donation: true,
      },
    });
    const { amount, donation, ticketCount } = usersBoughtPerformancesStatistics._sum;
    const result = { ...performance, ticketCount, amount: 0 };

    if (amount) result.amount += amount;
    if (donation) result.amount += donation;

    return result;
  }

  public async find(args: FindPerformanceArgs): Promise<PerformanceModel[]> {
    return this.prismaService.performance.findMany({ where: args, include: { artist: true, reservationTimes: true } });
  }

  public async findPopularPerformances(category: Category): Promise<PerformanceModel[]> {
    return this.prismaService.performance.findMany({
      where: { category },
      include: { artist: true, reservationTimes: true },
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
