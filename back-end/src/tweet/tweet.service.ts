import { Injectable } from '@nestjs/common';
import { AuthUserDto } from '../users/dto/authUser.dto';
import { MongooseProvider } from 'src/mongoose/mongo.conection';


@Injectable()
export class TweetService {

  constructor(
    private readonly mongooseProvider: MongooseProvider
  ) {}

  async getAllTweets(collection: string): Promise<any> {
    const pipeline = [
        { $match: {"data.author_id": "1566443121780686853"} }
    ];
    return await this.mongooseProvider.aggregate(collection,pipeline);
  }

  async getAllSchemaNames(): Promise<any> {
    return await this.mongooseProvider.getSchemaNames();
  }

  async getCountTweets(collection: string): Promise<any> {
    const pipeline = [{ $count: "totalRows" }];
    const result = await this.mongooseProvider.aggregate(collection,pipeline);
    return result[0].totalRows;
  }

  async getDateExtrems(collection: string): Promise<any> {
    const pipeline = [
      { $group: {
          _id: null,
          oldestDate: { $min: "$data.created_at" },
          newestDate: { $max: "$data.created_at" }
      } }
    ];
    const result = await this.mongooseProvider.aggregate(collection,pipeline);
    return { oldestDate: result[0].oldestDate, newestDate: result[0].newestDate };
  }

  async getTextMostRetweet(collection: string): Promise<any> {
    const pipeline = [
      {
        '$sort': {
          'data.public_metrics.retweet_count': -1
        }
      }, {
        '$limit': 1
      }, {
        '$project': {
          '_id': 0, 
          'text': '$data.text'
        }
      }
    ]
    const result = await this.mongooseProvider.aggregate(collection,pipeline);
    return { text: result[0].text };
  }

  async get10MostTweets(collection: string): Promise<any> {
    const pipeline = [
      {
        '$group': {
          '_id': '$data.author_id', 
          'author_name': {
            '$first': '$includes.users'
          }, 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }, {
        '$project': {
          '_id': 1, 
          'count': 1, 
          'author_name': {
            '$arrayElemAt': [
              '$author_name', 0
            ]
          }
        }
      }, {
        '$limit': 10
      }
    ]
    return await this.mongooseProvider.aggregate(collection,pipeline);
  }
}
