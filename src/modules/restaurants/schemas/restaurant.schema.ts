import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/modules/auth/schemas/user.schema';
import { RestaurantCategory } from 'src/utils/constants';
import * as mongoose from 'mongoose';
import { Meal } from 'src/modules/meal/schemas/meal.schema';

@Schema({
  timestamps: true,
})
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  email: string;

  @Prop()
  phoneNo: number;

  @Prop()
  address: string;

  @Prop()
  category: RestaurantCategory;

  @Prop()
  images?: object[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }])
  menu?: Meal[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
