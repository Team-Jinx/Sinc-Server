import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindUsersCheeredPerformancesArgs {
  @IsString()
  public userId!: string;

  @IsOptional()
  @IsString()
  public performanceId?: string;

  @IsOptional()
  @IsString()
  public storyId?: string;

  @Field(() => Int)
  @IsOptional()
  @IsInt()
  public skip?: number;

  @Field(() => Int)
  @IsOptional()
  @IsInt()
  public take?: number;
}
