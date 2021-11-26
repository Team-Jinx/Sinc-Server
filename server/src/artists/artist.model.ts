import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '아티스트 테이블' })
export class Artist {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public name!: string;

  @Field(() => String, { nullable: true })
  public agency?: string | null;

  @Field(() => String, { nullable: true })
  public profileUrl?: string | null;

  // @Field(() => [Performance])
  // public performances!: Performance[];
}
