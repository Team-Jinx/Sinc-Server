import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ReservationTimeModel, ReservationTimesService } from 'src/reservation-times';
import { UsersBoughtPerformancesService } from 'src/users-bought-performances';

import { FindPerformanceById, PerformanceModel } from '.';
import { Logger } from '../common';
import { CreatePerformanceInput, FindPerformanceArgs, UpdatePerformanceInput } from './dtos';
import { PerformancesService } from './performances.service';
import { Category } from '.prisma/client';

@Resolver(() => PerformanceModel)
export class PerformancesResolver {
  constructor(
    private readonly logger: Logger,
    private performancesService: PerformancesService,
    private reservationTimesService: ReservationTimesService,
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

    const reservationTimeMinMax = await this.reservationTimesService.findReservationTimeMinMax(id);
    const { ticketCount, amount } = await this.usersBoughtPerformancesService.findTicketStatistics(id);
    const a = { ...performance, ...reservationTimeMinMax, amount, ticketCount };
    console.log(a);
    return a;
  }

  @Query(() => [PerformanceModel])
  public async findPerformances(@Args() args: FindPerformanceArgs): Promise<PerformanceModel[]> {
    this.logger.log('find');

    return this.performancesService.find(args);
  }

  @Query(() => [PerformanceModel])
  public async findPopularPerformances(@Args('category', { type: () => String }) category: Category): Promise<PerformanceModel[]> {
    this.logger.log('findPopularPerformances');

    return this.performancesService.findPopularPerformances(category);
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
  public async reservationTimes(@Parent() performance: PerformanceModel): Promise<ReservationTimeModel | null> {
    return this.reservationTimesService.read(performance.id);
  }
}
