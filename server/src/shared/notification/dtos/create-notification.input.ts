import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateNotificationInput {
  @Field()
  public message!: string;

  @Field()
  public type!: string;

  @Field()
  @IsOptional()
  public userId!: string;

  @Field()
  @IsOptional()
  public performanceId!: string;

  @Field()
  @IsOptional()
  public storyId!: string;
}
