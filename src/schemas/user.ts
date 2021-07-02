/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({required:true})
  name: string;

  @Prop({ unique: true,required:true})
  email: string;

  @Prop({required:true})
  password: string;

  @Prop()
  role: string;

  @Prop({required:true})
  restaurant: string;

  @Prop()
  createDate: Date;

/*   @Prop({ type: [Types.ObjectId], ref: 'Organization' })
  organizations: string */
}

export const UserSchema = SchemaFactory.createForClass(User);
