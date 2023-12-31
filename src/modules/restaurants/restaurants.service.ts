import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  // Get all Reataurants => GET /restaurants
  async findAll(query: ExpressQuery): Promise<Restaurant[]> {
    const limit = 5;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;

    const search = query.search
      ? {
          name: { $regex: query.search, $options: 'i' },
        }
      : {};

    const restaurants = await this.restaurantModel
      .find({ ...search })
      .limit(limit)
      .skip(skip);
    return restaurants;
  }

  // Create a Restaurant => POST /restaurants
  async create(restaurant: Restaurant, user: User): Promise<Restaurant> {
    const data = Object.assign(restaurant, { owner: user._id });

    const res = await this.restaurantModel.create(data);
    return res;
  }

  // Get a Restaurant by ID => GET /restaurants/:id
  async findById(id: string): Promise<Restaurant> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Wrong mongoose ID format.');
    }

    const restaurant = await this.restaurantModel.findById(id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    return restaurant;
  }

  // Update a Restaurant by ID => PUT /restaurants/:id
  async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  // Delete a Restaurant by ID => DELETE /restaurants/:id
  async deleteById(id: string): Promise<{ deleted: Boolean }> {
    await this.restaurantModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}
