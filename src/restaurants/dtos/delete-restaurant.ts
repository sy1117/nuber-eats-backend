import { MutationOutput } from 'src/common/dtos/output.dto';
import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class DeleteRestaurantInput {
  @Field((type) => Number)
  restaurantId: string;
}

@ObjectType()
export class DeleteRestaurantOutput extends MutationOutput {}
