import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateUsersCheeredPerformancesInput {
  @Field()
  public userId!: string;

  @Field()
  @IsOptional()
  public performanceId!: string;

  @Field()
  @IsOptional()
  public storyId!: string;
}
