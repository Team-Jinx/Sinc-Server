import { ObjectType } from '@nestjs/graphql';
import { PerformanceModel } from 'src/performances';
import { StoryModel } from 'src/stories';
import { UserModel } from 'src/users';

import { Notification } from '.prisma/client';

@ObjectType({ description: '알림 스키마' })
export class NotificationModel implements Notification {
  public id!: string;
  public message!: string;
  public type!: string;
  public readAt!: Date | null;
  public createdAt!: Date;
  public updatedAt!: Date;
  public performanceId!: string;
  public performance?: PerformanceModel;
  public userId!: string;
  public user?: UserModel;
  public storyId!: string;
  public story?: StoryModel;
}
