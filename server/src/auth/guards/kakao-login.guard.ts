import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';

import { KakaoStrategy } from '../strategies';

@Injectable()
export class KakaoLoginGuard implements CanActivate {
  constructor(private readonly kakaoStrategy: KakaoStrategy) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const token: string = <string>request.headers.authorization;

    if (!token) throw new UnauthorizedException();

    const result = await this.kakaoStrategy.validateTokenAndDecode(token);
    request.body = result;

    return true;
  }

  public getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context).getContext();
    return <Request>ctx.req;
  }
}
