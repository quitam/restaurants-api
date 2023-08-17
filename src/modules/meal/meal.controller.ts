import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meal } from './schemas/meal.schema';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('meals')
export class MealController {
  constructor(private mealService: MealService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllMeals(): Promise<Meal[]> {
    return this.mealService.findAll();
  }

  @Get('restaurant/:restaurantId')
  @UseGuards(AuthGuard())
  async getMealsByRestaurantId(
    @Param('restaurantId') restaurantId: string,
  ): Promise<Meal[]> {
    return this.mealService.findByRestaurantId(restaurantId);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createMeal(
    @Body() createMealDto: CreateMealDto,
    @CurrentUser() user: User,
  ): Promise<Meal> {
    return this.mealService.createMeal(createMealDto, user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getMealById(@Param('id') id: string): Promise<Meal> {
    return this.mealService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateMeal(
    @Param('id') id: string,
    @Body() meal: UpdateMealDto,
    @CurrentUser() user: User,
  ): Promise<Meal> {
    const res = await this.mealService.findById(id);
    if (res.user.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        'Can not update, you are not the owner of this meal.',
      );
    }
    return this.mealService.updateMeal(id, meal);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteMeal(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<{ deleted: Boolean }> {
    const res = await this.mealService.findById(id);
    if (res.user.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        'Can not delete, you are not the owner of this meal.',
      );
    }
    return this.mealService.deleteMealById(id);
  }
}
