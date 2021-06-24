import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestautantSchema } from 'src/schemas/restaurant';
import { EventsGateway } from './events.gateway';
import { EventstService } from './events.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestautantSchema },
    ]),
  ],
  providers: [EventsGateway, EventstService],
})
export class EventsModule {}
