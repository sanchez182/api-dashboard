import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDto } from '../users/dto/user-login.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/user.create.dto';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      name: user.name,
      uid: user.id,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ id, name }: UserDto): any {
    const expiresIn = '10h'; //process.env.EXPIRESIN;

    const user: JwtPayload = { id, name };
    const token = this.jwtService.sign(user);
    return {
      expiresIn,
      token,
    };
  }
}
