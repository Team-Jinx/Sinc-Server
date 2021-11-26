import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUsersBoughtPerformancesInput {
  @Field()
  public reservationTime!: Date;

  @Field()
  public bank!: string;

  @Field()
  public paymentKey!: string;

  @Field()
  public orderId!: string;

  @Field()
  public receiptUrl!: string;

  @Field(() => Int)
  public amount!: number;

  @Field()
  public userId!: string;

  @Field()
  public performanceId!: string;
}
