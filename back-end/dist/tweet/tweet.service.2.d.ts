import { MongooseProvider } from 'src/mongoose/mongo.conection';
export declare class TweetService {
    private readonly mongooseProvider;
    constructor(mongooseProvider: MongooseProvider);
    getAllTweets(): Promise<any>;
    getAllSchemaNames(): Promise<any>;
}
