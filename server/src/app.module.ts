import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  ConfigModule,
  // ConfigService
} from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';

import { BaseModule } from './base';
import { CommonModule, ExceptionsFilter, LoggerMiddleware } from './common';
import { configuration } from './config';
import { GqlModule } from './gql';
// import { SampleModule } from './sample';

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
    // Service Modules
    CommonModule, // Global
    BaseModule,
    GqlModule,
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
