import { Role } from '.prisma/client';

export interface JwtPayload {
  sub: string;
  username: string;
  role: Role;
  profileUrl: string | null;
}

export interface KakaoData {
  id: number;
  has_signed_up?: boolean;
  connected_at?: Date;
  synched_at?: Date;
  properties?: KakaoProperties;
  kakao_account?: KakaoAccountAccount;
}

export interface KakaoProperties {
  nickname?: string;
  thumbnail_image_url?: string;
  profile_image_url?: string;
  is_default_image?: string;
}

export interface KakaoAccountAccount {
  profile_needs_agreement?: boolean;
  profile_nickname_needs_agreement?: boolean;
  profile_image_needs_agreement?: boolean;
  profile?: KakaoProfile;
  name_needs_agreement?: boolean;
  name?: string;
  email_needs_agreement?: boolean;
  is_email_valid?: boolean;
  is_email_verified?: boolean;
  email?: string;
  age_range_needs_agreement?: boolean;
  age_range?: string;
  birthyear_needs_agreement?: boolean;
  birthyear?: string;
  birthday_needs_agreement?: boolean;
  birthday?: string;
  birthday_type?: string;
  gender_needs_agreement?: boolean;
  gender?: string;
  phone_number_needs_agreement?: boolean;
  phone_number?: string;
  ci_needs_agreement?: boolean;
  ci?: string;
  ci_authenticated_at?: Date;
}

export interface KakaoProfile {
  nickname?: string;
  thumbnail_image_url?: string;
  profile_image_url?: string;
  is_default_image?: boolean;
}

export interface CodeResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope?: string;
}
