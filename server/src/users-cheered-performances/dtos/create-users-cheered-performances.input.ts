import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUsersCheeredPerformancesInput {
  @Field()
  public userId!: string;

  @Field()
  public performanceId!: string;

  @Field()
  public storyId!: string;
}
