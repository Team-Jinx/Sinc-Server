import { Field, ObjectType } from '@nestjs/graphql';

import { Role } from '.prisma/client';

@ObjectType()
export class Payload {
  @Field(() => Role)
  public role!: Role;

  public id!: string;
  public nickname!: string;
  public profileUrl!: string | null;
}
