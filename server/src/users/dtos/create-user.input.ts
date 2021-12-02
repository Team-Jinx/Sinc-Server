import { Field, InputType } from '@nestjs/graphql';

import { Role } from '.prisma/client';

@InputType()
export class CreateUserInput {
  @Field()
  public email!: string;

  @Field()
  public nickname!: string;

  @Field({ nullable: true })
  public phone!: string;

  @Field({ nullable: true })
  public profileUrl!: string;

  @Field()
  public role?: Role;
}
