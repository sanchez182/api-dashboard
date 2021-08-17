import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderService } from './order.service';
@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  public async getAll(@Res() res) {
    const order = await this.orderService.findAll();
    if (!order) {
      throw new NotFoundException('Order does not exist!');
    }
    return res.status(HttpStatus.OK).json(order);
  }

  @Get('/:id')
  public async findById(@Res() res, @Param('id') id: string) {
    const order = await this.orderService.findById(id);
    if (!order) {
      throw new NotFoundException('Order does not exist!');
    }
    return res.status(HttpStatus.OK).json(order);
  }

  @Post()
  public async addOrder(@Res() res, @Body() createOrderDto: CreateOrderDto) {
    try {
      console.log(createOrderDto);
      const order = await this.orderService.create(createOrderDto);
      return res.status(HttpStatus.OK).json({
        message: 'Order has been created successfully',
        order,
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Order not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateOrder(
    @Res() res,
    @Param('id') OrderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const order = await this.orderService.update(updateOrderDto, OrderId);
      if (!order) {
        throw new NotFoundException('Order does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Order has been successfully updated',
        order,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Order not updated!',
        status: 400,
      });
    }
  }

  @Put('/:id/:state')
  @UseGuards(AuthGuard())
  public async updateOrderStatus(
    @Res() res,
    @Param('id') orderId: string,
    @Param('state') state: number,
  ) {
    try {
      const order = await this.orderService.updateOrderStatus(state, orderId);
      if (!order) {
        throw new NotFoundException('Order does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Order has been successfully updated',
        order,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Order not updated!',
        status: 400,
      });
    }
  }

  @Put('/:id/:clientId')
  public async updateOrderClientId(
    @Res() res,
    @Param('id') orderId: string,
    @Param('clientId') clientId: string,
  ) {
    try {
      const order = await this.orderService.updateOrderClientId(
        clientId,
        orderId,
      );
      if (!order) {
        throw new NotFoundException('Order does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Order has been successfully updated',
        order,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Order not updated!',
        status: 400,
      });
    }
  }

  @Delete()
  @UseGuards(AuthGuard())
  public async deleteOrder(@Res() res, @Body() orderId: []) {
    if (!orderId) {
      throw new NotFoundException('Order ID does not exist');
    }

    const order = await this.orderService.remove(orderId);

    if (!order) {
      throw new NotFoundException('Order does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Order has been deleted',
      order,
    });
  }
}
