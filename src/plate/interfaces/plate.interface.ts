/* eslint-disable @typescript-eslint/ban-types */
import { Document } from 'mongoose';

export interface IIngredients {
  ingredientName: string;
  portions: number;
}

export interface IPlate extends Document {
  readonly plateName: string;
  readonly description: string;
  readonly idImg: string;
  readonly urlImage: string;
  readonly price: number;
  readonly foodType: string;
  readonly foodTime: string;
  readonly showInMenu: boolean;
  readonly ingredients: IIngredients;
  readonly updatatedDate: Date;
}
