import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PerformanceModel } from 'src/performances';

import { ReservationTimeModel } from '.';
import { Logger } from '../common';
import { CreateReservationTimeInput, FindReservationTimeArgs, UpdateReservationTimeInput } from './dtos';
import { ReservationTimesService } from './reservation-times.service';

@Resolver(() => ReservationTimeModel)
export class ReservationTimesResolver {
  constructor(private readonly logger: Logger, private reservationTimesService: ReservationTimesService) {
    this.logger.setContext(ReservationTimesResolver.name);
  }

  @Mutation(() => ReservationTimeModel)
  public async createReservationTime(
    @Args('reservationTimeData') reservationTimeData: CreateReservationTimeInput,
  ): Promise<ReservationTimeModel> {
    this.logger.log('create');

    return this.reservationTimesService.create(reservationTimeData);
  }

  @Query(() => ReservationTimeModel)
  public async findReservationTimeById(@Args('id', { type: () => ID }) id: string): Promise<ReservationTimeModel> {
    this.logger.log('read');

    const user = await this.reservationTimesService.read(id);

    if (!user) throw new NotFoundException('NotFoundData');

    return user;
  }

  @Query(() => [ReservationTimeModel])
  public async findReservationTimes(@Args() args: FindReservationTimeArgs): Promise<ReservationTimeModel[]> {
    this.logger.log('find');

    return this.reservationTimesService.find(args);
  }

  @Mutation(() => ReservationTimeModel)
  public async updateReservationTime(
    @Args('id', { type: () => ID }) id: string,
    @Args('ReservationTimeData') reservationTimeData: UpdateReservationTimeInput,
  ): Promise<ReservationTimeModel> {
    this.logger.log('update');

    return this.reservationTimesService.update(id, reservationTimeData);
  }

  @Mutation(() => Boolean)
  public async removeReservationTime(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    this.logger.log('remove');

    return this.reservationTimesService.remove(id);
  }

  @ResolveField()
  public async performance(@Parent() reservationTime: ReservationTimeModel): Promise<PerformanceModel | null> {
    this.logger.log('resolve field');

    return this.reservationTimesService.readWithPerformance(reservationTime.id);
  }
}
