import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PerformanceModel } from 'src/performances';
import { UserModel } from 'src/users';

import { Status, UsersBoughtPerformances } from '.prisma/client';

@ObjectType({ description: '유저 구매 기록 스키마' })
export class UsersBoughtPerformancesModel implements UsersBoughtPerformances {
  @Field(() => Int)
  public ticketCount!: number | null;

  @Field(() => Int)
  public donation!: number | null;

  public id!: string;
  public reservationTime!: Date;
  public bank!: string;
  public paymentKey!: string;
  public orderId!: string;
  public receiptUrl!: string;
  public amount!: number;
  public status!: Status | null;
  public createdAt!: Date;
  public updatedAt!: Date;
  public userId!: string;
  public user?: UserModel;
  public performanceId!: string;
  public performance?: PerformanceModel;
}
