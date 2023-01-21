import { Connection } from 'mongoose';
export declare class MongooseProvider {
    private readonly connection;
    constructor();
    getConnection(): Connection;
    aggregate(collectionName: string, pipeline: object[]): Promise<any[]>;
    getSchemaNames(): Promise<any[]>;
}
