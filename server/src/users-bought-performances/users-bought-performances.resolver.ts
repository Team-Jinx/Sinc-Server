import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersBoughtPerformancesModel } from '.';
import { Logger } from '../common';
import { CreateUsersBoughtPerformancesInput, FindUsersBoughtPerformancesArgs, UpdateUsersBoughtPerformancesInput } from './dtos';
import { UsersBoughtPerformancesService } from './users-bought-performances.service';

@Resolver(() => UsersBoughtPerformancesModel)
export class UsersBoughtPerformancesResolver {
  constructor(private readonly logger: Logger, private usersBoughtPerformancesService: UsersBoughtPerformancesService) {
    this.logger.setContext(UsersBoughtPerformancesResolver.name);
  }

  @Mutation(() => UsersBoughtPerformancesModel)
  public async createUsersBoughtPerformances(
    @Args('usersBoughtPerformancesData') usersBoughtPerformancesData: CreateUsersBoughtPerformancesInput,
  ): Promise<UsersBoughtPerformancesModel> {
    this.logger.log('create');

    return this.usersBoughtPerformancesService.create(usersBoughtPerformancesData);
  }

  @Query(() => UsersBoughtPerformancesModel)
  public async findUsersBoughtPerformancesById(@Args('id', { type: () => ID }) id: string): Promise<UsersBoughtPerformancesModel> {
    this.logger.log('read');

    const user = await this.usersBoughtPerformancesService.read(id);

    if (!user) throw new NotFoundException('NotFoundData');

    return user;
  }

  @Query(() => [UsersBoughtPerformancesModel])
  public async findUsersBoughtPerformances(@Args() args: FindUsersBoughtPerformancesArgs): Promise<UsersBoughtPerformancesModel[]> {
    this.logger.log('find');

    return this.usersBoughtPerformancesService.find(args);
  }

  @Mutation(() => UsersBoughtPerformancesModel)
  public async updateUsersBoughtPerformances(
    @Args('id', { type: () => ID }) id: string,
    @Args('usersBoughtPerformancesData') usersBoughtPerformancesData: UpdateUsersBoughtPerformancesInput,
  ): Promise<UsersBoughtPerformancesModel> {
    this.logger.log('update');

    return this.usersBoughtPerformancesService.update(id, usersBoughtPerformancesData);
  }

  @Mutation(() => Boolean)
  public async removeUsersBoughtPerformances(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    this.logger.log('remove');

    return this.usersBoughtPerformancesService.remove(id);
  }
}