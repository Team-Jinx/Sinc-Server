import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';

import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService, DateScalar, UsersRepository],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
