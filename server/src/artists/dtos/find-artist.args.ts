import { ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindArtistArgs {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public agency?: string;
}
