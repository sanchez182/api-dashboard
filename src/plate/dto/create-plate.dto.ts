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

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly foodType: string;

  @IsString()
  @IsNotEmpty()
  readonly foodTime: string;
  
  @IsArray()
  @IsNotEmpty()
  readonly ingredients: IIngredients;

  @IsDate()
  @IsNotEmpty()
  readonly updatatedDate: Date;
}
