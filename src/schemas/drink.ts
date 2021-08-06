/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IIngredients } from 'src/plate/interfaces/plate.interface';

@Schema({ collection: 'drinks' })
export class Drink extends Document {
  @Prop({ unique: true, required: true })
  drinkName: string;

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
  drinkType: string;
  
  @Prop()
  showInMenu: boolean;
}

export const DrinkSchema = SchemaFactory.createForClass(Drink);
