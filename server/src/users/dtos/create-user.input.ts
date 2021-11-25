import { Field, InputType } from '@nestjs/graphql';

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
}
