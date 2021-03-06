import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { OrderDirection } from 'src/common';
import { PrismaService, PrismaError } from 'src/prisma';

import { StoryModel } from '.';
import { CreateStoryInput, FindPopularStoriesArgs, FindRandomStoriesArgs, FindStoryArgs, UpdateStoryInput } from './dtos';
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

  public async read(id: string, userId: string): Promise<StoryModel | null> {
    return this.prismaService.story.findUnique({
      where: { id },
      include: {
        usersCheeredPerformances: { where: { userId } },
        performance: { include: { artist: true, reservationTimes: { orderBy: { toReserveAt: 'asc' } } } },
      },
    });
  }

  public async find(args: Omit<FindStoryArgs, 'userId'>, userId?: string): Promise<StoryModel[]> {
    const { skip, take, keyword, artistId, ...where } = args;

    return this.prismaService.story.findMany({
      where: {
        ...where,
        ...(artistId && { performance: { artistId } }),
        ...(keyword && {
          OR: [
            {
              description: { contains: keyword },
            },
            {
              performance: { artist: { name: { contains: keyword } } },
            },
          ],
        }),
      },
      orderBy: { id: 'desc' },
      skip,
      take,
      include: { usersCheeredPerformances: { where: { userId } }, performance: { include: { artist: true } } },
    });
  }

  public async countStories(args: FindStoryArgs): Promise<number> {
    const { skip, take, keyword, ...where } = args;

    return this.prismaService.story.count({
      where: {
        ...where,
        ...(keyword && {
          OR: [
            {
              description: { contains: keyword },
            },
            {
              performance: { artist: { name: { contains: keyword } } },
            },
          ],
        }),
      },
    });
  }

  public async findPopularStories(args: FindPopularStoriesArgs): Promise<StoryModel[]> {
    const { take, skip, userId } = args;

    return this.prismaService.story.findMany({
      where: { type: 'ADVERTISE', performance: { fundingStatus: 'PROGRESS' } },
      include: { usersCheeredPerformances: { where: { userId } } },
      orderBy: { cheerCount: 'desc' },
      take,
      skip,
    });
  }

  public async findByRandom(
    { take, cursor, field, direction, category }: FindRandomStoriesArgs,
    userId: string,
  ): Promise<FindRandomStoriesModel> {
    const storiesCount = await this.prismaService.story.count({
      where: { type: 'ADVERTISE', ...(category && { performance: { category } }) },
    });
    const randomSkip = Math.max(0, Math.floor(Math.random() * storiesCount) - take);
    const skip = !cursor ? randomSkip : 1;
    const orderBy = field || this.randomPick<string>(['id', 'videoUrl', 'imageUrl', 'description', 'updatedAt']);
    const orderDirection = direction || this.randomPick([OrderDirection.ASC, OrderDirection.DESC]);
    const stories = await this.prismaService.story.findMany({
      skip,
      take,
      ...(cursor && { cursor: { id: cursor } }),
      where: { type: 'ADVERTISE', ...(category && { performance: { category } }) },
      orderBy: { [orderBy]: orderDirection },
      include: {
        performance: { include: { artist: true, reservationTimes: { orderBy: { toReserveAt: 'asc' } } } },
        usersCheeredPerformances: { where: { userId } },
      },
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
