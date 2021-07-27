/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

@Schema({ collection: 'stock' })
export class Stock extends Document {
  @Prop({required:true,unique: true})
   itemdDescription: string;


  @Prop({required:true,unique: true})
   quantityPortion: number;

  @Prop({unique: true})
   code: string;

  @Prop({required:true,unique: true})
   registerDate: Date;
  
}

export const StockSchema = SchemaFactory.createForClass(Stock);
