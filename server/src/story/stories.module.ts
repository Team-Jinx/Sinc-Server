import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';

import { StoriesResolver } from './stories.resolver';
import { StoriesService } from './stories.service';

@Module({
  imports: [PrismaModule],
  providers: [StoriesResolver, StoriesService, DateScalar],
})
export class StoriesModule {}
