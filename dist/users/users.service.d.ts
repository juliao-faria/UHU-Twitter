import { Model } from 'mongoose';
import { Users } from './interfaces/users.interface';
export declare class UsersService {
    readonly usersModel: Model<Users>;
    constructor(usersModel: Model<Users>);
    findUser(username: string): Promise<Users>;
}
