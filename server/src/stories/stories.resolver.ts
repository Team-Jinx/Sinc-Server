import { NotFoundException } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersBoughtPerformancesService } from 'src/users-bought-performances';

import { StoryModel } from '.';
import { Logger } from '../common';
import { CreateStoryInput, FindRandomStoriesArgs, FindStoryArgs, UpdateStoryInput } from './dtos';
import { FindRandomStoriesModel, StoryWithPerformanceStatisticsModel } from './models';
import { StoriesService } from './stories.service';

@Resolver(() => StoryModel)
export class StoriesResolver {
  constructor(
    private readonly logger: Logger,
    private storiesService: StoriesService,
    private usersBoughtPerformancesService: UsersBoughtPerformancesService,
  ) {
    this.logger.setContext(StoriesResolver.name);
  }

  @Mutation(() => StoryModel)
  public async createStory(@Args('storyData') storyData: CreateStoryInput): Promise<StoryModel> {
    this.logger.log('create');

    return this.storiesService.create(storyData);
  }

  @Query(() => StoryModel)
  public async findStoryById(@Args('id', { type: () => ID }) id: string): Promise<StoryModel> {
    this.logger.log('read');

    const user = await this.storiesService.read(id);

    if (!user) throw new NotFoundException('NotFoundData');

    return user;
  }

  @Query(() => FindRandomStoriesModel)
  public async findStoriesByRandom(@Args() args: FindRandomStoriesArgs): Promise<FindRandomStoriesModel> {
    this.logger.log('findStoryByRandom');

    const stories = await this.storiesService.findByRandom(args);

    stories.data = await Promise.all(
      stories.data.map(async (story: StoryWithPerformanceStatisticsModel) => {
        const { amount, ticketCount } = await this.usersBoughtPerformancesService.findTicketStatistics(story.performanceId);

        if (!story.performance) return story;

        story.amount = amount;
        story.ticketCount = ticketCount;

        return story;
      }),
    );

    return stories;
  }

  @Query(() => [StoryModel])
  public async findStories(@Args() args: FindStoryArgs): Promise<StoryModel[]> {
    this.logger.log('find');

    return this.storiesService.find(args);
  }

  @Query(() => [StoryModel])
  public async findPopularStories(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
  ): Promise<StoryModel[]> {
    this.logger.log('findPopularStories');

    return this.storiesService.findPopularStories(limit, offset);
  }

  @Mutation(() => StoryModel)
  public async updateStory(
    @Args('id', { type: () => ID }) id: string,
    @Args('storyData') storyData: UpdateStoryInput,
  ): Promise<StoryModel> {
    this.logger.log('update');

    return this.storiesService.update(id, storyData);
  }

  @Mutation(() => Boolean)
  public async removeStory(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    this.logger.log('remove');

    return this.storiesService.remove(id);
  }
}
