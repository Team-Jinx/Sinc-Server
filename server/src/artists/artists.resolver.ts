import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ArtistModel, ArtistWithCountModel } from '.';
import { Logger } from '../common';
import { ArtistsService } from './artists.service';
import { CreateArtistInput, FindArtistArgs, UpdateArtistInput } from './dtos';

@Resolver(() => ArtistModel)
export class ArtistsResolver {
  constructor(private readonly logger: Logger, private artistsService: ArtistsService) {
    this.logger.setContext(ArtistsResolver.name);
  }

  @Mutation(() => ArtistModel)
  public async createArtist(@Args('artistData') artistData: CreateArtistInput): Promise<ArtistModel> {
    this.logger.log('create');

    return this.artistsService.create(artistData);
  }

  @Query(() => ArtistModel)
  public async findArtistById(@Args('id', { type: () => ID }) id: string): Promise<ArtistModel> {
    this.logger.log('read');

    const user = await this.artistsService.read(id);

    if (!user) throw new NotFoundException('NotFoundData');

    return user;
  }

  @Query(() => [ArtistModel])
  public async findArtist(@Args() args: FindArtistArgs): Promise<ArtistModel[]> {
    this.logger.log('find');

    return this.artistsService.find(args);
  }

  @Query(() => [ArtistWithCountModel])
  public async findTwoArtists(): Promise<ArtistWithCountModel[]> {
    this.logger.log('find two artist');
    const artists = [];

    while (artists.length < 2) {
      const artist = await this.artistsService.findRandomOne();

      if (!artist) continue;
      if (artists.length === 1 && artist.id === artists?.[0].id) continue;

      artists.push(artist);
    }

    return artists;
  }

  @Mutation(() => ArtistModel)
  public async updateArtist(
    @Args('id', { type: () => ID }) id: string,
    @Args('artistData') artistData: UpdateArtistInput,
  ): Promise<ArtistModel> {
    this.logger.log('update');

    return this.artistsService.update(id, artistData);
  }

  @Mutation(() => Boolean)
  public async removeArtist(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    this.logger.log('remove');

    return this.artistsService.remove(id);
  }
}
