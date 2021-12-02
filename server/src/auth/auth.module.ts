import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma';
import { UsersModule } from 'src/users';

import { UserModule } from '../shared/user';
import { AuthResolver } from './auth.resolver';
import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { JwtStrategy, KakaoStrategy } from './strategies';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    PrismaModule,
    forwardRef(() => UsersModule),
  ],
  providers: [AuthResolver, AuthService, AuthSerializer, KakaoStrategy, JwtStrategy],
})
export class AuthModule {}
