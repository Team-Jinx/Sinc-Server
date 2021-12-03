import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ForbiddenError } from 'apollo-server-express';

import { JwtAuthGuard, Payload } from '../auth';
import { Logger, ReqUser, Roles, RolesGuard } from '../common';
import { CreateUserInput, FindUserArgs } from './dtos';
import { UserModel } from './models';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly logger: Logger, private usersService: UsersService) {
    this.logger.setContext(UsersResolver.name);
  }

  // @ResolveField()
  // public async author(@Root() user: UserModel): Promise<UserModel | null> {
  //   return this.usersService.readWithAuthor(user.id);
  // }

  @Query(() => Payload)
  @UseGuards(RolesGuard)
  @Roles('USER')
  public user(@ReqUser() user: Payload): Payload {
    this.logger.log('user');
    if (!user) {
      throw new ForbiddenError('NotFoundUser');
    }

    return user;
  }

  @Mutation(() => UserModel)
  public async createUser(@Args('userData') userData: CreateUserInput): Promise<UserModel> {
    this.logger.log('create');

    return this.usersService.create(userData);
  }

  @Query(() => UserModel)
  public async findUserById(@Args('id', { type: () => ID }) id: string): Promise<UserModel> {
    this.logger.log('read');

    const user = await this.usersService.read(id);

    if (!user) throw new NotFoundException('NotFoundData');

    return user;
  }

  @Query(() => [UserModel])
  public async findUser(@Args() args: FindUserArgs): Promise<UserModel[]> {
    this.logger.log('find');

    return this.usersService.find(args);
  }

  @Mutation(() => Boolean)
  public async removeUser(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    this.logger.log('remove');

    return this.usersService.remove(id);
  }
}
