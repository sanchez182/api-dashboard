/* eslint-disable @typescript-eslint/ban-types */
import { Document } from 'mongoose';

export interface IIngredients {
  ingredientName: string;
  portions: number;
}

export interface IDrinkModel extends Document {
  readonly drinkName: string;
  readonly description: string;
  readonly idImg: string;
  readonly urlImage: string;
  readonly price: number;
  readonly drinkType: string;
  readonly showInMenu: boolean;
  readonly ingredients: IIngredients;
  readonly updatatedDate: Date;
}
