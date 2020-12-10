import { InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurants.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class UpdateRestaurantDto extends PartialType(Restaurant) {}
