import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PerformanceModel } from '.';
import { Logger } from '../common';
import { CreatePerformanceInput, FindPerformanceArgs, UpdatePerformanceInput } from './dtos';
import { PerformancesService } from './performances.service';

@Resolver(() => PerformanceModel)
export class PerformancesResolver {
  constructor(private readonly logger: Logger, private performancesService: PerformancesService) {
    this.logger.setContext(PerformancesResolver.name);
  }

  @Mutation(() => PerformanceModel)
  public async createPerformance(@Args('performanceData') performanceData: CreatePerformanceInput): Promise<PerformanceModel> {
    this.logger.log('create');

    return this.performancesService.create(performanceData);
  }

  @Query(() => PerformanceModel)
  public async findPerformanceById(@Args('id', { type: () => ID }) id: string): Promise<PerformanceModel> {
    this.logger.log('read');

    const user = await this.performancesService.read(id);

    if (!user) throw new NotFoundException('NotFoundData');

    return user;
  }

  @Query(() => [PerformanceModel])
  public async findPerformances(@Args() args: FindPerformanceArgs): Promise<PerformanceModel[]> {
    this.logger.log('find');

    return this.performancesService.find(args);
  }

  @Mutation(() => PerformanceModel)
  public async updatePerformance(
    @Args('id', { type: () => ID }) id: string,
    @Args('performanceData') performanceData: UpdatePerformanceInput,
  ): Promise<PerformanceModel> {
    this.logger.log('update');

    return this.performancesService.update(id, performanceData);
  }

  @Mutation(() => Boolean)
  public async removePerformance(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    this.logger.log('remove');

    return this.performancesService.remove(id);
  }
}
