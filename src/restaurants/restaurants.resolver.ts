import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dtos/create-restaurants.dto';
import { RestaurantService } from './restaturants.service';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/users.entity';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((returns) => Boolean)
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(
        authUser,
        createRestaurantInput,
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args('id') id: number,
    @Args('data') data: UpdateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant({ id, ...data });
      return true;
    } catch (error) {
      return false;
    }
  }
}
