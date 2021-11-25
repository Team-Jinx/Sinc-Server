import { ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindUserArgs {
  @IsOptional()
  @IsString()
  public email?: string;

  @IsOptional()
  @IsString()
  public nickname?: string;
}
