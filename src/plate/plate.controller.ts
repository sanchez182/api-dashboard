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
import { CreatePlateDto, UpdatePlateDto } from './dto';
import { PlateService } from './plate.service';
@Controller('api/plate')
export class PlateController {
  constructor(private plateService: PlateService) {}

  @Get()
  public async getAll(@Res() res) {
    const Plate = await this.plateService.findAll();
    if (!Plate) {
      throw new NotFoundException('Plate does not exist!');
    }
    return res.status(HttpStatus.OK).json(Plate);
  }

  @Post()
  // @UseGuards(AuthGuard())
  public async addPlate(@Res() res, @Body() createPlateDto: CreatePlateDto) {
    try {
      console.log(createPlateDto);
      const Plate = await this.plateService.create(createPlateDto);
      return res.status(HttpStatus.OK).json({
        message: 'Plate has been created successfully',
        Plate,
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Plate not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  public async updatePlate(
    @Res() res,
    @Param('id') plateId: string,
    @Body() updatePlateDto: UpdatePlateDto,
  ) {
    try {
      const Plate = await this.plateService.update(updatePlateDto, plateId);
      if (!Plate) {
        throw new NotFoundException('Plate does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Plate has been successfully updated',
        Plate,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Plate not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public async deletePlate(@Res() res, @Param('id') PlateId: string) {
    if (!PlateId) {
      throw new NotFoundException('Plate ID does not exist');
    }

    const Plate = await this.plateService.remove(PlateId);

    if (!Plate) {
      throw new NotFoundException('Plate does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Plate has been deleted',
      Plate,
    });
  }
}
