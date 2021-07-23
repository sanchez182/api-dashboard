import { UploadImageDto } from './dto/upload-image.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('api/cloudinary')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Get()
  public async getImages(@Res() res) {
    const images = await this.cloudinaryService.getImageList();
    if (!images) {
      throw new NotFoundException('restaurant does not exist!');
    }
    return res.status(HttpStatus.OK).json(images);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UploadImageDto,
  ) {
    try {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        file,
        data,
      );
      return res.status(HttpStatus.OK).json({
        message: 'image has been created successfully',
        uploadedImage,
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: image not created!',
        status: 400,
      });
    }
  }
}
