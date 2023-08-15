import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meal } from './schemas/meal.schema';
import * as mongoose from 'mongoose';
import { Restaurant } from '../restaurants/schemas/restaurant.schema';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal.name)
    private mealModel: mongoose.Model<Meal>,
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  // Create a new meal => POST /meals/:restaurant
  async createMeal(meal: Meal, user: User): Promise<Meal> {
    const data = Object.assign(meal, { user: user._id });

    const mealCreated = await this.mealModel.create(data);

    // Saving meal ID in the restaurant menu
    const restaurant = await this.restaurantModel.findById(meal.restaurant);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    restaurant.menu.push(mealCreated._id as unknown as Meal);
    await restaurant.save();

    return mealCreated;
  }
}
