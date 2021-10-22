/* eslint-disable @typescript-eslint/ban-types */
import { Document, Types } from 'mongoose';

export interface IOrdersItem {
  state: string;
  restaurant: string;
  tableNumber: number;
  itemsFood: [
    {
      quantity: number;
      authorized: boolean;
      plate: {
        type: Types.ObjectId;
        ref: 'Plate';
      };
    },
  ];
  itemsDrink: [
    {
      quantity: number;
      authorized: boolean;
      drink: {
        type: Types.ObjectId;
        ref: 'Drink';
      };
    },
  ];
}

export interface IOrder extends Document {
  readonly state: number;
  readonly idRestaurant: string;
  readonly trackingCode: string;
  readonly tableNumber: number;
  readonly extraInfo: string;
  readonly clientId: string;
  readonly itemsOrder: IOrdersItem;
}
