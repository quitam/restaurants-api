import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from 'src/modules/auth/schemas/user.schema';
import { RestaurantCategory } from 'src/utils/constants';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter valid email address.' })
  readonly email: string;

  @IsNotEmpty()
  @IsNumber()
  readonly phoneNo: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(RestaurantCategory, {
    message: 'Please ennter valid restaurant category.',
  })
  readonly category: RestaurantCategory;

  @IsEmpty({ message: 'Cannot provide user ID.' })
  readonly owner: User;
}
