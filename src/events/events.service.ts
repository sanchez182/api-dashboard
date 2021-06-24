import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from 'src/schemas/restaurant';

@Injectable()
export class EventstService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  public async selectRestaurantTable(payload: any): Promise<any> {
    const res = await this.restaurantModel.findOneAndUpdate(
      { _id: payload.idRestaurant },
      { $set: { 'tableList.$[elem].selected': payload.isSelected } },
      {
        projection: {
          name: 1,
          tableList: { $elemMatch: { tableNumber: payload.tableNumber } },
        },
        arrayFilters: [{ 'elem.tableNumber': { $eq: payload.tableNumber } }],
      },
    );
    //TODO: aca buscar luego los datos de table, xq aca me lo devuelve cuando aun no se ha actualizado
    console.log(res);
    return { tableNumber: payload.tableNumber, selected: payload.isSelected };
  }
}
