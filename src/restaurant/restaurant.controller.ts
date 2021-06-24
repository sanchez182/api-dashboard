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
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller('api/restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafkaSample',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'my-kafka-consumer', // Should be the same thing we give in consumer
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    // Need to subscribe to topic
    // so that we can get the response from kafka microservice
    this.client.subscribeToResponseOf('caca');
    console.log('jajajjaja');
    await this.client.connect();
  }

  @Get('/:id')
  public async getRestaurant(@Res() res, @Param('id') restaurantId: string) {
    const restaurant = await this.restaurantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('restaurant does not exist!');
    }
    console.log('cacacaca');
    this.client.emit<string>('caca', 'ssss ');
    return res.status(HttpStatus.OK).json(restaurant);
  }

  @Post()
  @UseGuards(AuthGuard())
  public async addrestaurant(
    @Res() res,
    @Body() createRestaurantDto: CreateRestaurantDto,
  ) {
    try {
      const restaurant = await this.restaurantService.create(
        createRestaurantDto,
      );
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
  public async updaterestaurant(
    @Res() res,
    @Param('id') restaurantId: string,
    @Body() updaterestaurantDto: UpdateRestaurantDto,
  ) {
    try {
      const restaurant = await this.restaurantService.update(
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
