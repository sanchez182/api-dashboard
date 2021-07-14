import {
  ISchedule,
  IFoodTime,
  IFoodType,
  IDrink,
  ITables,
  IService,
} from './../interfaces/restaurant.interface';
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsArray,
  IsBoolean,
  IsDate,
  IsObject,
} from 'class-validator';
export class UpdateRestaurantDto {
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly restaurantDescription: string;

  @IsObject()
  readonly ubication: {
    long: number;
    lat: number;
  };

  @IsBoolean()
  isOpen: boolean;

  @IsString()
  readonly img: string;

  @IsBoolean()
  readonly isActive: boolean;

  @IsArray()
  readonly phoneList: [];

  @IsDate()
  readonly createdDate: Date;

  @IsDate()
  readonly updatedRegister: Date;

  @IsObject()
  readonly services: IService;

  @IsArray()
  readonly schedule: ISchedule;

  @IsArray()
  @IsNotEmpty()
  readonly foodTimeList: IFoodTime;

  @IsArray()
  readonly foodTypeList: IFoodType;

  @IsArray()
  readonly drinkTypeList: IDrink;

  @IsArray()
  readonly tableList: ITables;
}
