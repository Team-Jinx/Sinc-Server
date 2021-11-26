import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';

import { UsersCheeredPerformancesModel } from '.';
import { CreateUsersCheeredPerformancesInput, FindUsersCheeredPerformancesArgs, UpdateUsersCheeredPerformancesInput } from './dtos';

@Injectable()
export class UsersCheeredPerformancesService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(data: CreateUsersCheeredPerformancesInput): Promise<UsersCheeredPerformancesModel> {
    return this.prismaService.usersCheeredPerformances.create({ data });
  }

  // public async readWithAuthor(id: string): Promise<UsersCheeredPerformancesModel | null> {
  //   return this.prismaService.post.findUnique({ where: { id } }).author();
  // }

  public async read(id: string): Promise<UsersCheeredPerformancesModel | null> {
    return this.prismaService.usersCheeredPerformances.findUnique({
      where: { id },
    });
  }

  public async find(args: FindUsersCheeredPerformancesArgs): Promise<UsersCheeredPerformancesModel[]> {
    return this.prismaService.usersCheeredPerformances.findMany({ where: args });
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
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error instanceof PrismaClientKnownRequestError && error.code === PrismaError.RECORD_DOES_NOT_EXIST) {
        throw new NotFoundException('post with id not found');
      }
      throw error;
    }
  }

  public async remove(id: string): Promise<boolean> {
    const result = await this.prismaService.usersCheeredPerformances.delete({ where: { id } });

    return !!result;
  }
}
