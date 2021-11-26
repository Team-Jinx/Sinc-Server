import { ArgsType } from '@nestjs/graphql';
import { IsDate, IsIn, IsOptional, IsString } from 'class-validator';

import { Status } from '.prisma/client';

@ArgsType()
export class FindUsersBoughtPerformancesArgs {
  @IsOptional()
  @IsDate()
  public reservationTime?: Date;

  @IsOptional()
  @IsIn(Object.keys(Status))
  public status?: Status;

  @IsOptional()
  @IsString()
  public userId?: string;

  @IsOptional()
  @IsString()
  public performanceId?: string;
}
