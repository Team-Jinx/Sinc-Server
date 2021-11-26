import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateNotificationInput {
  @Field()
  @IsOptional()
  public performanceId!: string;

  @Field()
  @IsOptional()
  public storyId!: string;
}
