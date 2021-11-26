import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';
import { ReservationTimesModule } from 'src/reservation-times';
import { StoriesModule } from 'src/stories';

import { PerformancesResolver } from './performances.resolver';
import { PerformancesService } from './performances.service';

@Module({
  imports: [PrismaModule, ReservationTimesModule, StoriesModule],
  providers: [PerformancesResolver, PerformancesService, DateScalar],
})
export class PerformancesModule {}
