import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';

import { PerformancesResolver } from './performances.resolver';
import { PerformancesService } from './performances.service';

@Module({
  imports: [PrismaModule],
  providers: [PerformancesResolver, PerformancesService, DateScalar],
})
export class PerformancesModule {}
