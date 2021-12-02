import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService, PrismaError } from 'src/prisma';

import { ArtistModel } from '.';
import { CreateArtistInput, FindArtistArgs, UpdateArtistInput } from './dtos';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly prismaService: PrismaService, // private util: UtilService,
  ) {}

  public async create(data: CreateArtistInput): Promise<ArtistModel> {
    return this.prismaService.artist.create({ data });
  }

  public async read(id: string): Promise<ArtistModel | null> {
    return this.prismaService.artist.findUnique({
      where: { id },
    });
  }

  public async find(args: FindArtistArgs): Promise<ArtistModel[]> {
    return this.prismaService.artist.findMany({ where: args });
  }

  public async update(id: string, artist: UpdateArtistInput): Promise<ArtistModel> {
    try {
      return await this.prismaService.artist.update({
        data: {
          ...artist,
          id: undefined,
        },
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === PrismaError.RECORD_DOES_NOT_EXIST) {
        throw new NotFoundException('post with id not found');
      }
      throw error;
    }
  }

  public async remove(id: string): Promise<boolean> {
    const result = await this.prismaService.artist.delete({ where: { id } });

    return !!result;
  }
}
