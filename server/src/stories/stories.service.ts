import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { OrderDirection } from 'src/common';
import { PrismaService, PrismaError } from 'src/prisma';

import { StoryModel } from '.';
import { CreateStoryInput, FindRandomStoriesArgs, FindStoryArgs, UpdateStoryInput } from './dtos';
import { FindRandomStoriesModel } from './models';

@Injectable()
export class StoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateStoryInput): Promise<StoryModel> {
    return this.prismaService.story.create({ data });
  }

  // public async readWithAuthor(id: string): Promise<StoryModel | null> {
  //   return this.prismaService.post.findUnique({ where: { id } }).author();
  // }

  public async read(id: string): Promise<StoryModel | null> {
    return this.prismaService.story.findUnique({
      where: { id },
      include: { performance: { include: { artist: true } } },
    });
  }

  public async find(args: FindStoryArgs): Promise<StoryModel[]> {
    return this.prismaService.story.findMany({ where: args });
  }

  public async findPopularStories(limit: number, offset: number, userId: string): Promise<StoryModel[]> {
    return this.prismaService.story.findMany({
      where: { type: 'ADVERTISE', performance: { fundingStatus: 'PROGRESS' } },
      include: { usersCheeredPerformances: { where: { userId } } },
      orderBy: { cheerCount: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  public async findByRandom(
    { take, cursor, field, direction, category }: FindRandomStoriesArgs,
    userId: string,
  ): Promise<FindRandomStoriesModel> {
    const storiesCount = await this.prismaService.story.count({ ...(category && { where: { performance: { category } } }) });
    const randomSkip = Math.max(0, Math.floor(Math.random() * storiesCount) - take);
    const skip = !cursor ? randomSkip : 1;
    const orderBy = field || this.randomPick<string>(['id', 'backgroundUrl', 'description', 'updatedAt']);
    const orderDirection = direction || this.randomPick([OrderDirection.ASC, OrderDirection.DESC]);
    const stories = await this.prismaService.story.findMany({
      skip,
      take,
      ...(cursor && { cursor: { id: cursor } }),
      ...(category && { where: { performance: { category } } }),
      orderBy: { [orderBy]: orderDirection },
      include: { performance: { include: { artist: true, reservationTimes: { orderBy: { toReserveAt: 'asc'} } } }, usersCheeredPerformances: { where: { userId } } },
    });

    return { data: stories, direction: orderDirection, field: orderBy };
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

  public randomPick<T>(arr: T[]): T {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }
}
