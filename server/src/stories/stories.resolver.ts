import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth';
import { UsersBoughtPerformancesService } from 'src/users-bought-performances';

import { StoryModel } from '.';
import { Logger } from '../common';
import { CreateStoryInput, FindRandomStoriesArgs, FindStoryArgs, UpdateStoryInput } from './dtos';
import { FindRandomStoriesModel, StoryWithPerformanceStatisticsModel } from './models';
import { StoriesService } from './stories.service';

@UseGuards(JwtAuthGuard)
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

  @Query(() => StoryWithPerformanceStatisticsModel)
  public async findStoryById(
    @Args('id', { type: () => ID }) id: string,
    @Args('userId', { type: () => ID }) userId: string, // TODO: 나중에 @ReqUser로 변경할 것.
  ): Promise<StoryWithPerformanceStatisticsModel> {
    this.logger.log('read');

    const story = await this.storiesService.read(id, userId);

    if (!story) throw new NotFoundException('NotFoundData');

    const { amount, ticketCount } = await this.usersBoughtPerformancesService.findTicketStatistics(story.performanceId);

    return { amount, ticketCount, ...story };
  }

  @Query(() => FindRandomStoriesModel)
  public async findStoriesByRandom(
    @Args('userId', { type: () => ID }) userId: string, // TODO: 나중에 @ReqUser로 변경할 것.
    @Args() args: FindRandomStoriesArgs,
  ): Promise<FindRandomStoriesModel> {
    this.logger.log('findStoryByRandom');

    const stories = await this.storiesService.findByRandom(args, userId);

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

    const { userId, ...options } = args;

    return this.storiesService.find(options, userId);
  }

  @Query(() => Int)
  public async countStories(@Args() args: FindStoryArgs): Promise<number> {
    this.logger.log('count');

    return this.storiesService.countStories(args);
  }

  @Query(() => [StoryModel])
  public async findPopularStories(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('userId', { type: () => ID }) userId: string, // TODO: 나중에 @ReqUser로 변경할 것.
  ): Promise<StoryModel[]> {
    this.logger.log('findPopularStories');

    return this.storiesService.findPopularStories(limit, offset, userId);
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
