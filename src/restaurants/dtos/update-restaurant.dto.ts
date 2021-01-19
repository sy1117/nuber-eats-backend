import { InputType, PartialType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class UpdateRestaurantDto extends PartialType(Restaurant) {}
