import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderDirection } from 'src/common';

import { Category } from '.prisma/client';

@ArgsType()
export class FindRandomStoriesArgs {
  @Field(() => Int, { description: '가져올 갯수. + - 가능' })
  @IsDefined()
  @IsNumber()
  public take!: number;

  @Field(() => ID, { description: '기준 노드 id값' })
  @IsOptional()
  @IsString()
  public cursor?: string;

  @IsOptional()
  @IsString()
  public field?: string;

  @IsOptional()
  @IsString()
  public direction?: OrderDirection;

  @Field(() => Category, { description: '안넣으면 전체, 넣으면 해당 카테고리만' })
  @IsOptional()
  @IsString()
  public category?: Category;
}
