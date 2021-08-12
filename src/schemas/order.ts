/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IOrdersItem } from '../Order/interfaces/Order.interface';

@Schema({ collection: 'orders' })
export class Order extends Document {
 
  @Prop()
  state: number;

  @Prop()
  restaurant: string;

  @Prop()
  extraInfo: string;
  
  @Prop()
  tableNumber: number;
  
  @Prop({type:Object})
  itemsOrder: IOrdersItem
}

export const OrderSchema = SchemaFactory.createForClass(Order);
