import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';

import { ReservationTimesResolver } from './reservation-times.resolver';
import { ReservationTimesService } from './reservation-times.service';

@Module({
  imports: [PrismaModule],
  providers: [ReservationTimesResolver, ReservationTimesService, DateScalar],
  exports: [ReservationTimesService],
})
export class ReservationTimesModule {}
