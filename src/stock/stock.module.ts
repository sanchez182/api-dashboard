import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Stock, StockSchema } from 'src/schemas/stock';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
