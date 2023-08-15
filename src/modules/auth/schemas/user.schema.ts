import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from 'src/utils/constants';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Email already exists'] })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
