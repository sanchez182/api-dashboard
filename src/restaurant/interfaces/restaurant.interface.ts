/* eslint-disable @typescript-eslint/ban-types */
import { Document } from 'mongoose';

export interface IDrink {
  drinkTypeName: string;
  isActive: boolean;
  showInApp: boolean;
}

export interface IFoodType {
  foodTypeName: string;
  isActive: boolean;
  showInApp: boolean;
}
export interface IFoodTime {
  foodTimeName: string;
  isActive: boolean;
  showInApp: boolean;
}

export interface ITables {
  tableNumber: number;
  selected: boolean;
  state: string;
}

export interface ISchedule {
  day: string;
  hour: string;
}
export interface IRestaurant extends Document {
  readonly name: string;
  readonly restaurantDescription: string;
  readonly ubication: any;
  readonly urlMenu: string;
  readonly isOpen: boolean;
  readonly isActive: boolean;
  readonly img: string;
  readonly phone: string;
  readonly createdDate: Date;
  readonly updatedRegister: Date;
  readonly services: [];
  readonly schedule: ISchedule;
  readonly foodTimeList: IFoodTime;
  readonly foodTypeList: IFoodType;
  readonly drinkTypeList: IDrink;
  readonly tableList: ITables;
}
