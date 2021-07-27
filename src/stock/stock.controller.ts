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
import { CreateStockDto, UpdateStockDto } from './dto';
import { StockService } from './stock.service';

@Controller('api/stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get()
  public async findAll(@Res() res) {
    const stockList = await this.stockService.findAll();
    if (!stockList) {
      throw new NotFoundException('There are not records!');
    }
    return res.status(HttpStatus.OK).json(stockList);
  }

  @Get('/:id')
  public async getStockById(@Res() res, @Param('id') restaurantId: string) {
    const restaurant = await this.stockService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('restaurant does not exist!');
    }
    return res.status(HttpStatus.OK).json(restaurant);
  }

  @Post('addItemStock')
  @UseGuards(AuthGuard())
  public async addStock(@Res() res, @Body() addStock: CreateStockDto) {
    try {
      const stock = await this.stockService.addItemStock(addStock);
      return res.status(HttpStatus.OK).json({
        message: 'Item has been add successfully',
        stock,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Item not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  public async updateStock(
    @Res() res,
    @Param('id') restaurantId: string,
    @Body() updaterestaurantDto: UpdateStockDto,
  ) {
    try {
      const restaurant = await this.stockService.update(
        restaurantId,
        updaterestaurantDto,
      );
      if (!restaurant) {
        throw new NotFoundException('restaurant does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'restaurant has been successfully updated',
        restaurant,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: restaurant not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public async deleterestaurant(@Res() res, @Param('id') restaurantId: string) {
    if (!restaurantId) {
      throw new NotFoundException('restaurant ID does not exist');
    }

    const restaurant = await this.stockService.remove(restaurantId);

    if (!restaurant) {
      throw new NotFoundException('restaurant does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'restaurant has been deleted',
      restaurant,
    });
  }
}
