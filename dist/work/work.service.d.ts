import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';
import { WorkDto } from './dto/work.dto';
import { IWork } from './interfaces/work.interface';
import { WorkDocument } from './work.shema';
export declare class WorkService {
    private workModel;
    constructor(workModel: Model<WorkDocument>);
    create(user: UserDocument, newWork: WorkDto): Promise<IWork>;
    show(user: UserDocument): IWork;
    drop(user: UserDocument): Promise<IWork>;
    edit(user: UserDocument, newWork: WorkDto): Promise<IWork>;
    changeMood(user: UserDocument, newWork?: WorkDocument): Promise<void>;
}
