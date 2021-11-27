import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateUsersBoughtPerformancesInput {
  @Field(() => ID)
  public reservationTimeId!: string;

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

  @Field(() => ID)
  public performanceId!: string;

  @Field(() => Int)
  @IsOptional()
  public donation?: number;

  @Field(() => Int)
  public ticketCount!: number;
}
