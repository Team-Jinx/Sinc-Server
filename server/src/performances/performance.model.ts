import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ArtistModel } from 'src/artists';

import { Category, Performance, Status } from '.prisma/client';

@ObjectType({ description: '공연 테이블' })
export class PerformanceModel implements Performance {
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

  // @Field(() => [ReservationTime])
  // public reservationTimes!: ReservationTime[];

  // @Field(() => [Story])
  // public stories!: Story[];

  // @Field(() => [UsersBoughtPerformances])
  // public usersBoughtPerformances!: UsersBoughtPerformances[];

  // @Field(() => [UsersCheeredPerformances])
  // public usersCheeredPerformances!: UsersCheeredPerformances[];

  // @Field(() => [Notification])
  // public notifications!: Notification[];
}
