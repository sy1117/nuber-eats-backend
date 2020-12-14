import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/users.entity';

@ArgsType()
export class UserProfileInput {
  @Field((type) => Number)
  id: number;
}

@ObjectType()
export class UserProfileOutput extends MutationOutput {
  @Field((returns) => User)
  user: User;
}
