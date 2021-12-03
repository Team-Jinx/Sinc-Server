import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth';

import { UsersCheeredPerformancesModel } from '.';
import { Logger } from '../common';
import { CreateUsersCheeredPerformancesInput, FindUsersCheeredPerformancesArgs, UpdateUsersCheeredPerformancesInput } from './dtos';
import { UsersCheeredPerformancesService } from './users-cheered-performances.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => UsersCheeredPerformancesModel)
export class UsersCheeredPerformancesResolver {
  constructor(private readonly logger: Logger, private usersCheeredPerformancesService: UsersCheeredPerformancesService) {
    this.logger.setContext(UsersCheeredPerformancesResolver.name);
  }

  @Mutation(() => UsersCheeredPerformancesModel)
  public async createUsersCheeredPerformances(
    @Args('usersCheeredPerformancesData') usersCheeredPerformancesData: CreateUsersCheeredPerformancesInput,
  ): Promise<UsersCheeredPerformancesModel> {
    this.logger.log('create');

    return this.usersCheeredPerformancesService.create(usersCheeredPerformancesData);
  }

  @Query(() => UsersCheeredPerformancesModel)
  public async findUsersCheeredPerformancesById(@Args('id', { type: () => ID }) id: string): Promise<UsersCheeredPerformancesModel> {
    this.logger.log('read');

    const user = await this.usersCheeredPerformancesService.read(id);

    if (!user) throw new NotFoundException('NotFoundData');

    return user;
  }

  @Query(() => [UsersCheeredPerformancesModel])
  public async findUsersCheeredPerformances(@Args() args: FindUsersCheeredPerformancesArgs): Promise<UsersCheeredPerformancesModel[]> {
    this.logger.log('find');

    return this.usersCheeredPerformancesService.find(args);
  }

  @Mutation(() => UsersCheeredPerformancesModel)
  public async updateUsersCheeredPerformances(
    @Args('id', { type: () => ID }) id: string,
    @Args('usersCheeredPerformancesData') usersCheeredPerformancesData: UpdateUsersCheeredPerformancesInput,
  ): Promise<UsersCheeredPerformancesModel> {
    this.logger.log('update');

    return this.usersCheeredPerformancesService.update(id, usersCheeredPerformancesData);
  }

  @Mutation(() => Boolean)
  public async removeUsersCheeredPerformances(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    this.logger.log('remove');

    return this.usersCheeredPerformancesService.remove(id);
  }
}
