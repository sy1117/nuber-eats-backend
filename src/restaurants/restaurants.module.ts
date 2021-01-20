import { Module } from '@nestjs/common';
import { RestaurantsResolver } from './restaurants.resolver';
import { Query } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurants.entity';
import { Category } from './entities/category.entity';
import { RestaurantsService } from './restaturants.service';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository])],
  providers: [RestaurantsResolver, RestaurantsService],
  exports: [RestaurantsService]
})
export class RestaurantsModule {
  @Query((returns) => Boolean)
  isPizzaGood() {
    return true;
  }
}
