import { ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindNotificationArgs {
  @IsOptional()
  @IsString()
  public userId?: string;

  @IsOptional()
  @IsString()
  public performanceId?: string;

  @IsOptional()
  @IsString()
  public storyId?: string;
}
