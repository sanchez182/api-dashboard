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

  public async getDataRestaurant(): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findOne().exec();
    if (!restaurant) {
      throw new NotFoundException(`Restaurant not found`);
    }

    return restaurant;
  }

  public async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<IRestaurant> {
    const newRestaurant = await new this.restaurantModel(createRestaurantDto);
    return newRestaurant.save();
  }

  public async update(updateCustomerDto: UpdateRestaurantDto): Promise<any> {
    console.log(updateCustomerDto);
    const existingCustomer = await this.restaurantModel.findOneAndUpdate(
      {},
      updateCustomerDto,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      },
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Restaurant  not found`);
    }

    console.log(existingCustomer);
    return existingCustomer;
  }

  public async remove(customerId: string): Promise<any> {
    const deletedCustomer = await this.restaurantModel.findByIdAndRemove(
      customerId,
    );
    return deletedCustomer;
  }
}
