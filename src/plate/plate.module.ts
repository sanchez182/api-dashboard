import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { Plate, PlateSchema } from './../schemas/plate';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { PlateController } from './plate.controller';
import { PlateService } from './plate.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Plate.name, schema: PlateSchema }]),
  ],
  controllers: [PlateController],
  providers: [PlateService, CloudinaryService],
})
export class PlateModule {}
