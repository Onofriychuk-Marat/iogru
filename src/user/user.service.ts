import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegistrationUserDto } from './dto/registration.dto';
import { UserDto } from './dto/user.dto';
import { IAuth } from '../interfaces/auth.interface';
import { IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { WorkService } from 'src/work/work.service';
import { sign } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from 'src/config';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly workService: WorkService,
  ) {}

  async login(dto: LoginDto): Promise<IAuth> {
    const user = await this.userModel.findOne({
      login: dto.login,
    });
    if (!user) {
      throw new HttpException(
        {
          errors: {
            login: 'is invalid',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordCorrect = await compare(dto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(
        {
          errors: {
            password: 'is invalid',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.buildAuthResponse(user);
  }

  async registration(newUser: RegistrationUserDto): Promise<IAuth> {
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
    const createdUser: UserDocument = await new this.userModel({
      ...newUser,
      password: await hash(newUser.password, 10),
    }).save();
    return this.buildAuthResponse(createdUser);
  }

  async show(user: UserDocument): Promise<IUser> {
    return this.buildResponse(user);
  }

  async edit(user: UserDocument, newDataUser: UserDto): Promise<IUser> {
    const isHaveUser = await this.userModel
      .findOne({
        login: newDataUser.login,
      })
      .exec();

    if (isHaveUser) {
      throw new HttpException(
        'Пользователь с таким логином уже есть!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (newDataUser.password) {
      await this.userModel
        .findByIdAndUpdate(user.id, {
          ...newDataUser,
          password: await hash(newDataUser.password, 10),
        })
        .exec();
    } else {
      await this.userModel.findByIdAndUpdate(user.id, newDataUser).exec();
    }
    return this.buildResponse(await this.findById(user.id));
  }

  async goToBarWithColleagues(user: UserDocument): Promise<IUser> {
    user.levelMood += 5;
    if (user.levelMood > 100) {
      await this.workService.create(user, {
        position: 'cleaner',
        work: 'вкусная точка',
        location: 'сыктывкар',
      });
    } else {
      await user.save();
    }
    return this.buildResponse(user);
  }

  async findById(id: number): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (user.work) {
      user.work = await this.workService.findById(user.work._id);
    }
    return user;
  }

  buildResponse(user: UserDocument): IUser {
    return {
      id: user._id,
      token: this.generateJwt(user),
      levelMood: user.levelMood,
      name: user.name,
      login: user.login,
      age: user.age,
      work: this.workService.buildResponse(user.work),
    };
  }

  generateJwt(user: UserDocument): string {
    return sign(
      {
        id: user.id,
        username: user.login,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION },
    );
  }

  buildAuthResponse(user: UserDocument): IAuth {
    return {
      id: user._id,
      token: this.generateJwt(user),
    };
  }
}
