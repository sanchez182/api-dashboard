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
import { CreateSupplierDto, UpdateSupplierDto } from './dto';
import { SupplierService } from './supplier.service';

@Controller('api/supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Get()
  public async findAll(@Res() res) {
    const stockList = await this.supplierService.findAll();
    if (!stockList) {
      throw new NotFoundException('There are not records!');
    }
    return res.status(HttpStatus.OK).json(stockList);
  }

  @Get('/:id')
  public async getStockById(@Res() res, @Param('id') supplierId: string) {
    const supplier = await this.supplierService.findOne(supplierId);
    if (!supplier) {
      throw new NotFoundException('Supplier does not exist!');
    }
    return res.status(HttpStatus.OK).json(supplier);
  }

  @Post()
 //@UseGuards(AuthGuard())
  public async addSupplier(@Res() res, @Body() supplier: CreateSupplierDto) {
    try {
      const stock = await this.supplierService.addSupplier(supplier);
      return res.status(HttpStatus.OK).json({
        message: 'Supplier has been add successfully',
        stock,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Supplier not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  public async updateStock(
    @Res() res,
    @Param('id') supplierId: string,
    @Body() updatesupplierDto: UpdateSupplierDto,
  ) {
    try {
      const supplier = await this.supplierService.update(
        supplierId,
        updatesupplierDto,
      );
      if (!supplier) {
        throw new NotFoundException('supplier does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'supplier has been successfully updated',
        supplier,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: supplier not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public async deletesupplier(@Res() res, @Param('id') supplierId: string) {
    if (!supplierId) {
      throw new NotFoundException('supplier ID does not exist');
    }

    const supplier = await this.supplierService.remove(supplierId);

    if (!supplier) {
      throw new NotFoundException('supplier does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'supplier has been deleted',
      supplier,
    });
  }
}
