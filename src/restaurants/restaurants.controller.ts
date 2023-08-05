import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Post()
  async createRestaurant(
    @Body()
    restaurant: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(restaurant);
  }

  @Get(':id')
  async getRestaurantById(
    @Param('id')
    id: string,
  ): Promise<Restaurant> {
    return this.restaurantsService.findById(id);
  }

  @Put(':id')
  async updateRestaurantById(
    @Param('id')
    id: string,
    @Body()
    restaurant: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.updateById(id, restaurant);
  }

  @Delete(':id')
  async deleteRestaurantById(
    @Param('id')
    id: string,
  ): Promise<Boolean> {
    return this.restaurantsService.deleteById(id);
  }
}
