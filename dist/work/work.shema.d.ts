import mongoose from 'mongoose';
import { IWork } from './interfaces/work.interface';
export declare type WorkDocument = Work & mongoose.Document;
export declare class Work {
    position: 'backend node.js programmer' | 'cleaner';
    work: 'iogru' | 'вкусная точка';
    location: 'Moscow' | 'online' | 'USE' | 'сыктывкар';
    getResponse(): IWork;
}
export declare const WorkSchema: mongoose.Schema<Work, mongoose.Model<Work, any, any, any, any>, {}, {}, any, {}, "type", Work>;
