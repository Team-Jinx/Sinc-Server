import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'src/prisma';

import { SimpleService } from './providers';
import { SimpleResolver } from './resolvers';
import { DateScalar } from './scalars';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get('graphql'),
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  providers: [SimpleResolver, SimpleService, DateScalar],
})
export class GqlModule {}
