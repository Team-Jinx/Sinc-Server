import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PerformanceCountModel {
  public performances!: number;
}
