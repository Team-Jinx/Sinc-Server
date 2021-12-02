import { ArgsType, Field } from '@nestjs/graphql';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

import { StoryType } from '.prisma/client';

@ArgsType()
export class FindStoryArgs {
  @IsOptional()
  @IsString()
  public performanceId?: string;

  @IsOptional()
  @IsString()
  public artistId?: string;

  @IsOptional()
  @IsString()
  public keyword?: string;

  @Field(() => StoryType)
  @IsOptional()
  @IsIn(Object.keys(StoryType))
  public type?: StoryType;

  @IsOptional()
  @IsString()
  public userId?: string;

  @IsOptional()
  @IsInt()
  public take?: number;

  @IsOptional()
  @IsInt()
  public skip?: number;
}
