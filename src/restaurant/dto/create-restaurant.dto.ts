import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
export class CreateRestaurantDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
}
