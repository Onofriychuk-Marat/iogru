import mongoose from 'mongoose';
import { IAuth } from 'src/interfaces/auth.interface';
import { WorkDocument } from 'src/work/work.shema';
import { IUser } from './interfaces/user.interface';
export declare type UserDocument = User & mongoose.Document;
export declare class User {
    name: string;
    login: string;
    age: number;
    password: string;
    hashPassword(): Promise<void>;
    levelMood: number;
    work?: WorkDocument;
    getResponse(id: string, token?: string): IUser;
    getAuthResponse(id: string, token: string): IAuth;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, any, {}, "type", User>;
