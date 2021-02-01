import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurants.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurants.dto';
import { User } from 'src/users/entities/users.entity';
import { Category } from './entities/category.entity';
import {
  EditRestaurantOutput,
  EditRestaurantInput,
} from './dtos/edit-restaurants.dto';
import { CategoryRepository } from './repositories/category.repository';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private readonly categories: CategoryRepository,
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = await this.restaurants.save(createRestaurantInput);
      newRestaurant.owner = owner;
      const category = await this.categories.getOrCreateCategory(
        createRestaurantInput.categoryName,
      );
      newRestaurant.category = category;
      await this.restaurants.save(newRestaurant);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create restaurant',
      };
    }
  }

  async editRestaurant(
    owner: User,
    editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    try {
      const { restaurantId: id } = editRestaurantInput;
      const restaurant = await this.restaurants.findOneOrFail(
        { id },
        { loadRelationIds: true },
      );
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: "You can't edit a restaurant that you don't own",
        };
      }
      let category: Category = null;
      if (editRestaurantInput.categoryName) {
        category = await this.categories.getOrCreateCategory(
          editRestaurantInput.categoryName,
        );
      }
      if (restaurant) {
        await this.restaurants.save({
          id,
          ...editRestaurantInput,
          ...(category && { category }),
        });
      }
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Restaurant cannot update',
      };
    }
  }

  async deleteRestaurant(
    owner: User,
    deleteRestaurantInput: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    const { restaurantId: id } = deleteRestaurantInput;
    try {
      const restaurant = await this.restaurants.findOne(id);
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: "You can't delete a restaurant that you don't own",
        };
      }

      // await this.restaurants.delete(id);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not delete restaurant',
      };
    }
  }

  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categories.find();
      return {
        ok: true,
        categories,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load categories',
      };
    }
  }

  countRestaurants(category: Category) {
    return this.restaurants.count({ category });
  }
}
