import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { JWT_SECRET, JWT_EXPIRATION } from 'src/config';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserDocument } from 'src/user/user.schema';
import { WorkDto } from './dto/work.dto';
import { IWork } from './interfaces/work.interface';
import { Work, WorkDocument } from './work.shema';

@Injectable()
export class WorkService {
  constructor(@InjectModel(Work.name) private workModel: Model<WorkDocument>) {}

  async create(user: UserDocument, newWork: WorkDto): Promise<IUser> {
    this.validateWork(newWork);
    const createdWork = await new this.workModel(newWork).save();
    await this.changeMood(user, createdWork);
    user.work = createdWork;
    await user.save();
    await createdWork.save();
    return this.buildUserResponse(user);
  }

  async show(user: UserDocument): Promise<IUser> {
    await this.checkWorkById(user.work?._id);
    return this.buildUserResponse(user);
  }

  async findById(id: number): Promise<WorkDocument> {
    return this.workModel.findById(id).exec();
  }

  async drop(user: UserDocument): Promise<IUser> {
    await this.checkWorkById(user.work?._id);
    await this.changeMood(user, undefined);
    const parasite = this.buildUserResponse(user);
    await this.workModel.findByIdAndDelete(user.work._id);
    user.work = null;
    await user.save();
    return parasite;
  }

  async edit(user: UserDocument, newWork: WorkDto): Promise<IUser> {
    this.validateWork(newWork);
    await this.checkWorkById(user.work?._id);
    await this.workModel.findByIdAndUpdate(user.work._id, newWork).exec();
    const updatedWork = await this.workModel.findById(user.work._id).exec();
    await this.changeMood(user, updatedWork);
    return this.buildUserResponse(user);
  }

  validateWork(work: WorkDto) {
    const positions = ['backend node.js programmer', 'cleaner'];
    const works = ['iogru', 'вкусная точка'];
    const locations = ['Moscow', 'online', 'USE', 'сыктывкар'];

    let messageError = '';
    if (!Boolean(positions.includes(work.position))) {
      messageError += 'Должности: backend node.js programmer, cleaner!\n';
    }
    if (!Boolean(works.includes(work.work))) {
      messageError += 'Работа: iogru, вкусная точка!\n';
    }
    if (!Boolean(locations.includes(work.location))) {
      messageError += 'Локация: Moscow, online, USE, сыктывкар!\n';
    }
    if (messageError) {
      throw new HttpException(messageError, HttpStatus.NOT_FOUND);
    }
  }

  async checkWorkById(id: number) {
    try {
      if (!(await this.workModel.findById(id).exec())) {
        throw new HttpException('Тунеядцу трибунал!', HttpStatus.NOT_FOUND);
      }
    } catch {
      throw new HttpException('Тунеядцу трибунал!', HttpStatus.NOT_FOUND);
    }
  }

  buildResponse(work: WorkDocument): IWork | undefined {
    if (!work) return undefined;

    return {
      id: work._id,
      position: work.position,
      work: work.work,
      location: work.location,
    };
  }

  buildUserResponse(user: UserDocument): IUser {
    return {
      id: user._id,
      token: this.generateJwt(user),
      levelMood: user.levelMood,
      name: user.name,
      login: user.login,
      age: user.age,
      work: this.buildResponse(user.work),
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

  async changeMood(user: UserDocument, newWork?: WorkDocument) {
    if (user.work?.position !== newWork?.position) {
      if (newWork?.position === 'cleaner') {
        user.levelMood -= 10;
      } else if (newWork?.position === 'backend node.js programmer') {
        user.levelMood += 15;
      }
    }
    if (user.work?.work !== newWork?.work) {
      if (newWork?.work === 'iogru') {
        user.levelMood = 100;
      } else if (newWork?.work === 'вкусная точка') {
        user.levelMood -= 50;
      }
    }
    if (user.work?.location !== newWork?.location) {
      if (newWork?.location === 'Moscow') {
        user.levelMood += 20;
      } else if (newWork?.location === 'online') {
        user.levelMood -= 20;
      } else if (newWork?.location === 'USE') {
        user.levelMood += 40;
      } else if (newWork?.location === 'сыктывкар') {
        user.levelMood = 10;
      }
    }
    if (user.levelMood > 100) {
      user.levelMood = 100;
    } else if (user.levelMood < 0) {
      user.levelMood = 0;
    }
    await user.save();
  }
}
