/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

@Schema({ collection: 'supplier' })
export class Supplier extends Document {
  @Prop({required:true,unique: true})
   supplierName: string;

   @Prop({ type: Array})
   phoneList: [];

   @Prop({required:true})
   direction: string;

  @Prop({required:true,unique: true})
   email: string;
  
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
