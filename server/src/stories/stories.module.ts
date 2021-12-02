import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';
import { UsersBoughtPerformancesModule } from 'src/users-bought-performances';

import { StoriesResolver } from './stories.resolver';
import { StoriesService } from './stories.service';

@Module({
  imports: [PrismaModule, UsersBoughtPerformancesModule],
  providers: [StoriesResolver, StoriesService, DateScalar],
  exports: [StoriesService],
})
export class StoriesModule {}
