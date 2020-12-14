import { MutationOutput } from 'src/common/dtos/output.dto';
import { InputType, PickType, Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/users.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
  @Field((type) => String)
  token?: string;
}
