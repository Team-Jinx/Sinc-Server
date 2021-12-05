import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PerformanceModel } from 'src/performances';

import { ArtistModel } from '.';
import { PerformanceWithCountModel } from './performance-with-count.model';

@ObjectType()
export class ArtistWithCountModel implements ArtistModel {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public name!: string;

  @Field(() => String, { nullable: true })
  public agency!: string | null;

  @Field(() => String, { nullable: true })
  public description!: string | null;

  @Field(() => String, { nullable: true })
  public profileUrl!: string | null;

  @Field(() => [PerformanceModel])
  public performances?: PerformanceModel[];

  @Field(() => String, { nullable: true })
  public inquiryLink!: string | null;

  @Field(() => PerformanceWithCountModel, { nullable: true })
  public _count!: PerformanceWithCountModel | null;

  public createdAt!: Date;
  public updatedAt!: Date;
}
