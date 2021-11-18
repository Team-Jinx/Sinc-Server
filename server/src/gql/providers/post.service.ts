import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma';

import {
  Logger,
  // UtilService
} from '../../common';
import { SimpleInput, SimpleArgs } from '../dto';
import { Post, User } from '../models';
import { PrismaError } from '../utils/prismaError';

@Injectable()
export class SimpleService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {
    this.logger.setContext(SimpleService.name);
  }

  public async create(data: SimpleInput): Promise<Post> {
    this.logger.log('create');

    return this.prismaService.post.create({
      data,
    });
  }

  public async readWithAuthor(id: number): Promise<User | null> {
    return this.prismaService.post.findUnique({ where: { id } }).author();
  }

  public async read(id: number): Promise<Post | null> {
    this.logger.log('read');

    return this.prismaService.post.findUnique({
      where: { id },
    });
  }

  public async find(args: SimpleArgs): Promise<Post[]> {
    this.logger.log('find');

    return this.prismaService.post.findMany({ where: args });
  }

  public async updatePost(id: number, post: SimpleInput): Promise<Post> {
    try {
      return await this.prismaService.post.update({
        data: {
          ...post,
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

  public remove(_id: number): void {
    this.logger.log('remove');

    // const result = await this.sampletable.delete(id);

    // return !!result.affected;
  }
}
