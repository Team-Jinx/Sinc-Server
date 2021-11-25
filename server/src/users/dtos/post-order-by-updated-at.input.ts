import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

@InputType()
export class PostOrderByUpdatedAtInput {
  @Field(() => SortOrder)
  public updatedAt!: SortOrder;
}
