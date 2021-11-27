import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReserveAt {
  public toReserveAt!: Date | null;
}
