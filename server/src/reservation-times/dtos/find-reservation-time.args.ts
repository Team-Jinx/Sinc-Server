import { ArgsType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindReservationTimeArgs {
  @IsOptional()
  @IsString()
  public performanceId?: string;

  @IsOptional()
  @IsDate()
  public toReserveAt?: Date;
}
