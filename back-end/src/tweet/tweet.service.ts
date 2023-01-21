import { ForbiddenException, Injectable } from '@nestjs/common';
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

  async getTextMostLikes(collection: string): Promise<any> {
    const pipeline = [
      {
        '$sort': {
          'data.public_metrics.like_count': -1
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

  async getTweetsByLang(collection: string): Promise<any> {
    const languageCodes = {
      "en": "Inglés",
      "es": "Español"
    };
    const pipeline = [
      {
        '$group': {
          '_id': '$data.lang', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'lang': '$_id', 
          'tweets': '$count'
        }
      }
    ]
    const res = await this.mongooseProvider.aggregate(collection,pipeline);
    const sanitazeRes = res.map(element => 
      {
        element.lang = languageCodes[element.lang];
        return element;
      });
    return sanitazeRes
  }

  async get10Urls(collection: string): Promise<any> {
    const pipeline = [
      {
        '$unwind': {
          'path': '$data.entities.urls'
        }
      }, {
        '$group': {
          '_id': '$data.entities.urls.url', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }, {
        '$limit': 10
      }, {
        '$project': {
          '_id': 0, 
          'cantidad': '$count', 
          'url': '$_id'
        }
      }
    ]
    return await this.mongooseProvider.aggregate(collection,pipeline);
  }

  async get10Mentions(collection: string): Promise<any> {
    const pipeline = [
      {
        '$unwind': {
          'path': '$data.entities.mentions'
        }
      }, {
        '$group': {
          '_id': '$data.entities.mentions.username', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }, {
        '$limit': 10
      }, {
        '$project': {
          '_id': 0, 
          'mentions': '$count', 
          'username': '$_id'
        }
      }
    ]
    return await this.mongooseProvider.aggregate(collection,pipeline);
  }

  async get10AnotationsByType(collection: string): Promise<any> {
    const pipeline = [
      {
        '$unwind': {
          'path': '$data.entities.annotations'
        }
      }, {
        '$group': {
          '_id': {
            'type': '$data.entities.annotations.type', 
            'text': '$data.entities.annotations.normalized_text'
          }, 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$group': {
          '_id': '$_id.type', 
          'elements': {
            '$push': {
              'text': '$_id.text', 
              'count': '$count'
            }
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'type': '$_id', 
          'annotation': {
            '$arrayElemAt': [
              '$elements', {
                '$indexOfArray': [
                  '$elements.count', {
                    '$max': '$elements.count'
                  }
                ]
              }
            ]
          }
        }
      }
    ]
    return await this.mongooseProvider.aggregate(collection,pipeline);
  }

  async get10Places(collection: string): Promise<any> {
    const pipeline = [
      {
        '$unwind': {
          'path': '$includes.places'
        }
      }, {
        '$group': {
          '_id': '$includes.places.country', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }, {
        '$limit': 10
      }
    ]
    return await this.mongooseProvider.aggregate(collection,pipeline);
  }

  async parametricQuery(collection: string, body: any): Promise<any> {
    const pipeline = []
    if (body.startDate != undefined && body.endDate != undefined) {
      pipeline.push(
        {
          '$match': {
            '$expr': {
              '$and': [
                {
                  '$gte': [
                    {
                      '$dateFromString': {
                        'dateString': '$data.created_at'
                      }
                    }, new Date(body.startDate)
                  ]
                }, {
                  '$lte': [
                    {
                      '$dateFromString': {
                        'dateString': '$data.created_at'
                      }
                    }, new Date(body.endDate)
                  ]
                }
              ]
            }
          }
        }
      )
    }
    if (body.text != undefined) {
      pipeline.push(
        {
          '$match': {
            'data.text': {
              '$regex': `${body.text}`, 
              '$options': 'im'
            }
          }
        }
      )
    }
    if (body.userName != undefined) {
      pipeline.push(
        {
          '$match': {
            'includes.users.0.username': {
              '$regex': `${body.userName}`, 
              '$options': 'g'
            }
          }
        }
      )
    } 
    if (body.retweet != undefined) {
      pipeline.push(
        {
          '$match': {
            'data.public_metrics.retweet_count': {
              '$gte': body.retweet
            }
          }
        }
      )
    }
    if (body.mentions != undefined) {
      pipeline.push(
        {
          '$match': {
            '$expr': {
              '$gte': [
                {
                  '$size': {
                    '$ifNull': [
                      '$data.entities.mentions', []
                    ]
                  }
                }, body.mentions
              ]
            }
          }
        }
      )
    }
    if (body.lang != undefined) {
      pipeline.push(
        {
          '$match': {
            'data.lang': `${body.lang}`
          }
        }
      )
    }
    if (body.newCollectionName != undefined) {
      pipeline.push(
        {
          "$out": `${body.newCollectionName}`
      }
      )
      return await this.mongooseProvider.aggregate(collection,pipeline);
    } else {
      throw new ForbiddenException("Se esperaba un nombre de colección")
    }

  }

  async getUserNames(collection: string): Promise<any> {
    const pipeline = [
      {
        '$unwind': {
          'path': '$includes.users'
        }
      }, {
        '$match': {
          '$expr': {
            '$eq': [
              '$data.author_id', '$includes.users.id'
            ]
          }
        }
      }, {
        '$group': {
          '_id': '$includes.users.username'
        }
      }, {
        '$project': {
          '_id': 0, 
          'nombre': '$_id'
        }
      }
    ]
    return await this.mongooseProvider.aggregate(collection,pipeline);
  }
}
