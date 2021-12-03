import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsIn, IsOptional } from 'class-validator';

import { StoryType } from '.prisma/client';

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

  @Field(() => StoryType)
  @IsDefined()
  @IsIn(Object.keys(StoryType))
  public type!: StoryType;
}
