import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from 'src/common';

import { CodeResponse, KakaoData } from '..';

@Injectable()
export class KakaoStrategy {
  private readonly KAKAO_URI: string = 'https://kapi.kakao.com';

  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  public async validateTokenAndDecode(code: string): Promise<KakaoData | null> {
    const clientIdKey = this.configService.get('kakaoOAuth.clientId');
    const redirectUri = this.configService.get('kakaoOAuth.redirectUri');
    const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientIdKey}&redirect_uri=${redirectUri}&code=${code}`;

    try {
      const tokenData = await lastValueFrom(this.httpService.post<CodeResponse>(url));

      const { data } = await lastValueFrom(
        this.httpService.post<KakaoData>(
          `${this.KAKAO_URI}/v2/user/me`,
          {
            property_keys: ['properties.nickname', 'properties.profile_image', 'properties.thumbnail_image', 'kakao_account.profile'],
          },
          { headers: { Authorization: `Bearer ${tokenData.data.access_token}` } },
        ),
      );

      return data;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
