import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

import { Post } from './post.model';

@ObjectType()
export class User {
  @Field(() => ID)
  public id!: number;

  @Field()
  @IsEmail()
  public email!: string;

  @Field(() => String, { nullable: true })
  public name?: string | null;

  @Field(() => [Post], { nullable: true })
  public posts?: [Post] | null;
}
