/* eslint-disable @typescript-eslint/ban-types */
import { Document } from 'mongoose';

export interface IDrink {
  drinkTypeName: string;
  isActive: boolean;
  showInApp: boolean;
}

export interface IFoodType {
  foodTypeName: string;
  showInApp: boolean;
}
export interface IFoodTime {
  foodTimeName: string;
  showInApp: boolean;
}
export interface ISchedule {
  day: string;
  hour: string;
  open: boolean;
}

export interface IService {
  express: boolean;
  inSite: boolean;
  toGo: boolean;
}
export interface IRestaurant extends Document {
  readonly name: string;
  readonly email: string;
  readonly restaurantDescription: string;
  readonly ubication: any;
  readonly urlMenu: string;
  readonly isOpen: boolean;
  readonly img: string;
  readonly phoneList: [];
  readonly createdDate: Date;
  readonly updatedRegister: Date;
  readonly services: IService;
  readonly schedule: ISchedule;
  readonly foodTimeList: IFoodTime;
  readonly foodTypeList: IFoodType;
  readonly drinkTypeList: IDrink;
}
