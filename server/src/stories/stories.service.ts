import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';

import { StoryModel } from '.';
import { CreateStoryInput, FindStoryArgs, UpdateStoryInput } from './dtos';

@Injectable()
export class StoriesService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(data: CreateStoryInput): Promise<StoryModel> {
    return this.prismaService.story.create({ data });
  }

  // public async readWithAuthor(id: string): Promise<StoryModel | null> {
  //   return this.prismaService.post.findUnique({ where: { id } }).author();
  // }

  public async read(id: string): Promise<StoryModel | null> {
    return this.prismaService.story.findUnique({
      where: { id },
      include: { performance: true },
    });
  }

  public async find(args: FindStoryArgs): Promise<StoryModel[]> {
    return this.prismaService.story.findMany({ where: args });
  }

  public async findPopularStories(limit: number, offset: number): Promise<StoryModel[]> {
    return this.prismaService.story.findMany({ where: { type: 'ADVERTISE' }, orderBy: { cheerCount: 'desc' }, take: limit, skip: offset });
  }

  public async update(id: string, story: UpdateStoryInput): Promise<StoryModel> {
    try {
      return await this.prismaService.story.update({
        data: {
          ...story,
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
    const result = await this.prismaService.story.delete({ where: { id } });

    return !!result;
  }
}
