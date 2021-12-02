import { ObjectType } from '@nestjs/graphql';
import { UsersCheeredPerformances } from '@prisma/client';
import { PerformanceModel } from 'src/performances';
import { StoryModel } from 'src/stories';
import { UserModel } from 'src/users';

@ObjectType({ description: '유저 응원 기록 스키마' })
export class UsersCheeredPerformancesModel implements UsersCheeredPerformances {
  public id!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public userId!: string;
  public user?: UserModel;
  public performanceId!: string;
  public performance?: PerformanceModel;
  public storyId!: string;
  public story?: StoryModel;
}
