import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenModel {
  public accessToken!: string;
}
