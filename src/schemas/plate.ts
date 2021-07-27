/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IIngredients } from 'src/plate/interfaces/plate.interface';

@Schema({ collection: 'plate' })
export class Plate extends Document {
  @Prop({ unique: true, required: true })
  plateName: string;

  @Prop()
  plateDescription: string;

  @Prop()
  img: string;

  @Prop({ unique: true , required: true})
  price: number;

  @Prop({ type: Array})
  ingredients: IIngredients;

  @Prop()
  updatatedDate: Date;

  @Prop()
  foodType: string;

  @Prop()
  showInMenu: boolean;
}

export const PlateSchema = SchemaFactory.createForClass(Plate);
