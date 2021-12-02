import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  @UseGuards(JwtAuthGuard)
  public loginByJwt(@ReqUser() user: Payload): AccessTokenModel {
    return this.authService.signJwt(user);
  }

  @Query(() => Payload)
  @UseGuards(JwtAuthGuard)
  public checkJwt(@ReqUser() user: Payload): Payload | undefined {
    return user;
  }
}
