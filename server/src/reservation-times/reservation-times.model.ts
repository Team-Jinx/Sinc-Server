import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PerformanceModel } from 'src/performances';

import { ReservationTime } from '.prisma/client';

@ObjectType({ description: '공연 테이블' })
export class ReservationTimeModel implements ReservationTime {
  @Field(() => ID)
  public id!: string;

  @Field(() => Int)
  public totalTicketCount!: number | null;

  @Field(() => PerformanceModel)
  public performance?: PerformanceModel;

  public toReserveAt!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
  public performanceId!: string;
}
