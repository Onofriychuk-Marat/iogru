import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RegistrationUserDto } from 'src/user/dto/registration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import {
  JWT_EXPIRATION,
  JWT_SECRET,
  LOGIN_ADMIN,
  PASSWORD_ADMIN,
} from 'src/config';
import { User, UserDocument } from 'src/user/user.schema';
import { IAuthAdmin } from './interfaces/auth-admin.interface';
import { UserService } from 'src/user/user.service';
import { WorkService } from 'src/work/work.service';
import { IAdminResponse } from './interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
    private workService: WorkService,
  ) {}

  login(loginDto: LoginAdminDto): IAuthAdmin {
    if (loginDto.login !== LOGIN_ADMIN) {
      throw new HttpException(
        {
          errors: {
            login: 'is invalid',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (loginDto.password !== PASSWORD_ADMIN) {
      throw new HttpException(
        {
          errors: {
            password: 'is invalid',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return {
      token: this.generateJwt(loginDto),
    };
  }

  async addUser(newUser: RegistrationUserDto): Promise<IAdminResponse<IUser>> {
    const isHaveUser = await this.userModel
      .findOne({
        login: newUser.login,
      })
      .exec();

    if (isHaveUser) {
      throw new HttpException(
        'Пользователь с таким логином уже есть!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdUser = await new this.userModel(newUser).save();
    return this.buildUserResponse(createdUser);
  }

  async getUsers(): Promise<IAdminResponse<IUser[]>> {
    const users = await this.userModel.find().exec();
    const answerUsers = [];
    for (const u of users) {
      if (u.work?._id) {
        u.work = await this.workService.findById(u.work._id);
      }
      const user = this.userService.buildResponse(u);
      delete user.token;
      answerUsers.push(user);
    }
    return this.buildUsersResponse(answerUsers);
  }

  buildUsersResponse(users: IUser[]): IAdminResponse<IUser[]> {
    return {
      token: this.generateJwt({
        login: LOGIN_ADMIN,
        password: PASSWORD_ADMIN,
      }),
      payload: users,
    };
  }

  buildUserResponse(user: UserDocument): IAdminResponse<IUser> {
    return {
      token: this.generateJwt({
        login: LOGIN_ADMIN,
        password: PASSWORD_ADMIN,
      }),
      payload: {
        id: user._id,
        levelMood: user.levelMood,
        name: user.name,
        login: user.login,
        age: user.age,
        work: this.workService.buildResponse(user.work),
      },
    };
  }

  async showUser(id: string): Promise<IAdminResponse<IUser>> {
    await this.checkUserById(id);
    const user = await this.userModel.findById(id).exec();
    return this.buildUserResponse(user);
  }

  async changeUser(
    id: string,
    newDataUser: UserDto,
  ): Promise<IAdminResponse<IUser>> {
    await this.checkUserById(id);
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, newDataUser)
      .exec();
    return this.buildUserResponse(updatedUser);
  }

  async deleteUser(id: string): Promise<IAdminResponse<IUser>> {
    await this.checkUserById(id);
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return this.buildUserResponse(deletedUser);
  }

  async checkUserById(id: string) {
    try {
      if (!(await this.userModel.findById(id).exec())) {
        throw new HttpException(
          'Пользователь не найден!',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch {
      throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND);
    }
  }

  generateJwt(admin: LoginAdminDto): string {
    return sign(
      {
        login: admin.login,
        password: admin.password,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION },
    );
  }
}
