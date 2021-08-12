import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppStatusController } from './appStatus.controller';
import { AppStatusService } from './appStatus.service';
import { AuthModule } from '../auth/auth.module';
import { AppStatus, AppStatusSchema } from '../schemas/appStuatus';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: AppStatus.name, schema: AppStatusSchema }]),
  ],
  controllers: [AppStatusController],
  providers: [AppStatusService],
})
export class AppStatusModule {}
