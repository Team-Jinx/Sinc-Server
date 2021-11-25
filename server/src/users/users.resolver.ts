import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ForbiddenError } from 'apollo-server-express';

import { JwtAuthGuard } from '../auth';
import { Logger, ReqUser, Roles, RolesGuard } from '../common';
import { CreateUserInput, FindUserArgs } from './dtos';
import { Payload, User } from './models';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly logger: Logger, private usersService: UsersService) {
    this.logger.setContext(UsersResolver.name);
  }

  // @ResolveField()
  // public async author(@Root() user: User): Promise<User | null> {
  //   return this.usersService.readWithAuthor(user.id);
  // }

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

  @Mutation(() => User)
  public async create(@Args('userData') userData: CreateUserInput): Promise<User> {
    this.logger.log('create');

    return this.usersService.create(userData);
  }

  @Query(() => User)
  public async userById(@Args('id', { type: () => ID }) id: string): Promise<User> {
    this.logger.log('read');
    this.logger.log(id);
    const user = await this.usersService.read(id);

    if (!user) throw new NotFoundException('NotFoundData');

    return user;
  }

  @Query(() => [User])
  public async find(@Args() args: FindUserArgs): Promise<User[]> {
    this.logger.log('find');

    return this.usersService.find(args);
  }

  @Mutation(() => Boolean)
  public async remove(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    this.logger.log('remove');

    return this.usersService.remove(id);
  }
}
