import { Field, Int, ObjectType } from '@nestjs/graphql';

import { StoryModel } from './story.model';

@ObjectType()
export class StoryWithPerformanceStatisticsModel extends StoryModel {
  @Field(() => Int)
  public amount?: number;

  @Field(() => Int)
  public ticketCount?: number;
}
