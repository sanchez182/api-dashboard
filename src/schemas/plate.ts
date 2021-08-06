/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IIngredients } from 'src/plate/interfaces/plate.interface';

@Schema({ collection: 'plate' })
export class Plate extends Document {
  @Prop({ unique: true, required: true })
  plateName: string;

  @Prop()
  description: string;

  @Prop()
  idImg: string;

  @Prop()
  urlImage: string;
  
  @Prop({ required: true})
  price: number;

  @Prop({ type: Array})
  ingredients: IIngredients;

  @Prop()
  updatatedDate: Date;

  @Prop()
  foodType: string;

  @Prop()
  foodTime: string;
  
  @Prop()
  showInMenu: boolean;
}

export const PlateSchema = SchemaFactory.createForClass(Plate);
