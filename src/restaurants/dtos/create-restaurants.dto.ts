import { InputType, OmitType, ObjectType, PickType, Field } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurants.entity';
import { MutationOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'coverImg',
  'address',
]) {
  @Field()
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends MutationOutput { }
