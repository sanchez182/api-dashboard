import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsObject,
} from 'class-validator';
import { IOrdersItem } from '../interfaces/order.interface';
export class CreateOrderDto {
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly state: string;

  @IsNumber()
  readonly tableNumber: number;

  @IsString()
  @IsNotEmpty()
  readonly restaurant: string;

  @IsObject()
  @IsNotEmpty()
  readonly itemsOrder: IOrdersItem;
}
