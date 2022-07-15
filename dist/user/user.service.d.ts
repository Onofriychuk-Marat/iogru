import { LoginDto } from './dto/login.dto';
import { RegistrationUserDto } from './dto/registration.dto';
import { UserDto } from './dto/user.dto';
import { IAuth } from '../interfaces/auth.interface';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { WorkService } from 'src/work/work.service';
export declare class UserService {
    private userModel;
    private readonly workService;
    constructor(userModel: Model<UserDocument>, workService: WorkService);
    login(dto: LoginDto): Promise<IAuth>;
    registration(newUser: RegistrationUserDto): Promise<IAuth>;
    generateJwt(user: UserDocument): string;
    show(user: UserDocument): IUser;
    edit(user: UserDocument, newDataUser: UserDto): Promise<IUser>;
    goToBarWithColleagues(user: UserDocument): Promise<IUser>;
    findById(id: number): Promise<UserDocument>;
}
