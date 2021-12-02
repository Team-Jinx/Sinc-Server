import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';

import { UsersCheeredPerformancesModel } from '.';
import { CreateUsersCheeredPerformancesInput, FindUsersCheeredPerformancesArgs, UpdateUsersCheeredPerformancesInput } from './dtos';

@Injectable()
export class UsersCheeredPerformancesService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateUsersCheeredPerformancesInput): Promise<UsersCheeredPerformancesModel> {
    await this.prismaService.story.update({
      where: { id: data.storyId },
      data: { cheerCount: { increment: 1 }, performance: { update: { cheerCount: { increment: 1 } } } },
    });
    return this.prismaService.usersCheeredPerformances.create({ data });
  }

  public async read(id: string): Promise<UsersCheeredPerformancesModel | null> {
    return this.prismaService.usersCheeredPerformances.findUnique({
      where: { id },
    });
  }

  public async find(args: FindUsersCheeredPerformancesArgs): Promise<UsersCheeredPerformancesModel[]> {
    const { skip, take, ...where } = args;

    return this.prismaService.usersCheeredPerformances.findMany({ where, skip, take, include: { story: true }, orderBy: { id: 'desc' } });
  }

  public async update(id: string, usersCheeredPerformances: UpdateUsersCheeredPerformancesInput): Promise<UsersCheeredPerformancesModel> {
    try {
      return await this.prismaService.usersCheeredPerformances.update({
        data: {
          ...usersCheeredPerformances,
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
    const result = await this.prismaService.usersCheeredPerformances.delete({ where: { id } });
    await this.prismaService.story.update({
      where: { id: result.storyId },
      data: { cheerCount: { decrement: 1 }, performance: { update: { cheerCount: { decrement: 1 } } } },
    });

    return !!result;
  }
}
