import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppStatus } from '../schemas/appStuatus';

@Injectable()
export class AppStatusService {
  constructor(
    @InjectModel(AppStatus.name)
    private readonly appStatus: Model<AppStatus>,
  ) {}

  public async findAll(): Promise<AppStatus> {
    const status = await this.appStatus.findOne().exec();
    if (!status) {
      throw new NotFoundException(`Data not found`);
    }
    return status;
  }
}
