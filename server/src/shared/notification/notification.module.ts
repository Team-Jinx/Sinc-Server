import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';

import { NotificationService } from './notification.service';

@Module({
  imports: [PrismaModule],
  providers: [NotificationService, DateScalar],
  exports: [],
})
export class NotificationModule {}
