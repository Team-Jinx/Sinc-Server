import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';

import { UsersBoughtPerformancesModel } from '.';
import { CreateUsersBoughtPerformancesInput, FindUsersBoughtPerformancesArgs, UpdateUsersBoughtPerformancesInput } from './dtos';

@Injectable()
export class UsersBoughtPerformancesService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(data: CreateUsersBoughtPerformancesInput): Promise<UsersBoughtPerformancesModel> {
    return this.prismaService.usersBoughtPerformances.create({ data, include: { performance: true } });
  }

  // public async readWithAuthor(id: string): Promise<UsersBoughtPerformancesModel | null> {
  //   return this.prismaService.post.findUnique({ where: { id } }).author();
  // }

  public async read(id: string): Promise<UsersBoughtPerformancesModel | null> {
    return this.prismaService.usersBoughtPerformances.findUnique({
      where: { id },
    });
  }

  public async find(args: FindUsersBoughtPerformancesArgs): Promise<UsersBoughtPerformancesModel[]> {
    return this.prismaService.usersBoughtPerformances.findMany({ where: args });
  }

  public async findTicketStatistics(performanceId: string): Promise<{ amount: number; ticketCount: number }> {
    const ticketSum = await this.prismaService.usersBoughtPerformances.aggregate({
      where: { performanceId },
      _sum: {
        amount: true,
        ticketCount: true,
        donation: true,
      },
    });
    const { amount, donation, ticketCount } = ticketSum._sum;
    const result = { amount: 0, ticketCount: 0 };

    if (ticketCount) result.ticketCount += ticketCount;
    if (amount) result.amount += amount;
    if (donation) result.amount += donation;

    return result;
  }

  public async update(id: string, usersBoughtPerformances: UpdateUsersBoughtPerformancesInput): Promise<UsersBoughtPerformancesModel> {
    try {
      return await this.prismaService.usersBoughtPerformances.update({
        data: {
          ...usersBoughtPerformances,
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
    const result = await this.prismaService.usersBoughtPerformances.delete({ where: { id } });

    return !!result;
  }
}
