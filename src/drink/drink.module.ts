import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Drink, DrinkSchema } from '../schemas/drink';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { DrinkController } from './drink.controller';
import { DrinkService } from './drink.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Drink.name, schema: DrinkSchema }]),
  ],
  controllers: [DrinkController],
  providers: [DrinkService, CloudinaryService],
})
export class DrinkModule {}
