import { Stock } from './../schemas/stock';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStockDto, UpdateStockDto } from './dto';
import { IStock } from './interfaces/stock.interface';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name)
    private readonly restaurantModel: Model<Stock>,
  ) {}

  /*   public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Customer[]> {
    const { limit, offset } = paginationQuery;

    return await this.restaurantModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('organization')
      .exec();
  } */

  public async findOne(restaurantId: string): Promise<Stock> {
    const restaurant = await this.restaurantModel
      .findById({ _id: restaurantId })
      .exec();

    if (!restaurant) {
      throw new NotFoundException(`Restaurant #${restaurantId} not found`);
    }

    return restaurant;
  }

  public async create(createRestaurantDto: CreateStockDto): Promise<IStock> {
    const newRestaurant = await new this.restaurantModel(createRestaurantDto);
    return null;
  }

  public async update(
    customerId: string,
    updateCustomerDto: UpdateStockDto,
  ): Promise<IStock> {
    const existingCustomer = await this.restaurantModel.findByIdAndUpdate(
      { _id: customerId },
      updateCustomerDto,
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Customer #${customerId} not found`);
    }

    return null;
  }

  public async remove(customerId: string): Promise<any> {
    const deletedCustomer = await this.restaurantModel.findByIdAndRemove(
      customerId,
    );
    return deletedCustomer;
  }
}
