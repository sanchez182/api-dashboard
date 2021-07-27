import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { IIngredients } from '../interfaces/plate.interface';
export class CreatePlateDto {
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly plateName: string;

  @IsString()
  @IsNotEmpty()
  readonly img: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly showInMenu: boolean;

  @IsString()
  @IsNotEmpty()
  readonly plateDescription: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly foodType: string;

  @IsArray()
  @IsNotEmpty()
  readonly ingredients: IIngredients;

  @IsDate()
  @IsNotEmpty()
  readonly updatatedDate: Date;
}
