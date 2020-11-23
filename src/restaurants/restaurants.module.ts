import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurants.resolver';
import { Query } from '@nestjs/graphql';

@Module({ providers: [RestaurantResolver] })
export class RestaurantsModule {
  @Query((returns) => Boolean)
  isPizzaGood() {
    return true;
  }
}
