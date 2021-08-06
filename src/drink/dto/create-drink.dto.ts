import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { IIngredients } from '../interfaces/drink.interface';
export class CreateDrinkDto {
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly drinkName: string;

  @IsString()
  readonly idImg: string;

  @IsString()
  @IsNotEmpty()
  readonly urlImage: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly showInMenu: boolean;

  @IsString()
  @IsNotEmpty({ message: ' description is required' })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly drinkType: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsArray()
  readonly ingredients: IIngredients;

  @IsDate()
  @IsNotEmpty()
  readonly updatatedDate: Date;
}
