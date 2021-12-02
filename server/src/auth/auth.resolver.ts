import { UseGuards, Req } from '@nestjs/common';
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { Request } from 'express';
import { UserModel } from 'src/users';

import { AuthenticatedGuard, JwtAuthGuard, KakaoLoginGuard, Payload, AccessTokenModel } from '.';
import { Logger, ReqUser } from '../common';
import { AuthService } from './auth.service';

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private readonly logger: Logger, private authService: AuthService) {
    this.logger.setContext(AuthResolver.name);
  }

  @Mutation(() => AccessTokenModel)
  @UseGuards(KakaoLoginGuard)
  public async loginByKakao(@Context() ctx: any): Promise<AccessTokenModel> {
    this.logger.log('kakao login');

    return this.authService.loginUser(ctx.req.body);
  }

  @Query(() => Payload)
  @UseGuards(AuthenticatedGuard)
  public checkUser(@ReqUser() user: Payload): Payload | undefined {
    return user;
  }

  @Mutation(() => AccessTokenModel)
  // @UseGuards(LocalAuthGuard)
  public loginByJwt(@Req() req: Request): AccessTokenModel {
    return this.authService.signJwt(<Payload>req.user);
  }

  @Query(() => Payload)
  @UseGuards(JwtAuthGuard)
  public checkJwt(@ReqUser() user: Payload): Payload | undefined {
    return user;
  }
}
