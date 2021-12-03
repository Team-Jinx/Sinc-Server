import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth';
import { ReservationTimeModel } from 'src/reservation-times';
import { UsersBoughtPerformancesService } from 'src/users-bought-performances';

import { FindPerformanceById, PerformanceModel } from '.';
import { Logger } from '../common';
import { CreatePerformanceInput, FindPerformanceArgs, UpdatePerformanceInput } from './dtos';
import { PerformancesService } from './performances.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => PerformanceModel)
export class PerformancesResolver {
  constructor(
    private readonly logger: Logger,
    private performancesService: PerformancesService,
    private usersBoughtPerformancesService: UsersBoughtPerformancesService,
  ) {
    this.logger.setContext(PerformancesResolver.name);
  }

  @Mutation(() => PerformanceModel)
  public async createPerformance(@Args('performanceData') performanceData: CreatePerformanceInput): Promise<PerformanceModel> {
    this.logger.log('create');

    return this.performancesService.create(performanceData);
  }

  @Query(() => FindPerformanceById, { description: '공연 한개 조회' })
  public async findPerformanceById(@Args('id', { type: () => ID }) id: string): Promise<FindPerformanceById> {
    this.logger.log('read');

    const performance = await this.performancesService.read(id);

    if (!performance) throw new NotFoundException('NotFoundData');

    const { ticketCount, amount } = await this.usersBoughtPerformancesService.findTicketStatistics(id);
    return { ...performance, amount, ticketCount };
  }

  @Query(() => [PerformanceModel])
  public async findPerformances(@Args() args: FindPerformanceArgs): Promise<PerformanceModel[]> {
    this.logger.log('find');

    return this.performancesService.find(args);
  }

  @Query(() => Int)
  public async countPerformance(@Args() args: FindPerformanceArgs): Promise<number> {
    this.logger.log('count');

    return this.performancesService.countPerformance(args);
  }

  @Query(() => [PerformanceModel])
  public async findPopularPerformances(): Promise<PerformanceModel[]> {
    this.logger.log('findPopularPerformances');

    return this.performancesService.findPopularPerformances();
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

  @ResolveField()
  public async reservationTimes(@Parent() performance: PerformanceModel): Promise<ReservationTimeModel[]> {
    return this.performancesService.readWithReservationTime(performance.id);
  }
}
