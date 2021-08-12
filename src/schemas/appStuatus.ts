/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

@Schema({ collection: 'appStatus' })
export class AppStatus extends Document {
 
  @Prop({type: Array})
  orderStatus: [];

  @Prop({type: Array})
  tableStatus: [];
}

export const AppStatusSchema = SchemaFactory.createForClass(AppStatus);
