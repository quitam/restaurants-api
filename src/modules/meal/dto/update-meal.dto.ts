import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/modules/auth/schemas/user.schema';
import { Category } from 'src/utils/constants';

export class UpdateMealDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(Category, { message: 'Please ennter valid category.' })
  readonly category: Category;

  @IsOptional()
  @IsString()
  readonly restaurantId: string;

  @IsEmpty({ message: 'Cannot provide user ID.' })
  readonly user: User;
}
