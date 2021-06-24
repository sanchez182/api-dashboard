import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Restaurant, RestautantSchema } from 'src/schemas/restaurant';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestautantSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
