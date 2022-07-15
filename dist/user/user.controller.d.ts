import { LoginDto } from './dto/login.dto';
import { RegistrationUserDto } from './dto/registration.dto';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';
import { IAuth } from '../interfaces/auth.interface';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    login(dto: LoginDto): Promise<IAuth>;
    registation(dto: RegistrationUserDto): Promise<IAuth>;
    show(user: UserDocument): IUser;
    edit(user: UserDocument, newDataUser: UserDto): Promise<IUser>;
    goToBarWithColleagues(user: UserDocument): Promise<IUser>;
}
