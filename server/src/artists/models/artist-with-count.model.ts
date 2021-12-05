import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PerformanceModel } from 'src/performances';

import { PerformanceWithCountModel } from './performance-with-count.model';
import { Artist } from '.prisma/client';

@ObjectType()
export class ArtistWithCountModel implements Artist {
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

  @Field(() => PerformanceWithCountModel)
  public _count!: PerformanceWithCountModel;

  public createdAt!: Date;
  public updatedAt!: Date;
}
