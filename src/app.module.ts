import { TableModule } from './tables/table.module';
import { StockModule } from './stock/stock.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TableModule,
    RestaurantModule,
    StockModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://userDashboard:LUDNUqqhPOJD2b70@cluster0.jo9zy.mongodb.net/DashBoardMenuDB',
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
