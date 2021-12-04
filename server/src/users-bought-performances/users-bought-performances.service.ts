import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import dayjs from 'dayjs';
import { PrismaService, PrismaError, TransactionPrisma } from 'src/prisma';

import { UsersBoughtPerformancesModel } from '.';
import { CreateUsersBoughtPerformancesInput, FindUsersBoughtPerformancesArgs, UpdateUsersBoughtPerformancesInput } from './dtos';
import { Status } from '.prisma/client';

@Injectable()
export class UsersBoughtPerformancesService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(inputData: CreateUsersBoughtPerformancesInput): Promise<UsersBoughtPerformancesModel> {
    const performance = await this.prismaService.performance.findUnique({ where: { id: inputData.performanceId } });

    if (!performance) throw new BadRequestException('no performance');
    if (performance.fundingStatus === 'SUCCESS') throw new ForbiddenException('already success performance');
    if (performance.boughtTicketCount + inputData.ticketCount > performance?.totalTicketCount) {
      throw new ForbiddenException('too many ticket');
    }

    try {
      const result: UsersBoughtPerformancesModel = await this.prismaService.$transaction<UsersBoughtPerformancesModel>(
        async (prisma: TransactionPrisma) => {
          const percentage = (performance.boughtTicketCount + inputData.ticketCount) / performance.totalTicketCount;
          const data = {
            boughtTicketCount: { increment: inputData.ticketCount },
            ticketPercentage: percentage,
            fundingStatus: percentage === 100 ? Status.SUCCESS : Status.PROGRESS,
          };
          await prisma.performance.update({ data, where: { id: inputData.performanceId } });
          return prisma.usersBoughtPerformances.create({ data: inputData, include: { performance: true } });
        },
      );

      return result;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async read(id: string): Promise<UsersBoughtPerformancesModel | null> {
    return this.prismaService.usersBoughtPerformances.findUnique({
      where: { id },
    });
  }

  public async find(args: FindUsersBoughtPerformancesArgs): Promise<UsersBoughtPerformancesModel[]> {
    const { skip, take, ...where } = args;
    return this.prismaService.usersBoughtPerformances.findMany({
      where,
      skip,
      take,
      orderBy: { id: 'desc' },
      include: { performance: { include: { reservationTimes: { orderBy: { toReserveAt: 'asc' } } } } },
    });
  }

  public async findUserImminentTicket(userId: string): Promise<UsersBoughtPerformancesModel | null> {
    const now = dayjs().toDate();
    const imminentHour = dayjs().add(1, 'hour').toDate();

    return this.prismaService.usersBoughtPerformances.findFirst({
      where: { userId, reservationTime: { toReserveAt: { gt: now, lte: imminentHour } } },
      orderBy: { reservationTime: { toReserveAt: 'desc' } },
      include: { reservationTime: true, performance: true },
    });
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
