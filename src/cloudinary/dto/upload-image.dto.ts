import { IsNotEmpty, IsString } from 'class-validator';
export class UploadImageDto {
  @IsString()
  @IsNotEmpty()
  readonly folder: string;
}
