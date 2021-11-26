import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn } from 'class-validator';

import { Category } from '.prisma/client';

@InputType()
export class CreatePerformanceInput {
  @Field()
  public title!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field()
  public place!: string;

  @Field(() => Int, { nullable: true })
  public price?: number;

  @Field()
  public showTime!: string;

  @Field(() => Int)
  public runningTime!: number;

  @Field()
  public posterUrl?: string;

  @Field()
  @IsIn(Object.keys(Category))
  public category!: Category;

  @Field()
  public artistId!: string;
}
