import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Status, Category } from '@prisma/client';
import { ArtistModel } from 'src/artists';
import { ReservationTimeModel } from 'src/reservation-times';
import { NotificationModel } from 'src/shared/notification';
import { StoryModel } from 'src/stories';
import { UsersBoughtPerformancesModel } from 'src/users-bought-performances';
import { UsersCheeredPerformancesModel } from 'src/users-cheered-performances';

import { ReserveAt } from './reserve-at.model';

@ObjectType()
export class FindPerformanceById {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public title!: string;

  @Field(() => String, { nullable: true })
  public description!: string | null;

  @Field(() => Int, { defaultValue: 0 })
  public cheerCount!: number;

  @Field(() => String)
  public place!: string;

  @Field(() => Int, { defaultValue: 0 })
  public price!: number;

  @Field(() => String)
  public showTime!: string;

  @Field(() => Int)
  public runningTime!: number;

  @Field(() => String, { nullable: true })
  public posterUrl!: string | null;

  @Field(() => String, { defaultValue: Status.PROGRESS })
  public fundingStatus!: Status;

  @Field(() => String)
  public category!: Category;

  @Field(() => Int, { defaultValue: 0 })
  public totalTicketCount!: number;

  @Field(() => Date, { defaultValue: Date.now() })
  public createdAt!: Date;

  @Field(() => Date, { defaultValue: Date.now() })
  public updatedAt!: Date;

  @Field(() => ID)
  public artistId!: string;

  @Field(() => ArtistModel)
  public artist?: ArtistModel;

  @Field(() => [ReservationTimeModel])
  public reservationTimes?: ReservationTimeModel[];

  @Field(() => [StoryModel])
  public stories?: StoryModel[];

  @Field(() => [UsersBoughtPerformancesModel])
  public usersBoughtPerformances?: UsersBoughtPerformancesModel[];

  @Field(() => [UsersCheeredPerformancesModel])
  public usersCheeredPerformances?: UsersCheeredPerformancesModel[];

  @Field(() => [NotificationModel])
  public notifications?: NotificationModel[];

  @Field(() => Int)
  public ticketCount!: number | null;

  @Field(() => Int)
  public amount!: number;

  public _min?: ReserveAt;
  public _max?: ReserveAt;
}
