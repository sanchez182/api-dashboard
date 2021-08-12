import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppStatusService } from './appStatus.service';
@Controller('api/appStatus')
export class AppStatusController {
  constructor(private orderService: AppStatusService) {}

  @Get()
  @UseGuards(AuthGuard())
  public async getAll(@Res() res) {
    const order = await this.orderService.findAll();
    if (!order) {
      throw new NotFoundException('Items does not exist!');
    }
    return res.status(HttpStatus.OK).json(order);
  }
}
