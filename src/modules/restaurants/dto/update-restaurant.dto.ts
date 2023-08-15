import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/modules/auth/schemas/user.schema';
import { Category } from 'src/utils/constants';

export class UpdateRestaurantDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsEmail({}, { message: 'Please enter valid email address' })
  @IsOptional()
  readonly email: string;

  @IsNumber()
  @IsOptional()
  readonly phoneNo: number;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsEnum(Category, { message: 'Please ennter valid category' })
  @IsOptional()
  readonly category: Category;

  @IsEmpty({ message: 'Cannot provide user ID.' })
  @IsOptional()
  readonly owner: User;
}
