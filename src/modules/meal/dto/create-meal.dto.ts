import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from 'src/modules/auth/schemas/user.schema';
import { Category } from 'src/utils/constants';

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please ennter valid category.' })
  readonly category: Category;

  @IsNotEmpty()
  @IsString()
  readonly restaurant: string;

  @IsEmpty({ message: 'Cannot provide user ID.' })
  readonly user: User;
}
