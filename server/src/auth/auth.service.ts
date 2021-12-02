import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';

import { AccessTokenModel, KakaoData, Payload } from '.';
import { JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private usersRepository: UsersRepository) {}

  public async loginUser(data: KakaoData): Promise<AccessTokenModel> {
    const userId = `${data.id}`;
    let user = await this.usersRepository.findUserByEmail(userId);

    if (!user) {
      user = await this.usersRepository.createUser(
        userId,
        data.properties?.nickname || userId,
        data.kakao_account?.profile?.thumbnail_image_url,
      );
    }

    const payload: JwtPayload = { sub: user.id, username: user.nickname, role: user.role, profileUrl: user.profileUrl };

    return { accessToken: this.jwt.sign(payload) };
  }

  public signJwt(user: Payload): AccessTokenModel {
    const payload: JwtPayload = { sub: user.id, username: user.nickname, role: user.role, profileUrl: user.profileUrl };

    return { accessToken: this.jwt.sign(payload) };
  }
}
