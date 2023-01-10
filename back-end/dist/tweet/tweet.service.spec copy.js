"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const mongoose_1 = require("@nestjs/mongoose");
const tweet_service_1 = require("./tweet.service");
const tweet_model_1 = require("./models/tweet.model");
const mockUser = {
    username: 'altaf',
    userId: '8d02fde6-28d0-40cc-b530-9a16b59526aa',
};
const mockTweetService = () => ({
    getAllTweets: jest.fn(),
});
describe('TweetService', () => {
    let tweetService;
    let tweetModel;
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [
                mongoose_1.MongooseModule.forRoot('mongodb+srv://altafshaikh:Awsed69@cluster0.wimdj.mongodb.net/nestApp?retryWrites=true&w=majority'),
                mongoose_1.MongooseModule.forFeature([{ name: 'tweet', schema: tweet_model_1.TweetSchema }]),
            ],
            providers: [{ provide: tweet_service_1.TweetService, useFactory: mockTweetService }],
        }).compile();
        tweetService = await moduleRef.resolve(tweet_service_1.TweetService);
    });
    describe('getAllTweets', () => {
        it('gets user tweets from the database', async () => {
            expect(tweetService.getAllTweets).not.toHaveBeenCalled();
            const result = await tweetService.getAllTweets(mockUser);
            expect(tweetService.getAllTweets).toHaveBeenCalled();
            expect(result).toEqual(result);
        });
    });
});
//# sourceMappingURL=tweet.service.spec%20copy.js.map