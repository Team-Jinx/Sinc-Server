import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { StoryType } from '@prisma/client';
import { PerformanceModel } from 'src/performances';
import { NotificationModel } from 'src/shared/notification';
import { UsersCheeredPerformancesModel } from 'src/users-cheered-performances';

import { Story } from '.prisma/client';

@ObjectType({ description: '공연 테이블' })
export class StoryModel implements Story {
  @Field(() => ID)
  public id!: string;

  @Field(() => Int)
  public cheerCount!: number | null;

  @Field(() => String)
  public type!: StoryType | null;

  @Field(() => ID)
  public performanceId!: string;

  public backgroundUrl!: string;
  public description!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public performance?: PerformanceModel;
  public usersCheeredPerformances?: UsersCheeredPerformancesModel[];
  public notifications?: NotificationModel[];
}
