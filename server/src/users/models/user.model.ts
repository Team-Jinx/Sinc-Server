import { Field, ID, ObjectType } from '@nestjs/graphql';

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

  // @Field(() => [UsersBoughtPerformances])
  // public usersBoughtPerformances!: UsersBoughtPerformances[];

  // @Field(() => [UsersCheeredPerformances])
  // public usersCheeredPerformances!: UsersCheeredPerformances[];

  // @Field(() => [Notification])
  // public notifications!: Notification[];
}
