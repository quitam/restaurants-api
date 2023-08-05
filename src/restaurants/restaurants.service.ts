import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Restaurant } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  // Get all Reataurants => GET /restaurants
  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel.find();
    return restaurants;
  }

  // Create a Restaurant => POST /restaurants
  async create(restaurant: Restaurant): Promise<Restaurant> {
    const res = await this.restaurantModel.create(restaurant);
    return res;
  }

  // Get a Restaurant by ID => GET /restaurants/:id
  async findById(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findById(id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    return restaurant;
  }

  // Update a Restaurant by ID => PUT /restaurants/:id
  async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
    const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate(
      id,
      restaurant,
      { new: true, runValidators: true },
    );

    if (!updatedRestaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    return updatedRestaurant;
  }

  // Delete a Restaurant by ID => DELETE /restaurants/:id
  async deleteById(id: string): Promise<Boolean> {
    const deletedRestaurant = await this.restaurantModel.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    return true;
  }
}
