import { UserDto } from 'src/user/dto/user.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RegistrationUserDto } from 'src/user/dto/registration.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';
import { IAuthAdmin } from './interfaces/auth-admin.interface';
export declare class AdminService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    login(loginDto: LoginAdminDto): IAuthAdmin;
    addUser(newUser: RegistrationUserDto): Promise<IUser>;
    getUsers(): Promise<IUser[]>;
    showUser(id: number): Promise<IUser>;
    changeUser(id: number, newDataUser: UserDto): Promise<IUser>;
    deleteUser(id: number): Promise<IUser>;
    generateJwt(admin: LoginAdminDto): string;
}
