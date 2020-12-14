import {
  InputType,
  ObjectType,
  OmitType,
  Field,
  PickType,
} from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Verification } from '../entities/verification.entity';

@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) {
  @Field((types) => String)
  code: string;
}

@ObjectType()
export class VerifyEmailOutput extends MutationOutput {}
