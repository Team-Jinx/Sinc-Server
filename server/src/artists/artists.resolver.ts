import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ArtistModel } from '.';
import { Logger } from '../common';
import { ArtistsService } from './artists.service';
import { CreateArtistInput, FindArtistArgs, UpdateArtistInput } from './dtos';

@Resolver(() => ArtistModel)
export class ArtistsResolver {
  constructor(private readonly logger: Logger, private usersService: ArtistsService) {
    this.logger.setContext(ArtistsResolver.name);
  }

  @Mutation(() => ArtistModel)
  public async createArtist(@Args('artistData') artistData: CreateArtistInput): Promise<ArtistModel> {
    this.logger.log('create');

    return this.usersService.create(artistData);
  }

  @Query(() => ArtistModel)
  public async findArtistById(@Args('id', { type: () => ID }) id: string): Promise<ArtistModel> {
    this.logger.log('read');

    const user = await this.usersService.read(id);

    if (!user) throw new NotFoundException('NotFoundData');

    return user;
  }

  @Query(() => [ArtistModel])
  public async findArtist(@Args() args: FindArtistArgs): Promise<ArtistModel[]> {
    this.logger.log('find');

    return this.usersService.find(args);
  }

  @Mutation(() => ArtistModel)
  public async updateArtist(
    @Args('id', { type: () => ID }) id: string,
    @Args('artistData') artistData: UpdateArtistInput,
  ): Promise<ArtistModel> {
    this.logger.log('update');

    return this.usersService.update(id, artistData);
  }

  @Mutation(() => Boolean)
  public async removeArtist(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    this.logger.log('remove');

    return this.usersService.remove(id);
  }
}
