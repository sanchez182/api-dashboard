import {
  IFoodType,
  IFoodTime,
  IDrink,
  ISchedule,
  IService,
} from './../restaurant/interfaces/restaurant.interface';
/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'restaurantDetail' })
export class Restaurant extends Document {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  restaurantDescription: string;

  @Prop({ type: Object})
  ubication: {
    long: number;
    lat: number;
    direction: string;
  };

  @Prop()
  img: string;

  @Prop({ unique: true , required: true})
  urlMenu: string;

/*   @Prop()
  isActive: boolean; */

  @Prop()
  isOpen: boolean;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedRegister: Date;

  @Prop({ type: Object})
  services: IService; // express, en sitio, para llevar

  @Prop({ type: Array})
  schedule: ISchedule;

  @Prop({ type: Array})
  phoneList: [];

  @Prop({ type: Array})
  foodTimeList: IFoodTime;

  @Prop({ type: Array})
  foodTypeList: IFoodType;

  @Prop({ type: Array })
  drinkTypeList: IDrink;
}

export const RestautantSchema = SchemaFactory.createForClass(Restaurant);
