import { IDrinkModel } from './interfaces/drink.interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDrinkDto, UpdateDrinkDto } from './dto';
import { Drink } from 'src/schemas/drink';

@Injectable()
export class DrinkService {
  constructor(
    @InjectModel(Drink.name)
    private readonly drinkModel: Model<Drink>,
    private cloudinaryService: CloudinaryService,
  ) {}

  public async findAll(): Promise<IDrinkModel[]> {
    const drinkData = await this.drinkModel.find().exec();
    if (!drinkData) {
      throw new NotFoundException(`Drink not found`);
    }
    return drinkData;
  }

  public async create(createDrinkDto: CreateDrinkDto): Promise<IDrinkModel> {
    const newDrink = await new this.drinkModel(createDrinkDto);
    return newDrink.save();
  }

  public async update(
    updateDrinkDto: UpdateDrinkDto,
    drinkId: string,
  ): Promise<any> {
    const existingCustomer = await this.drinkModel.findOneAndUpdate(
      { _id: drinkId },
      updateDrinkDto,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      },
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Drink  not found`);
    }

    console.log(existingCustomer);
    return existingCustomer;
  }

  public async remove(
    drinkId: { idDrink: string; idImg: string }[],
  ): Promise<any> {
    const drinksId = [];
    const imagesId = [];
    drinkId.forEach((element) => {
      drinksId.push(element.idDrink);
      imagesId.push(element.idImg);
    });

    const deletedCustomer = await this.drinkModel.deleteMany({
      _id: {
        $in: drinksId,
      },
    });
    if (deletedCustomer) {
      this.cloudinaryService.deleteImage(imagesId);
    }
    return deletedCustomer;
  }
}
