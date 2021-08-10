/* eslint-disable @typescript-eslint/ban-types */
import { Document, Types } from 'mongoose';

export interface IOrdersItem {
  state: string;
  restaurant: string;
  tableNumber: number;
  itemsFood: [
    {
      quantity: number;
      plate: {
        type: Types.ObjectId;
        ref: 'Plate';
      };
    },
  ];
  itemsDrink: [
    {
      quantity: number;
      drink: {
        type: Types.ObjectId;
        ref: 'Drink';
      };
    },
  ];
}

export interface IOrder extends Document {
  readonly state: string;
  readonly restaurant: string;
  readonly tableNumber: number;
  readonly itemsOrder: IOrdersItem;
}
