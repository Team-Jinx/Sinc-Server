import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

import { Status } from '.prisma/client';

@ArgsType()
export class FindUsersBoughtPerformancesArgs {
  @Field()
  @IsOptional()
  @IsIn(Object.keys(Status))
  public status?: Status;

  @IsOptional()
  @IsString()
  public userId?: string;

  @IsOptional()
  @IsString()
  public performanceId?: string;

  @IsOptional()
  @IsString()
  public reservationTimeId?: string;

  @Field(() => Int)
  @IsOptional()
  @IsInt()
  public take?: number;

  @Field(() => Int)
  @IsOptional()
  @IsInt()
  public skip?: number;
}
