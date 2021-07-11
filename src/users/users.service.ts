import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { comparePasswords } from '../shared/utils';
import { User } from '../schemas/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findOne(options?: any): Promise<User> {
    console.log('en findOne');
    const user = await this.userModel.findOne(options);
    return user;
  }

  //async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
  async findByLogin({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email });
    console.log(user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    //return toUserDto(user);
    return user;
  }

  async findByPayload({ name }: any): Promise<UserDto> {
    console.log('en findByPayload');
    return await this.findOne({ name });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const { email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userModel.findOne({ email });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    /*     const user: User = await this.userModel.create({
      name,
      password,
      email,
    });  */
    const user = await new this.userModel(userDto);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
    const data = await user.save();
    console.log(data);
    return data;

    //return toUserDto(user);
  }

  private _sanitizeUser(user: User) {
    delete user.password;
    return user;
  }
}
