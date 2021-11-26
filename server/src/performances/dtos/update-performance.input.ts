import { Field, InputType } from '@nestjs/graphql';

import { Category } from '.prisma/client';

@InputType()
export class UpdatePerformanceInput {
  @Field()
  public title?: string;

  @Field()
  public description?: string;

  @Field({ nullable: true })
  public profileUrl?: string;

  @Field()
  public category?: Category;
}
