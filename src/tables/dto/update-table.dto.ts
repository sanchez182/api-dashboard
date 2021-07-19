import { CreateTableDto } from './create-table.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTablesDto extends PartialType(CreateTableDto) {}
