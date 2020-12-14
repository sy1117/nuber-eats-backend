import {
  PartialType,
  OmitType,
  ObjectType,
  InputType,
  Field,
  PickType,
} from '@nestjs/graphql';
import { User } from '../entities/users.entity';
import { MutationOutput } from 'src/common/dtos/output.dto';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}

@ObjectType()
export class EditProfileOutput extends MutationOutput {
  @Field((returns) => User)
  user?: User;
}
