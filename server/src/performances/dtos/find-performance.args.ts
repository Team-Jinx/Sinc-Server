import { ArgsType, Field } from '@nestjs/graphql';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

import { Category } from '.prisma/client';

@ArgsType()
export class FindPerformanceArgs {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public place?: string;

  @IsOptional()
  @IsString()
  public keyword?: string;

  @Field()
  @IsOptional()
  @IsString()
  @IsIn(Object.keys(Category))
  public category?: Category;

  @IsOptional()
  @IsString()
  public artistId?: string;

  @IsOptional()
  @IsInt()
  public take?: number;

  @IsOptional()
  @IsInt()
  public skip?: number;
}
