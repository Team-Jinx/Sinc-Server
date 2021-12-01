import { Field, ObjectType } from '@nestjs/graphql';
import { OrderDirection } from 'src/common';

import { StoryModel } from '..';

@ObjectType()
export class FindRandomStoriesModel {
  @Field(() => [StoryModel])
  public data!: StoryModel[];

  @Field(() => OrderDirection)
  public direction!: OrderDirection;

  @Field(() => String)
  public field!: string;
}
