import { Field, ObjectType } from '@nestjs/graphql';
import { OrderDirection } from 'src/common';

import { StoryWithPerformanceStatisticsModel } from './story-with-performance-statistics.model';

@ObjectType()
export class FindRandomStoriesModel {
  @Field(() => [StoryWithPerformanceStatisticsModel])
  public data!: StoryWithPerformanceStatisticsModel[];

  @Field(() => OrderDirection)
  public direction!: OrderDirection;

  @Field(() => String)
  public field!: string;
}
