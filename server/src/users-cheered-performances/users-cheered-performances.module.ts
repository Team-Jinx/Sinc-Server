import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';

import { UsersCheeredPerformancesResolver } from './users-cheered-performances.resolver';
import { UsersCheeredPerformancesService } from './users-cheered-performances.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersCheeredPerformancesResolver, UsersCheeredPerformancesService, DateScalar],
})
export class UsersCheeredPerformancesModule {}
