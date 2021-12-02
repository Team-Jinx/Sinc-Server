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

  @Field(() => StoryType)
  @IsOptional()
  @IsIn(Object.keys(StoryType))
  public type?: StoryType;

  @IsOptional()
  @IsInt()
  public take?: number;

  @IsOptional()
  @IsInt()
  public skip?: number;
}
