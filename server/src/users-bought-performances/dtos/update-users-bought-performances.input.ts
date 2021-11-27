import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUsersBoughtPerformancesInput {
  @Field(() => ID)
  public reservationTimeId!: string;
}
