import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './../schemas/restaurant';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto';
import { IRestaurant } from './interfaces/restaurant.interface';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
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

  public async findOne(restaurantId: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel
      .findById({ _id: restaurantId })
      .exec();

    if (!restaurant) {
      throw new NotFoundException(`Restaurant #${restaurantId} not found`);
    }

    return restaurant;
  }

  public async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<IRestaurant> {
    const newRestaurant = await new this.restaurantModel(createRestaurantDto);
    return newRestaurant.save();
  }

  public async update(
    idRestaurant: string,
    updateCustomerDto: UpdateRestaurantDto,
  ): Promise<IRestaurant> {
    console.log(updateCustomerDto)
    const existingCustomer = await this.restaurantModel.findByIdAndUpdate(
      { _id: idRestaurant },
      updateCustomerDto,
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Restaurant #${idRestaurant} not found`);
    }

    return existingCustomer;
  }

  public async remove(customerId: string): Promise<any> {
    const deletedCustomer = await this.restaurantModel.findByIdAndRemove(
      customerId,
    );
    return deletedCustomer;
  }
}
