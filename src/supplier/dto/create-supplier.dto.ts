import { MaxLength, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  readonly supplierName: string;

  @IsArray()
  @IsNotEmpty()
  readonly phoneList: [];

  @IsString()
  @IsNotEmpty()
  readonly direction: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;
}
