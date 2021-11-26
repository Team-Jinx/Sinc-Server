import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateReservationTimeInput {
  @Field()
  public performanceId?: string;

  @Field()
  public toReserveAt?: Date;
}
