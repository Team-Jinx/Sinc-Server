import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStoryInput {
  @Field()
  public description?: string;

  @Field()
  public backgroundUrl?: string;

  @Field()
  public performanceId?: string;
}
