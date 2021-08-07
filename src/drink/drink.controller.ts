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
import { CreateDrinkDto, UpdateDrinkDto } from './dto';
import { DrinkService } from './drink.service';

@Controller('api/drink')
export class DrinkController {
  constructor(private drinkService: DrinkService) {}

  @Get()
  public async getAll(@Res() res) {
    const drink = await this.drinkService.findAll();
    if (!drink) {
      throw new NotFoundException('Drink does not exist!');
    }
    return res.status(HttpStatus.OK).json(drink);
  }

  @Post()
  // @UseGuards(AuthGuard())
  public async addDrink(@Res() res, @Body() createDrinkDto: CreateDrinkDto) {
    try {
      const drink = await this.drinkService.create(createDrinkDto);
      return res.status(HttpStatus.OK).json({
        message: 'Drink has been created successfully',
        drink,
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Drink not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  public async updateDrink(
    @Res() res,
    @Param('id') drinkId: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ) {
    try {
      const drink = await this.drinkService.update(updateDrinkDto, drinkId);
      if (!drink) {
        throw new NotFoundException('Drink does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Drink has been successfully updated',
        drink,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Drink not updated!',
        status: 400,
      });
    }
  }

  @Delete()
  @UseGuards(AuthGuard())
  public async deleteDrink(@Res() res, @Body() drinkId: []) {
    if (!drinkId) {
      throw new NotFoundException('Drink ID does not exist');
    }

    const drink = await this.drinkService.remove(drinkId);

    if (!drink) {
      throw new NotFoundException('Drink does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Drink has been deleted',
      drink,
    });
  }
}
