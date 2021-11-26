import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUsersBoughtPerformancesInput {
  @Field()
  public reservationTime!: Date;
}
