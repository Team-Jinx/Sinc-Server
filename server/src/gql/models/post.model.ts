import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { User } from './user.model';

@ObjectType()
export class Post {
  @Field(() => ID)
  public id!: number;

  @Field(() => Date)
  public createdAt!: Date;

  @Field(() => Date)
  public updatedAt!: Date;

  @Field()
  public title!: string;

  @Field(() => String, { nullable: true })
  public content!: string | null;

  @Field(() => Boolean, { nullable: true })
  public published?: boolean | null;

  @Field(() => Int)
  public viewCount!: number;

  @Field(() => User, { nullable: true })
  public author?: User | null;
}
