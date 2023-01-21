"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetService = void 0;
const common_1 = require("@nestjs/common");
const mongo_conection_1 = require("../mongoose/mongo.conection");
let TweetService = class TweetService {
    constructor(mongooseProvider) {
        this.mongooseProvider = mongooseProvider;
    }
    async getAllTweets() {
        const pipeline = [
            { $match: { "data.author_id": "1566443121780686853" } }
        ];
        return await this.mongooseProvider.aggregate("tweets", pipeline);
    }
    async getAllSchemaNames() {
        return await this.mongooseProvider.getSchemaNames();
    }
    async getCountTweets() {
        const pipeline = [{ $count: "totalRows" }];
        const result = await this.mongooseProvider.aggregate("tweets", pipeline);
        return result[0].totalRows;
    }
    async getDateExtrems() {
        const pipeline = [
            { $group: {
                    _id: null,
                    oldestDate: { $min: "$data.created_at" },
                    newestDate: { $max: "$data.created_at" }
                } }
        ];
        const result = await this.mongooseProvider.aggregate("tweets", pipeline);
        return { oldestDate: result[0].oldestDate, newestDate: result[0].newestDate };
    }
    async getTextMostRetweet() {
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
        ];
        const result = await this.mongooseProvider.aggregate("tweets", pipeline);
        return { text: result[0].text };
    }
    async get10MostTweets() {
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
        ];
        return await this.mongooseProvider.aggregate("tweets", pipeline);
    }
};
TweetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongo_conection_1.MongooseProvider])
], TweetService);
exports.TweetService = TweetService;
//# sourceMappingURL=tweet.service.js.map