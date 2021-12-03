import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PerformanceModel } from 'src/performances';
import { NotificationModel } from 'src/shared/notification';
import { UsersCheeredPerformancesModel } from 'src/users-cheered-performances';

import { StoryModel } from './story.model';
import { StoryType } from '.prisma/client';

@ObjectType()
export class StoryWithPerformanceStatisticsModel implements StoryModel {
  @Field(() => Int)
  public amount?: number;

  @Field(() => Int)
  public ticketCount?: number;

  @Field(() => StoryType, { nullable: true })
  public type!: StoryType | null;

  public id!: string;
  public cheerCount!: number | null;
  public performanceId!: string;
  public imageUrl!: string | null;
  public videoUrl!: string | null;
  public description!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public performance?: PerformanceModel;
  public usersCheeredPerformances?: UsersCheeredPerformancesModel[];
  public notifications?: NotificationModel[];
}
