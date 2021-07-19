import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateTableDto {
  @IsNumber()
  @IsNotEmpty()
  readonly tableNumber: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly selected: boolean;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  readonly state: string;
}
