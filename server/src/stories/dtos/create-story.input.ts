import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateStoryInput {
  @IsOptional()
  @Field()
  public videoUrl?: string;

  @IsOptional()
  @Field()
  public imageUrl?: string;

  @Field()
  public description!: string;

  @Field()
  public performanceId!: string;
}
