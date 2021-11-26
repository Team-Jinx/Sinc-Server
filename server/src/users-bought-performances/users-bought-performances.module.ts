import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';

import { UsersBoughtPerformancesResolver } from './users-bought-performances.resolver';
import { UsersBoughtPerformancesService } from './users-bought-performances.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersBoughtPerformancesResolver, UsersBoughtPerformancesService, DateScalar],
})
export class UsersBoughtPerformancesModule {}
