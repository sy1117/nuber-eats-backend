import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((types) => Boolean)
  createAccount(@Args('input') createAccountInput: CreateAccountInput) {
    return true;
  }
}
