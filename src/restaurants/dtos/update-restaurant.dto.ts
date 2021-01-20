import { InputType, PartialType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurants.entity';

@InputType()
export class UpdateRestaurantDto extends PartialType(Restaurant) { }
