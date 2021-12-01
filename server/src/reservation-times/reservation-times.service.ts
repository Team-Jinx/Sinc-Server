import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PerformanceModel } from 'src/performances';
import { PrismaService, PrismaError } from 'src/prisma';

import { ReservationTimeModel } from '.';
import { CreateReservationTimeInput, FindReservationTimeArgs, UpdateReservationTimeInput } from './dtos';

@Injectable()
export class ReservationTimesService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(data: CreateReservationTimeInput): Promise<ReservationTimeModel> {
    return this.prismaService.reservationTime.create({ data });
  }

  public async readWithPerformance(id: string): Promise<PerformanceModel | null> {
    return this.prismaService.reservationTime.findUnique({ where: { id } }).performance();
  }

  public async read(id: string): Promise<ReservationTimeModel | null> {
    return this.prismaService.reservationTime.findUnique({
      where: { id },
    });
  }

  public async find(args: FindReservationTimeArgs): Promise<ReservationTimeModel[]> {
    return this.prismaService.reservationTime.findMany({ where: args });
  }

  public async update(id: string, reservationTime: UpdateReservationTimeInput): Promise<ReservationTimeModel> {
    try {
      return await this.prismaService.reservationTime.update({
        data: {
          ...reservationTime,
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
    const result = await this.prismaService.reservationTime.delete({ where: { id } });

    return !!result;
  }
}
