import { Field, ObjectType } from '@nestjs/graphql';
import { ArtistModel } from 'src/artists';

import { PerformanceCountModel } from './performance-count.model';
import { PerformanceModel } from './performance.model';

@ObjectType()
export class ArtistWithCountModel implements ArtistModel {
  @Field(() => PerformanceCountModel, { nullable: true })
  public _count!: PerformanceCountModel | null;

  public id!: string;
  public name!: string;
  public agency!: string | null;
  public description!: string | null;
  public profileUrl!: string | null;
  public performances?: PerformanceModel[];
  public createdAt!: Date;
  public updatedAt!: Date;
}
