/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

@Schema({ collection: 'stock' })
export class Stock extends Document {
  @Prop({required:true,unique: true})
  name: string;

  @Prop()
  itemStock : [{
    itemdDescription: string,
    quantityPortion: number,
    price: number,
    registerDate: Date
  }]
  
}

export const StockSchema = SchemaFactory.createForClass(Stock);
