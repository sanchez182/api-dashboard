import {
  ISchedule,
  IFoodTime,
  IFoodType,
  IDrink,
  ITables,
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
  @IsNotEmpty()
  isOpen: boolean;

  @IsString()
  @IsNotEmpty()
  readonly img: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsDate()
  @IsNotEmpty()
  readonly createdDate: Date;

  @IsDate()
  @IsNotEmpty()
  readonly updatedRegister: Date;

  @IsArray()
  @IsNotEmpty()
  readonly services: [];

  @IsArray()
  @IsNotEmpty()
  readonly schedule: ISchedule;

  @IsArray()
  @IsNotEmpty()
  readonly foodTimeList: IFoodTime;

  @IsArray()
  @IsNotEmpty()
  readonly foodTypeList: IFoodType;

  @IsArray()
  @IsNotEmpty()
  readonly drinkTypeList: IDrink;

  @IsArray()
  @IsNotEmpty()
  readonly tableList: ITables;
}
