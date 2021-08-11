/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IOrdersItem } from 'src/Order/interfaces/Order.interface';

@Schema({ collection: 'orders' })
export class Order extends Document {
 
  @Prop()
  state: string;

  @Prop()
  restaurant: string;

  @Prop()
  tableNumber: number;
  
  @Prop({type:Object})
  itemsOrder: IOrdersItem
}

export const OrderSchema = SchemaFactory.createForClass(Order);
