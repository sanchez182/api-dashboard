import { Order } from '../schemas/Order';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  public async findAll(): Promise<Order[]> {
    const restaurant = await this.orderModel.find().exec();
    if (!restaurant) {
      throw new NotFoundException(`Order not found`);
    }
    return restaurant;
  }

  public async findById(id: string): Promise<Order> {
    const order = await this.orderModel
      .findOne({ _id: id })
      .populate({
        path: 'itemsOrder.itemsFood.plate',
        model: 'Plate',
        select: { _id: 1, plateName: 1, ingredients: 1 },
      })
      .populate({
        path: 'itemsOrder.itemsDrink.drink',
        model: 'Drink',
        select: { _id: 1, drinkName: 1, ingredients: 1 },
      })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order not found`);
    }
    return order;
  }

  public async create(createOrderDto: CreateOrderDto): Promise<IOrder> {
    let newOrder = await new this.orderModel(createOrderDto);
    newOrder.save();

    newOrder = await newOrder
      .populate({
        path: 'itemsOrder.itemsFood.plate',
        model: 'Plate',
        select: { _id: 1, plateName: 1, ingredients: 1 },
      })
      .populate({
        path: 'itemsOrder.itemsDrink.drink',
        model: 'Drink',
        select: { _id: 1, drinkName: 1, ingredients: 1 },
      })
      .execPopulate();
    return newOrder;
  }

  public async update(
    updateOrderDto: UpdateOrderDto,
    OrderId: string,
  ): Promise<any> {
    console.log(updateOrderDto);
    const existingCustomer = await this.orderModel
      .findOneAndUpdate({ _id: OrderId }, updateOrderDto, {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      })
      .populate({
        path: 'itemsOrder.itemsFood.plate',
        model: 'Plate',
        select: { _id: 1, plateName: 1, ingredients: 1 },
      })
      .populate({
        path: 'itemsOrder.itemsDrink.drink',
        model: 'Drink',
        select: { _id: 1, drinkName: 1, ingredients: 1 },
      })
      .exec();

    if (!existingCustomer) {
      throw new NotFoundException(`Order  not found`);
    }

    console.log(existingCustomer);
    return existingCustomer;
  }

  public async remove(
    OrderId: { idOrder: string; idImg: string }[],
  ): Promise<any> {
    const OrdersId = [];
    const imagesId = [];
    OrderId.forEach((element) => {
      OrdersId.push(element.idOrder);
      imagesId.push(element.idImg);
    });

    const deletedCustomer = await this.orderModel.deleteMany({
      _id: {
        $in: OrdersId,
      },
    });
    return deletedCustomer;
  }
}
