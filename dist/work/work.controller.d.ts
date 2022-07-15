import { UserDocument } from 'src/user/user.schema';
import { WorkDto } from './dto/work.dto';
import { IWork } from './interfaces/work.interface';
import { WorkService } from './work.service';
export declare class WorkController {
    private readonly workService;
    constructor(workService: WorkService);
    create(user: UserDocument, work: WorkDto): Promise<IWork>;
    show(user: UserDocument): IWork;
    drop(user: UserDocument): Promise<IWork>;
    edit(user: UserDocument, work: WorkDto): Promise<IWork>;
}
