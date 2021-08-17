/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IOrdersItem } from '../order/interfaces/order.interface';

@Schema({ collection: 'orders' })
export class Order extends Document {
 
  @Prop()
  state: number;

  @Prop()
  idRestaurant: string;

  @Prop()
  extraInfo: string;

  @Prop()
  clientId: string;
  
  @Prop()
  trackingCode: string;
  
  @Prop()
  tableNumber: number;
  
  @Prop({type:Object})
  itemsOrder: IOrdersItem
}

export const OrderSchema = SchemaFactory.createForClass(Order);
