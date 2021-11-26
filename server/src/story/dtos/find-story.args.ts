import { ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindStoryArgs {
  @IsOptional()
  @IsString()
  public performanceId?: string;
}
