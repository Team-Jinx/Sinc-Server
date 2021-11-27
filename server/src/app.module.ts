import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ArtistsModule } from './artists';
import { BaseModule } from './base';
import { CommonModule, ExceptionsFilter, LoggerMiddleware } from './common';
import { configuration } from './config';
import { PerformancesModule } from './performances';
import { ReservationTimesModule } from './reservation-times';
import { StoriesModule } from './stories';
import { UsersModule } from './users';
import { UsersBoughtPerformancesModule } from './users-bought-performances';
import { UsersCheeredPerformancesModule } from './users-cheered-performances';

@Module({
  imports: [
    // Configuration
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Static Folder
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../../public`,
      renderPath: '/',
    }),
    // GraphQL
    GraphQLModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get('graphql'),
      }),
      inject: [ConfigService],
    }),
    // Service Modules
    CommonModule, // Global
    BaseModule,
    UsersModule,
    ArtistsModule,
    PerformancesModule,
    ReservationTimesModule,
    StoriesModule,
    UsersCheeredPerformancesModule,
    UsersBoughtPerformancesModule,
  ],
  providers: [
    // Global Guard, Authentication check on all routers
    // { provide: APP_GUARD, useClass: AuthenticatedGuard },
    // Global Filter, Exception check
    { provide: APP_FILTER, useClass: ExceptionsFilter },
  ],
})
export class AppModule implements NestModule {
  // Global Middleware, Inbound logging
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
