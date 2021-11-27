import { ArgsType, Field } from '@nestjs/graphql';
import { IsIn, IsOptional, IsString } from 'class-validator';

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
}
