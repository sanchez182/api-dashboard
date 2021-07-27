import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';
import { ISupplier } from './interfaces/supplier.interface';
import { Supplier } from 'src/schemas/supplier';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name)
    private readonly supplierModel: Model<Supplier>,
  ) {}

  // public async findAll(
  //   paginationQuery: PaginationQueryDto,
  // ): Promise<Customer[]> {
  //   const { limit, offset } = paginationQuery;

  //   return await this.restaurantModel
  //     .find()
  //     .skip(offset)
  //     .limit(limit)
  //     .populate('organization')
  //     .exec();
  // }
  public async findAll(): Promise<Supplier[]> {
    return await this.supplierModel.find().exec();
  }

  public async findOne(supplierId: string): Promise<Supplier> {
    const restaurant = await this.supplierModel
      .findById({ _id: supplierId })
      .exec();

    if (!restaurant) {
      throw new NotFoundException(`Supplier #${supplierId} not found`);
    }

    return restaurant;
  }

  public async addSupplier(
    createStockDto: CreateSupplierDto,
  ): Promise<ISupplier> {
    const stock = await new this.supplierModel(createStockDto);
    return stock.save();
  }

  public async update(
    supplierId: string,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<ISupplier> {
    const existingCustomer = await this.supplierModel.findByIdAndUpdate(
      { _id: supplierId },
      updateSupplierDto,
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Supplier #${supplierId} not found`);
    }

    return null;
  }

  public async remove(customerId: string): Promise<any> {
    const deletedCustomer = await this.supplierModel.findByIdAndRemove(
      customerId,
    );
    return deletedCustomer;
  }
}
