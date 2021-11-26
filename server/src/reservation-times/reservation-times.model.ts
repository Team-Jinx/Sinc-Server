import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PerformanceModel } from 'src/performances';

import { ReservationTime } from '.prisma/client';

@ObjectType({ description: '공연 테이블' })
export class ReservationTimeModel implements ReservationTime {
  @Field(() => ID)
  public id!: string;

  @Field(() => Int)
  public totalTicketCount!: number | null;

  public toReserveAt!: Date;
  public performanceId!: string;
  public performance?: PerformanceModel;
}
