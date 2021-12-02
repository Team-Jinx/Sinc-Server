import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PerformanceModel } from 'src/performances';

import { Artist } from '.prisma/client';

@ObjectType({ description: '아티스트 테이블' })
export class ArtistModel implements Artist {
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

  public createdAt!: Date;
  public updatedAt!: Date;
}
