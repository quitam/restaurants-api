import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/utils/constants';
import * as mongoose from 'mongoose';
import { User } from 'src/modules/auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Meal {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
  restaurant: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
