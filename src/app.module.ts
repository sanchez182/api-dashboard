import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './about/about.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    EventsModule,
    AuthModule,
    AboutModule,
    RestaurantModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://resuserdb:f8RYRNTCCc7OZT1E@cluster0.pph7y.mongodb.net/restaurantdb',
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
