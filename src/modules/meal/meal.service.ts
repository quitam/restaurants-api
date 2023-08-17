import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  // Get all meals => GET /meals
  async findAll(): Promise<Meal[]> {
    const meals = await this.mealModel.find();
    return meals;
  }

  // Get meal by restaurantId => GET /meals/:restaurantId
  async findByRestaurantId(restaurantId: string): Promise<Meal[]> {
    const meals = await this.mealModel.find({ restaurantId });
    return meals;
  }

  // Create a new meal => POST /meals/:restaurant
  async createMeal(meal: Meal, user: User): Promise<Meal> {
    const data = Object.assign(meal, { user: user._id });

    const mealCreated = await this.mealModel.create(data);

    // Saving meal ID in the restaurant menu
    const restaurant = await this.restaurantModel.findById(meal.restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    // Check ownership the restaurant
    if (restaurant.owner.toString() !== user._id.toString()) {
      throw new ForbiddenException('You are not the owner of this restaurant.');
    }

    restaurant.menu.push(mealCreated._id as unknown as Meal);
    await restaurant.save();

    return mealCreated;
  }

  // Get a meal by id => GET /meals/:id
  async findById(id: string): Promise<Meal> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Wrong mongoose ID format.');
    }

    const meal = await this.mealModel.findById(id);

    if (!meal) {
      throw new NotFoundException('Meal not found.');
    }

    return meal;
  }

  // Update a meal by id => PUT /meals/:id
  async updateMeal(id: string, meal: Meal): Promise<Meal> {
    return await this.mealModel.findByIdAndUpdate(id, meal, {
      new: true,
      runValidators: true,
    });
  }

  // Delete a meal by id => DELETE /meals/:id
  async deleteMealById(id: string): Promise<{ deleted: Boolean }> {
    await this.mealModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}
