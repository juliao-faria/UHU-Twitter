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
};
TweetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongo_conection_1.MongooseProvider])
], TweetService);
exports.TweetService = TweetService;
//# sourceMappingURL=tweet.service.2.js.map