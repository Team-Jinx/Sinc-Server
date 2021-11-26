import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';

import { PerformanceModel } from '.';
import { CreatePerformanceInput, FindPerformanceArgs, UpdatePerformanceInput } from './dtos';

@Injectable()
export class PerformancesService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(data: CreatePerformanceInput): Promise<PerformanceModel> {
    return this.prismaService.performance.create({ data });
  }

  // public async readWithAuthor(id: string): Promise<PerformanceModel | null> {
  //   return this.prismaService.post.findUnique({ where: { id } }).author();
  // }

  public async read(id: string): Promise<PerformanceModel | null> {
    return this.prismaService.performance.findUnique({
      where: { id },
    });
  }

  public async find(args: FindPerformanceArgs): Promise<PerformanceModel[]> {
    return this.prismaService.performance.findMany({ where: args });
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
