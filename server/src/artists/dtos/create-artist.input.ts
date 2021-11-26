import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArtistInput {
  @Field()
  public name!: string;

  @Field({ nullable: true })
  public agency?: string;

  @Field({ nullable: true })
  public profileUrl?: string;
}
