import { InputType, OmitType, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { CoreOutput } from 'src/common/entities/core.output';

@InputType()
export class CreateRestaurantInput extends OmitType(Restaurant, [
  'id',
  'category',
  'owner',
]) {}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
