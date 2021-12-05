import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PerformanceWithCountModel {
  @Field(() => Int)
  public performances!: number;
}
