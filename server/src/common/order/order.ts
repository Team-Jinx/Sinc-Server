import { Field, InputType } from '@nestjs/graphql';

import { OrderDirection } from './order-direction';

@InputType({ isAbstract: true })
export abstract class Order {
  @Field(() => OrderDirection)
  public direction!: OrderDirection;
}
