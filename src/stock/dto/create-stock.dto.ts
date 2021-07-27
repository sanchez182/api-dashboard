import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreateStockDto {
  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  readonly itemdDescription: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantityPortion: number;

  readonly code: string;

  @IsDate()
  readonly registerDate: Date;
}
