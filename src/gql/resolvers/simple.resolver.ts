import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { ForbiddenError } from 'apollo-server-express';

import { JwtAuthGuard } from '../../auth';
import { Logger, ReqUser, Roles, RolesGuard } from '../../common';
import { SimpleInput, SimpleArgs } from '../dto';
import { Payload, Post, User } from '../models';
import { SimpleService } from '../providers';

@Resolver(() => Post)
export class SimpleResolver {
  constructor(private readonly logger: Logger, private simpleService: SimpleService) {
    this.logger.setContext(SimpleResolver.name);
  }

  @ResolveField()
  public async author(@Root() post: Post): Promise<User | null> {
    return this.simpleService.readWithAuthor(post.id);
  }

  @Query(() => Payload)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('test')
  public user(@ReqUser() user: Payload): Payload {
    this.logger.log('user');
    if (!user) {
      throw new ForbiddenError('NotFoundUser');
    }

    return user;
  }

  @Mutation(() => Post)
  public async create(@Args('simpleData') simpleData: SimpleInput): Promise<Post> {
    this.logger.log('create');

    return this.simpleService.create(simpleData);
  }

  @Query(() => Post /** { nullable: true} */)
  public async postById(@Args('id', { type: () => ID }) id: number): Promise<Post> {
    this.logger.log('read');

    const simple = await this.simpleService.read(id);

    if (!simple) throw new NotFoundException('NotFoundData');

    return simple;
  }

  @Query(() => [Post])
  public async find(@Args() simpleArgs: SimpleArgs): Promise<Post[]> {
    this.logger.log('find');

    return this.simpleService.find(simpleArgs);
  }

  @Mutation(() => Boolean)
  public remove(@Args('id', { type: () => ID }) id: number): void {
    this.logger.log('remove');

    return this.simpleService.remove(id);
  }
}
