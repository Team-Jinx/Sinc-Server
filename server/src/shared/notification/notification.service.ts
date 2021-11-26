import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';

import { NotificationModel } from '.';
import { CreateNotificationInput, FindNotificationArgs, UpdateNotificationInput } from './dtos';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(data: CreateNotificationInput): Promise<NotificationModel> {
    return this.prismaService.notification.create({ data });
  }

  // public async readWithAuthor(id: string): Promise<NotificationModel | null> {
  //   return this.prismaService.post.findUnique({ where: { id } }).author();
  // }

  public async read(id: string): Promise<NotificationModel | null> {
    return this.prismaService.notification.findUnique({
      where: { id },
    });
  }

  public async find(args: FindNotificationArgs): Promise<NotificationModel[]> {
    return this.prismaService.notification.findMany({ where: args });
  }

  public async update(id: string, notification: UpdateNotificationInput): Promise<NotificationModel> {
    try {
      return await this.prismaService.notification.update({
        data: {
          ...notification,
          id: undefined,
        },
        where: { id },
      });
    } catch (error) {
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error instanceof PrismaClientKnownRequestError && error.code === PrismaError.RECORD_DOES_NOT_EXIST) {
        throw new NotFoundException('post with id not found');
      }
      throw error;
    }
  }

  public async remove(id: string): Promise<boolean> {
    const result = await this.prismaService.notification.delete({ where: { id } });

    return !!result;
  }
}
