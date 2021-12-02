import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

import { UserModel } from '.';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createUser(id: string, nickname: string, profileUrl?: string): Promise<UserModel> {
    return this.prisma.user.create({ data: { email: id, nickname, profileUrl } });
  }

  public async findUserByEmail(email: string): Promise<UserModel | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }
}
