import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateArtistInput {
  @Field()
  public name?: string;

  @Field({ nullable: true })
  public agency?: string;

  @Field({ nullable: true })
  public profileUrl?: string;
}
