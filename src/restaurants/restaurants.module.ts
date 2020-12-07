import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurants.resolver';
import { Query } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaturants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {
  @Query((returns) => Boolean)
  isPizzaGood() {
    return true;
  }
}
