import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { Plate } from './../schemas/plate';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlateDto, UpdatePlateDto } from './dto';
import { IPlate } from './interfaces/plate.interface';

@Injectable()
export class PlateService {
  constructor(
    @InjectModel(Plate.name)
    private readonly plateModel: Model<Plate>,
    private cloudinaryService: CloudinaryService,
  ) {}

  public async findAll(): Promise<Plate[]> {
    const restaurant = await this.plateModel.find().exec();
    if (!restaurant) {
      throw new NotFoundException(`Plate not found`);
    }
    return restaurant;
  }

  public async create(createPlateDto: CreatePlateDto): Promise<IPlate> {
    const newPlate = await new this.plateModel(createPlateDto);
    return newPlate.save();
  }

  public async update(
    updatePlateDto: UpdatePlateDto,
    plateId: string,
  ): Promise<any> {
    console.log(updatePlateDto);
    const existingCustomer = await this.plateModel.findOneAndUpdate(
      { _id: plateId },
      updatePlateDto,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      },
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Plate  not found`);
    }

    console.log(existingCustomer);
    return existingCustomer;
  }

  public async remove(
    plateId: { idPlate: string; idImg: string }[],
  ): Promise<any> {
    const platesId = [];
    const imagesId = [];
    plateId.forEach((element) => {
      platesId.push(element.idPlate);
      imagesId.push(element.idImg);
    });

    const deletedCustomer = await this.plateModel.deleteMany({
      _id: {
        $in: platesId,
      },
    });
    if (deletedCustomer) {
      this.cloudinaryService.deleteImage(imagesId);
    }
    return deletedCustomer;
  }
}
