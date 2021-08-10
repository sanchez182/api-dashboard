import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTableDto, UpdateTablesDto } from './dto';
import { ITable } from './interfaces/table.interface';
import { Table } from 'src/schemas/tables';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Table.name)
    private readonly TableModel: Model<Table>,
  ) {}
  // paginationQuery: PaginationQueryDto,

  //  const { limit, offset } = paginationQuery;
  public async findAll(): Promise<Table[]> {
    return await this.TableModel.find().exec();
  }

  public async getDataTable(): Promise<Table> {
    const Table = await this.TableModel.findOne().exec();
    if (!Table) {
      throw new NotFoundException(`Table not found`);
    }

    return Table;
  }

  public async create(createTableDto: CreateTableDto): Promise<ITable> {
    const newTable = await new this.TableModel(createTableDto);
    return newTable.save();
  }

  public async update(
    updateTableDto: UpdateTablesDto,
    tableId: string,
  ): Promise<any> {
    console.log(tableId);
    const existingCustomer = await this.TableModel.findByIdAndUpdate(
      { _id: tableId },
      updateTableDto,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      },
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Table  not found`);
    }

    console.log(existingCustomer);
    return existingCustomer;
  }

  public async updateState(seleted: boolean, tableId: string): Promise<any> {
    console.log(tableId);
    const existingCustomer = await this.TableModel.findByIdAndUpdate(
      { _id: tableId },
      { $set: { selected: seleted } },
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      },
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Table  not found`);
    }

    console.log(existingCustomer);
    return existingCustomer;
  }

  public async remove(tableId: string): Promise<any> {
    const deletedCustomer = await this.TableModel.findByIdAndRemove(tableId);
    return deletedCustomer;
  }
}
