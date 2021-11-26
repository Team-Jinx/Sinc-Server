import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStoryInput {
  @Field()
  public backgroundUrl!: string;

  @Field()
  public description!: string;

  @Field()
  public performanceId!: string;
}
