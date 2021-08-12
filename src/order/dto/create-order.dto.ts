import { IsNotEmpty, IsString, IsNumber, IsObject } from 'class-validator';
import { IOrdersItem } from '../interfaces/order.interface';
export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  readonly state: number;

  @IsNumber()
  readonly tableNumber: number;

  @IsString()
  @IsNotEmpty()
  readonly restaurant: string;

  @IsString()
  readonly extraInfo: string;

  @IsObject()
  @IsNotEmpty()
  readonly itemsOrder: IOrdersItem;
}
