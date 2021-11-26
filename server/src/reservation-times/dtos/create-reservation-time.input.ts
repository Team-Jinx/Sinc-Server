import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReservationTimeInput {
  @Field()
  public toReserveAt!: Date;

  @Field()
  public performanceId!: string;
}
