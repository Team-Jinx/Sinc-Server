import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  public description: string = 'Date custom scalar type';

  public parseValue(value: number): Date {
    return new Date(value); // from client
  }

  public serialize(value: Date): number {
    return value.getTime(); // to client
  }

  public parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      try {
        const number = String(ast.value);
        return new Date(number);
      } catch {
        return null;
      }
    }
    return null;
  }
}
