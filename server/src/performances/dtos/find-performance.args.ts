import { ArgsType, Field } from '@nestjs/graphql';
import { IsIn, IsOptional, IsString } from 'class-validator';

import { Category } from '.prisma/client';

@ArgsType()
export class FindPerformanceArgs {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public place?: string;

  @Field()
  @IsOptional()
  @IsString()
  @IsIn(Object.keys(Category))
  public category?: Category;
}
