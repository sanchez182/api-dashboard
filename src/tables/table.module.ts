import { TableSchema } from './../schemas/tables';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Table } from 'src/schemas/tables';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
  ],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
