import { IWork } from 'src/work/interfaces/work.interface';
export interface IUser {
    id: string;
    token?: string;
    name: string;
    login: string;
    age: number;
    levelMood: number;
    work?: IWork;
}
