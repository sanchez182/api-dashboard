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
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto';
import { RestaurantService } from './restaurant.service';
@Controller('api/restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get()
  public async getRestaurant(@Res() res) {
    const restaurant = await this.restaurantService.getDataRestaurant();
    if (!restaurant) {
      throw new NotFoundException('restaurant does not exist!');
    }
    return res.status(HttpStatus.OK).json(restaurant);
  }

  @Post()
 // @UseGuards(AuthGuard())
  public async addrestaurant(
    @Res() res,
    @Body() createRestaurantDto: CreateRestaurantDto,
  ) {
    try {
      console.log(createRestaurantDto);
      const restaurant = await this.restaurantService.create(
        createRestaurantDto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'restaurant has been created successfully',
        restaurant,
      });
    } catch (err) {
      console.log(err)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: restaurant not created!',
        status: 400,
      });
    }
  }

  @Put()
  //@UseGuards(AuthGuard())
  public async updaterestaurant(
    @Res() res,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    try {
      const restaurant = await this.restaurantService.update(
        updateRestaurantDto,
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

    const restaurant = await this.restaurantService.remove(restaurantId);

    if (!restaurant) {
      throw new NotFoundException('restaurant does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'restaurant has been deleted',
      restaurant,
    });
  }
}
