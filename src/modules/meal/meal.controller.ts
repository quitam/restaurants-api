import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meal } from './schemas/meal.schema';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('meals')
export class MealController {
  constructor(private mealService: MealService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createMeal(
    @Body() createMealDto: CreateMealDto,
    @CurrentUser() user: User,
  ): Promise<Meal> {
    return this.mealService.createMeal(createMealDto, user);
  }
}
