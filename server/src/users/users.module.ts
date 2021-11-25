import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService, DateScalar],
})
export class UsersModule {}
