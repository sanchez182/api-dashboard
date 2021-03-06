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

  @Get('/:id')
  public async getRestaurant(@Res() res, @Param('id') restaurantId: string) {
    const restaurant = await this.stockService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('restaurant does not exist!');
    }
    return res.status(HttpStatus.OK).json(restaurant);
  }

  @Post()
  @UseGuards(AuthGuard())
  public async addStock(
    @Res() res,
    @Body() createRestaurantDto: CreateStockDto,
  ) {
    try {
      const restaurant = await this.stockService.create(createRestaurantDto);
      return res.status(HttpStatus.OK).json({
        message: 'restaurant has been created successfully',
        restaurant,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: restaurant not created!',
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
