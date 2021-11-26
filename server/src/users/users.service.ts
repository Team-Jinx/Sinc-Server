import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';

import { CreateUserInput, FindUserArgs } from './dtos';
import { User } from './models';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(data: CreateUserInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  // public async readWithAuthor(id: string): Promise<User | null> {
  //   return this.prismaService.post.findUnique({ where: { id } }).author();
  // }

  public async read(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  public async find(args: FindUserArgs): Promise<User[]> {
    return this.prismaService.user.findMany({ where: args });
  }

  public async update(id: string, user: FindUserArgs): Promise<User> {
    try {
      return await this.prismaService.user.update({
        data: {
          ...user,
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
    const result = await this.prismaService.user.delete({ where: { id } });

    return !!result;
  }
}
