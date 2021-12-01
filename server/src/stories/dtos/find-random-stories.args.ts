import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderDirection } from 'src/common';

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
}
