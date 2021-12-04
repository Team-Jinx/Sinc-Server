import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindPopularStoriesArgs {
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  public take?: number;

  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  public skip?: number;

  @Field(() => ID)
  @IsDefined()
  @IsString()
  public userId?: string;
}
