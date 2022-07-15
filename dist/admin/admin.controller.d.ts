import { RegistrationUserDto } from 'src/user/dto/registration.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { IAuthAdmin } from './interfaces/auth-admin.interface';
export declare class AdminController {
    private readonly service;
    constructor(service: AdminService);
    login(loginDto: LoginAdminDto): IAuthAdmin;
    addUser(newUser: RegistrationUserDto): Promise<IUser>;
    showUsers(): Promise<IUser[]>;
    showUser(id: number): Promise<IUser>;
    changeUser(id: number, newDataUser: UserDto): Promise<IUser>;
    deleteUser(id: number): Promise<IUser>;
}
