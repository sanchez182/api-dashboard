import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePlateDto } from './create-plate.dto';
export class UpdatePlateDto extends PartialType(CreatePlateDto) {
    @IsString()
    @IsNotEmpty()
    readonly _id: string;
}
