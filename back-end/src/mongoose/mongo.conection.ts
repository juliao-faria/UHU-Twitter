import { Connection, createConnection } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongooseProvider {
    private readonly connection: Connection;
    constructor() {
        this.connection = createConnection(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            autoIndex: true,
            poolSize: 10,
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4
        });
    }
    
    getConnection() {
        return this.connection;
    }

    async aggregate(collectionName: string, pipeline: object[]) {
        return this.connection.db.collection(collectionName).aggregate(pipeline).toArray();
    }

    async getSchemaNames() {
        const collections = await this.connection.db.listCollections().toArray();
        const collectionNames = collections.map((collection) => collection.name);
        return collectionNames;
    }
}