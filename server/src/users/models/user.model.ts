import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NotificationModel } from 'src/shared/notification';
import { UsersBoughtPerformancesModel } from 'src/users-bought-performances';
import { UsersCheeredPerformancesModel } from 'src/users-cheered-performances';

import { User } from '.prisma/client';

@ObjectType({ description: '유저 테이블' })
export class UserModel implements User {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public email!: string;

  @Field(() => String)
  public nickname!: string;

  @Field(() => String, { nullable: true })
  public phone!: string | null;

  @Field(() => String, { nullable: true })
  public profileUrl!: string | null;

  @Field(() => String)
  public isPushNotification!: boolean;

  @Field(() => Date)
  public createdAt!: Date;

  @Field(() => Date)
  public updatedAt!: Date;

  @Field(() => [UsersBoughtPerformancesModel])
  public usersBoughtPerformances?: UsersBoughtPerformancesModel[];

  @Field(() => [UsersCheeredPerformancesModel])
  public usersCheeredPerformances?: UsersCheeredPerformancesModel[];

  @Field(() => [NotificationModel])
  public notifications?: NotificationModel[];
}
