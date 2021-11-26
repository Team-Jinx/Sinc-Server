import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PerformanceModel } from 'src/performances';

import { Story } from '.prisma/client';

@ObjectType({ description: '공연 테이블' })
export class StoryModel implements Story {
  @Field(() => Int)
  public cheerCount!: number | null;

  public id!: string;
  public backgroundUrl!: string;
  public description!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public performanceId!: string;
  public performance?: PerformanceModel;
}
