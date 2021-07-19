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
import { CreateTableDto, UpdateTablesDto } from './dto';
import { TableService } from './table.service';
@Controller('api/tables')
export class TableController {
  constructor(private tableService: TableService) {}

  @Get()
  public async getAlltables(@Res() res) {
    const restaurant = await this.tableService.findAll();
    console.log(restaurant)
    if (!restaurant) {
      throw new NotFoundException('Table does not exist!');
    }
    return res.status(HttpStatus.OK).json(restaurant);
  }

  @Post()
  @UseGuards(AuthGuard())
  public async addNewTable(@Res() res, @Body() createTable: CreateTableDto) {
    try {
      const restaurant = await this.tableService.create(createTable);
      return res.status(HttpStatus.OK).json({
        message: 'Table has been created successfully',
        restaurant,
      });
    } catch (err) {
      console.log(err);
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
    @Param('id') tableId: string,
    @Body() updateTableDto: UpdateTablesDto,
  ) {
    try {
      const restaurant = await this.tableService.update(
        updateTableDto,
        tableId,
      );
      if (!restaurant) {
        throw new NotFoundException('restaurant does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Table has been successfully updated',
        restaurant,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Table not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public async deleteTable(@Res() res, @Param('id') tableId: string) {
    if (!tableId) {
      throw new NotFoundException('Table ID does not exist');
    }

    const restaurant = await this.tableService.remove(tableId);

    if (!restaurant) {
      throw new NotFoundException('Table does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Table has been deleted',
      restaurant,
    });
  }
}
